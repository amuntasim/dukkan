import React, {createContext, useReducer, useEffect, useState} from 'react'
import {OrderReducer} from "./reducers/order";

const OrderContext = createContext({});

const initialState = {
    orders: [],
    isLoading: false,
};

export const OrderProvider = ({children}) => {
    const [orderState, dispatch] = useReducer(OrderReducer, [], () => initialState)

    return (
        <OrderContext.Provider value={{ orderState, dispatch }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContext;
