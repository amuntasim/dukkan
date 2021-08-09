import * as React from 'react';
import styles from '../components/Styles';

import { Text, View } from '../components/Themed';
import {useContext} from "react";
import AuthContext from "../context/auth";
import {MaterialIcons} from "@expo/vector-icons";

export default function AccountHeader() {
    // @ts-ignore
    const {customer}: {} = useContext(AuthContext)

    return (
        <View  style={styles.header}>
            <View style={styles.headerTitle}>
                <Text style={styles.headerText}>{customer.name}</Text>
            </View>
        </View>
    );
}
