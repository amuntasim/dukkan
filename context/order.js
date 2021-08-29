import React, {createContext, useReducer, useEffect, useState} from 'react'
import {OrderReducer} from "./reducers/order";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderContext = createContext({});

const initialState = {
    orders: [],
    isLoading: false,
};

export const OrderProvider = ({children}) => {
    const [orderState, dispatch] = useReducer(OrderReducer, [], () => initialState)

    useEffect(() => {
        loadOrder().then(()=> {
            // order loaded
        })
    }, [])

    async function loadOrder() {
        // const orderMap = JSON.parse(await AsyncStorage.getItem(orderMapKey))
        // console.log({orderMap})

    }

    return (
        <OrderContext.Provider value={{ orderState, dispatch }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContext;
