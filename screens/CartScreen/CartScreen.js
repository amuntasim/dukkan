import * as React from 'react';
import {useContext, useState} from 'react';

import {Modal, Platform, StyleSheet, Text, View} from "react-native";
import Colors from '../../utils/Colors';
import {CartBody, Header, TotalButton} from './components';
// //Loader
import Loader from '../../components/Loaders/Loader';
import CartContext from "../../context/cart";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {expressOrder} from "../../context/reducers/order";
import AuthContext from "../../context/auth";
import OrderContext from "../../context/order";
import {ClearCart} from "../../context/reducers/cart";
import Styles from "../../components/Styles";

export const CartScreen = (props) => {
    const {navigation} = props;
    const [isRefreshing, setIsRefreshing] = useState(false);
    const {cartState, dispatch: cartDispatch} = useContext(CartContext)
    const {orderState, dispatch: orderDispatch} = useContext(OrderContext)
    const {access, refreshToken} = useContext(AuthContext)
    const [modalVisible, setModalVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const {cartItems} = cartState;
    let total = 0;
    cartItems.map((item) => (total += +item.item.price * +item.quantity));

    React.useLayoutEffect(() => {
        navigation.setOptions({
            header: () => (
                <Header navigation={props.navigation}/>
            ),
        });
    }, [navigation]);
    const placeOrder = async () => {
        try {
            setLoading(true)
            await expressOrder(cartItems)({cartDispatch, orderDispatch}, {access});
            cartDispatch({type: ClearCart});
            setModalVisible(true)
        } catch (e) {

        }
        setLoading(false)
    };

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={Styles.modalContainer}>
                    <View style={Styles.container}>
                        <View style={Styles.centeredView}>
                            <Text>Order placed successfully!</Text>
                        </View>
                        <MaterialCommunityIcons name='close-circle-outline' size={36}
                                                onPress={() => setModalVisible(!modalVisible)}
                                                style={Styles.modalCloseIcon}/>

                    </View>
                </View>
            </Modal>
            {loading ? <Loader/> : <></>}
            <CartBody
                carts={cartState}
                isRefreshing={isRefreshing}
                navigation={props.navigation}
            />
            {cartItems.length === 0 ? (
                <View/>
            ) : (
                <TotalButton
                    total={total}
                    cartItems={cartItems}
                    placeOrder={placeOrder}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    centerLoader: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
    },
});

