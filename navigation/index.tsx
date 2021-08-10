/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useContext} from 'react';
import {ActivityIndicator, ColorSchemeName, View} from 'react-native';


import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList} from '../types';
import AuthBottomTabNavigator from './AuthBottomTabNavigator';
import AppBottomTabNavigator from './AppBottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import AuthContext from "../context/auth";

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    // @ts-ignore
    const {signed, loading}: {} = useContext(AuthContext)
    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#666"/>
            </View>
        )
    }
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            {signed ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Root" component={AuthBottomTabNavigator}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </Stack.Navigator>
    );
}

function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Root" component={AppBottomTabNavigator}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </Stack.Navigator>
    );
}
