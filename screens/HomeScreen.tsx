import * as React from 'react';
import {useContext, useEffect, useMemo, useRef, useState} from 'react';
import styles from '../components/Styles';

import {Text, View} from '../components/Themed';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Alert, FlatList, Modal} from "react-native";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context/auth";
import {ListItem, SearchBar} from "react-native-elements";
import ProductDetail from "../components/ProductDetail";

export default function HomeScreen(props: any) {
    const {navigation} = props;
    // @ts-ignore
    const {access, refreshToken} = useContext(AuthContext)
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filter, setFilter] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(<View></View>);
    const mountedRef = useRef(true)


    useEffect(() => {
        async function localStorageProducts() {
            const tmpProducts = await AsyncStorage.getItem('@DKKN:products')
            if (tmpProducts) {
                if(mountedRef.current){
                    setProducts(JSON.parse(tmpProducts))
                }
            } else {
               await reloadProducts();
            }
        }

        localStorageProducts().then(()=>{
            //
        });
        return () => {
            mountedRef.current = false
        }
    }, [products])

    useEffect(() => {
        setFilteredProducts(products);
    }, [products])


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MaterialCommunityIcons name='sync' size={28} onPress={syncProducts} style={styles.headerIcon}/>
            ),
        });
    }, [navigation]);

    const syncProducts = () =>
        Alert.alert(
            "Update products",
            "Do you want to update the products?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {text: "OK", onPress: () => reloadProducts()}
            ]
        );

    let decode = (str: string) => {
        let returnText = str;
        returnText = returnText.replace(/&nbsp;/gi, " ");
        returnText = returnText.replace(/&amp;/gi, "&");
        returnText = returnText.replace(/&quot;/gi, `"`);
        returnText = returnText.replace(/&lt;/gi, "<");
        returnText = returnText.replace(/&gt;/gi, ">");
        return returnText;
    }

    async function reloadProducts() {
        await refreshToken();
        const url = 'products&cust_token=' + access
        const response = await api.get(url);
        if (response.data.error) {
            Alert.alert(
                "Update products failed",
                "Please try later or contact support",
                [
                    {
                        text: "Ok",
                        style: "cancel"
                    }
                ])
        } else {
            const rawProducts = response.data.data.products;
            const tmpProducts = [] as any;

            for (let productId in rawProducts) {
                let product = rawProducts[productId];

                tmpProducts.push({
                    productId, name: product.name, price: parseFloat(product.price).toFixed(2),
                    model: product.model, tag: product.tag,
                    description: decode(product.description).replace(/<\/?[^>]+(>|$)/g, ""), status: product.status
                })
            }


            setProducts(tmpProducts)
            await AsyncStorage.setItem('@DKKN:products', JSON.stringify(tmpProducts));
        }

    }

    const renderProductDetail = (product: any) => {
        return <ProductDetail setModalVisible={setModalVisible} product={product}></ProductDetail>
    }

    const productSelected = (product: any) => {
        setModalContent(renderProductDetail(product))
        setModalVisible(true);
    }

    // @ts-ignore
    const renderProduct = ({item}) => (
        <ListItem key={`product-item-${item.productId}`} bottomDivider style={{}} onPress={() => productSelected(item)}>
            <ListItem.Content style={{}}>
                <ListItem.Title>
                    <Text>{item.name}</Text>
                </ListItem.Title>
                <ListItem.Subtitle>
                    <Text>{item.model}</Text>
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content right>
                <Text>{item.price}</Text>
            </ListItem.Content>
        </ListItem>
    );
    const memoizedRenderProduct = useMemo(() => renderProduct, [products, filteredProducts]);

    const updateFilter = (search: any) => {
        setFilter(search);
        if (search.length > 0) {
            const tmpProducts = products.filter((product: any) => {
                const itemData = `${product.name.toUpperCase()} ${product.model.toUpperCase()} ${product.tag.toUpperCase()}`;

                return itemData.indexOf(search.toUpperCase()) > -1;
            });
            setFilteredProducts(tmpProducts);
        } else {
            setFilteredProducts(products);
        }
    };

    return (
        <View style={[styles.container]}>
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                // @ts-ignore
                onChangeText={updateFilter}
                autoCorrect={false}
                value={filter}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        {modalContent}
                        <MaterialCommunityIcons name='close-circle-outline' size={36}
                                                onPress={() => setModalVisible(!modalVisible)}
                                                style={styles.modalCloseIcon}/>

                    </View>
                </View>
            </Modal>
            <FlatList
                data={filteredProducts}
                initialNumToRender={20}
                renderItem={memoizedRenderProduct}
                keyExtractor={item => `${item.productId}`}
            />
        </View>
    );
}
