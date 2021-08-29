import React, {createContext, useReducer, useEffect, useState, useRef} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CartReducer } from './reducers/cart/cartReducer';


const CartContext = createContext({});

const initialState = {
    cartItems: [],
    isLoading: false,
};

const cartMapKey = '@DKKN:cartMap'
export const CartProvider = ({children}) => {
    const [cartState, dispatch] = useReducer(CartReducer, [], () => initialState)

    useEffect(() => {
        loadCart().then(()=> {
            // cart loaded
        })
    }, [])

    async function loadCart() {
        // const cartMap = JSON.parse(await AsyncStorage.getItem(cartMapKey))
        // console.log({cartMap})
        // dispatch({ type: Actions.InitCart, cart: cartMap })
    }
    return (
        <CartContext.Provider value={{ cartState, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;
