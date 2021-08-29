import * as React from 'react';
import styles from '../../components/Styles';

import { Text, View } from '../../components/Themed';
import {useContext, useState} from "react";
import AuthContext from "../../context/auth";
import {MaterialIcons} from "@expo/vector-icons";

export default function AccountHeader(props: any) {

    // @ts-ignore
    const {customer}: {} = useContext(AuthContext)

    const openSettings = () => {
        // props.navigation.openDrawer();
    }
    return (
        <View  style={styles.header}>
            <View style={styles.headerTitle}>
                <Text style={styles.headerText}>{customer.name}</Text>
                <MaterialIcons name='dashboard-customize' size={28} onPress={openSettings} style={styles.headerIcon} />
            </View>
        </View>
    );
}
