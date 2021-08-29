import api from '../../../services/api'
import {Alert} from "react-native";

export const ORDER_LOADING = "ORDER_LOADING";
export const ORDER_FAILURE = "ORDER_FAILURE";
export const FETCH_ORDER = "FETCH_ORDER";
export const ADD_ORDER = "ADD_ORDER";
export const ERROR = "ERROR";

const orderMapKey = '@DKKN:orderMap'

export const fetchOrders = (
    orderItems
) => {
    return async ({orderDispatch, refreshToken}, state) => {
        await refreshToken();
        const url = 'order&cust_token=' + state.access
        const response = await api.get(url);
        if (response.data.error) {
            Alert.alert(
                "Fetch orders failed",
                "Please try later or contact support",
                [
                    {
                        text: "Ok",
                        style: "cancel"
                    }
                ])
        } else {
            const {orders} = response.data.data;
            orderDispatch({type: FETCH_ORDER, orderData: orders})
            await AsyncStorage.setItem(orderMapKey, JSON.stringify(orders));
        }

    }
}
