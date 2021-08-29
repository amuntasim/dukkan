import * as React from 'react';
import {useContext, useState} from 'react';
import Styles from '../../components/Styles';

import {View} from '../../components/Themed';
import AuthContext from "../../context/auth";
import {FlatList, Text} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import OrderContext from "../../context/order";
import {fetchOrders} from "../../context/reducers/order";
import Loader from "../../components/Loaders/Loader";
import CustomText from "../../components/UI/CustomText";
import {Order} from "./components/Order";

export default function MyOrdersScreen(props: any) {
    const {navigation} = props;

    // @ts-ignore
    const {access, refreshToken} = useContext(AuthContext)
    // @ts-ignore
    const {orderState, dispatch: orderDispatch} = useContext(OrderContext)
    const [loading, setLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    console.log({orderState})
    const syncOrders = async () => {
        try {
            setLoading(true);
            await fetchOrders()({orderDispatch, refreshToken}, {access});
        } catch (e) {

        }
        setLoading(false)
    };
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MaterialCommunityIcons name='sync' size={28} onPress={syncOrders} style={Styles.headerIcon}/>
            ),
        });
    }, [navigation]);

    return (
        <View style={Styles.container}>
            {loading ? <Loader/> : <></>}
            {orderState.orders.length === 0 ? (
                <View style={Styles.center}>
                    <CustomText style={{fontSize: 16}}>
                        No orders found
                    </CustomText>
                    <Text onPress={()=> syncOrders()} style={Styles.link}>Refresh?</Text>
                </View>
            ) : (
                <View style={{marginBottom: 10}}>
                    <FlatList
                        data={orderState.orders}
                        onRefresh={syncOrders}
                        refreshing={isRefreshing}
                        keyExtractor={(item) => item.order_id}
                        renderItem={({item}) => {
                            return (
                                <Order item={item}/>
                            );
                        }}
                    />
                </View>
            )}
        </View>
    );
}

