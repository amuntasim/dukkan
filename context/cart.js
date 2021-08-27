import React, {createContext, useReducer, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../services/api'
import { CartReducer } from './reducers/CartReducer';

import * as Actions  from '../constants/ActionTypes';

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
        const cartMap = JSON.parse(await AsyncStorage.getItem(cartMapKey))
        console.log({cartMap})
        // dispatch({ type: Actions.InitCart, cart: cartMap })
    }
    return (
        <CartContext.Provider value={{ cartState, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;