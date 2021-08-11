import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import styles from '../components/Styles';

import {Text, View} from '../components/Themed';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Alert, FlatList} from "react-native";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context/auth";
import {ListItem, SearchBar} from "react-native-elements";

export default function HomeScreen(props: any) {
    const {navigation} = props;
    // @ts-ignore
    const {access, refreshToken} = useContext(AuthContext)
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        async function localStorageProducts() {
            const tmpProducts = await AsyncStorage.getItem('@DKKN:products')
            if (tmpProducts) {
                setProducts(JSON.parse(tmpProducts))
            } else {
                reloadProducts();
            }
        }

        localStorageProducts();
    }, [])

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
                    productId, name: product.name, price: product.price,
                    model: product.model, tag: product.tag, status: product.status
                })
            }

            setProducts(tmpProducts)
            await AsyncStorage.setItem('@DKKN:products', JSON.stringify(tmpProducts));
        }

    }

    const productSelected = (product: any) => {
        console.log('selected product')
        console.log(product)
    }
    // @ts-ignore
    const renderProducts = ({item}) => (
        <ListItem key="pref-lang" bottomDivider style={{}}>
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
    const updateFilter = (search: any) => {
        setFilter(search);
        if (search.length > 0) {
            const tmpProducts = products.filter((product: any) => {
                const itemData = `${product.name.toUpperCase()} ${product.model.toUpperCase()} ${product.tag.toUpperCase()}`;

                return itemData.indexOf(search.toUpperCase()) > -1;
            });
            setFilteredProducts(tmpProducts);
        } else {
            console.log('.....')
            console.log(products.length)
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
            <FlatList
                data={filteredProducts}
                renderItem={renderProducts}
                keyExtractor={item => `${item.productId}`}
            />
        </View>
    );
}
