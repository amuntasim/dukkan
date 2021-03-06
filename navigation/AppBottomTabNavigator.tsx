/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useContext} from 'react';
import {Text, View} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import {CartScreen} from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen/AccountScreen';
import AccountSettingsScreen from '../screens/AccountScreen/AccountSettingsScreen';
import MyOrdersScreen from "../screens/AccountScreen/MyOrdersScreen";
import {AccountParamList, BottomTabParamList, CartParamList, HomeParamList} from '../types';
import AuthContext from "../context/auth";
import CartContext from "../context/cart";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const NotificationTabBarIcon = (props: any) => (
    props.notificationCount > 0 ?

        <Text
            style={{
                color: '#FFFFFF',
                position: 'absolute',
                top: 1,
                right: 1,
                margin: -1,
                minWidth: 13,
                height: 13,
                borderRadius: 7,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FF0000',
                textAlign: "center",
                fontSize: 9
            }}>{props.notificationCount}</Text>
        : null
);
export default function AppBottomTabNavigator() {
    const colorScheme = useColorScheme();
    // @ts-ignore
    const {cartState, dispatch}= useContext(CartContext)
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
            <BottomTab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-home" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({color}) => {
                        return (
                            <View>
                                <TabBarIcon name="ios-cart" color={color}/>
                                <NotificationTabBarIcon notificationCount={cartState.cartItems.length}/>
                            </View>
                        )
                    },
                }}
            />

            <BottomTab.Screen
                name="Account"
                component={AccountNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-person" color={color}/>,
                }}
            />

        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{headerTitle: 'Home'}}
            />
        </HomeStack.Navigator>
    );
}

const CartStack = createStackNavigator<CartParamList>();

function CartNavigator() {
    return (
        <CartStack.Navigator>
            <CartStack.Screen
                name="CartScreen"
                component={CartScreen}
                // options={{ headerTitle: 'My cart' }}
            />
        </CartStack.Navigator>
    );
}

const AccountStack = createStackNavigator<AccountParamList>();

function AccountNavigator() {
    // @ts-ignore
    const {customer}: {} = useContext(AuthContext)
    return (
        <AccountStack.Navigator>
            <AccountStack.Screen
                name="AccountScreen"
                component={AccountScreen}
                // options={{ headerTitle: props => <AccountHeader {...props} /> }}

            />
            <AccountStack.Screen
                name="AccountSettingsScreen"
                component={AccountSettingsScreen}
                options={{headerTitle: 'Settings'}}
            />
            <AccountStack.Screen
                name="MyOrdersScreen"
                component={MyOrdersScreen}
                options={{headerTitle: 'Orders'}}
            />
        </AccountStack.Navigator>
    );
}
