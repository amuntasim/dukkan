import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from './Themed';
import {TextInput} from "react-native-gesture-handler";
import CartContext from "../context/cart";
import * as Actions from "../constants/ActionTypes";

export default function ProductDetail({product, setModalVisible}: { product: any , setModalVisible:any}) {
    // @ts-ignore
    const {cart, dispatch: cartDispatch} = useContext(CartContext)
    const [countValue, setCountValue] = useState(1);

    const addToCart = () => {
        cartDispatch({ type: Actions.AddToCart, cartItem: product, quantity: countValue });
        setModalVisible(false);
    }
    const decrement = () => {
        handleCountChange(countValue - 1)
    }
    const increment = () => {
        handleCountChange(countValue + 1)
    }
    const handleCountChange = (value:any) => {
        if(value && parseInt(value) >= 0){
            setCountValue(parseInt(value))
        }else{
            setCountValue(0)
        }
    }

    return (
        <View style={{}}>
            <ScrollView>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>Price: {product.price}</Text>
                    <Text style={styles.description}>
                        {product.description}
                    </Text>
                </View>

                <View style={styles.separator}></View>
                <View style={{alignItems: "center", marginTop: 15}}>
                    <View style={styles.buttonsGroup}>
                        <TouchableOpacity style={styles.leftCountBtn} onPress={decrement}>
                            <Text style={styles.countBtn}>-1</Text>
                        </TouchableOpacity>
                        <TextInput style={styles.countValue}
                                   maxLength={3}
                                   keyboardType="decimal-pad"
                                   value={countValue.toString()}
                                   onChangeText={value => handleCountChange(value)}

                        />
                        <TouchableOpacity style={styles.rightCountBtn} onPress={increment}>
                            <Text style={styles.countBtn}>+1</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.separator}></View>
                <View style={styles.addToCarContainer}>
                    <TouchableOpacity style={styles.shareButton} onPress={addToCart}>
                        <Text style={styles.shareButtonText}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    name: {
        fontSize: 20,
        color: "#696969",
        fontWeight: 'bold',
    },
    price: {
        marginTop: 10,
        fontSize: 18,
        color: "green",
        fontWeight: 'bold'
    },
    description: {
        textAlign: 'center',
        marginTop: 10,
        color: "#696969",
    },

    btnColor: {
        height: 30,
        width: 30,
        borderRadius: 30,
        marginHorizontal: 3
    },
    buttonsGroup: {
        height: 34,
        width: 144,

        flexDirection: 'row',
        alignItems: 'center',

    },

    leftCountBtn: {
        marginLeft: 2,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderWidth: 1,
        paddingLeft: 2,
        borderColor: '#778899',
    },
    rightCountBtn: {
        position: 'absolute',
        right: 2,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
        borderColor: '#778899',
    },
    countBtn: {
        fontWeight: 'bold',
        padding: 3,
        fontSize: 20,
        // borderColor: '#778899',
        // borderWidth: 1,
        width: 32,
        color: "green",
    },
    countValue: {
        borderColor: '#778899',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        width: 70,
        height: 34,
        textAlign: 'center',
        fontSize: 18,
        color: '#778899'
    },
    separator: {
        height: 2,
        backgroundColor: "#eeeeee",
        marginTop: 20,
        marginHorizontal: 30
    },
    shareButton: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    shareButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    addToCarContainer: {
        marginTop: 10,
        marginHorizontal: 30
    }
});
