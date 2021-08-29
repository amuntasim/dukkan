import * as React from 'react';
import {useContext, useState} from 'react';
import styles from '../../components/Styles';

import {Text, View} from '../../components/Themed';
import AuthContext from "../../context/auth";
import {Modal, Pressable} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function AccountScreen(props:any) {
    const {navigation} = props;

    // @ts-ignore
    const { signOut } = useContext(AuthContext)

    function handleSingOut() {
        signOut()
    }
    return (
        <View style={styles.container}>
            <View style={styles.centeredHorView}>
                <Text style={styles.headerText} onPress={handleSingOut}>Sign Out</Text>
            </View>
        </View>
);
}

