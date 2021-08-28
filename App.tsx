import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {AuthProvider} from './context/auth'
import {CartProvider} from './context/cart'
import {OrderProvider} from "./context/order";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <AuthProvider>
                    <OrderProvider>
                        <CartProvider>
                            <Navigation colorScheme={colorScheme}/>
                            <StatusBar/>
                        </CartProvider>
                    </OrderProvider>
                </AuthProvider>
            </SafeAreaProvider>
        );
    }
}
