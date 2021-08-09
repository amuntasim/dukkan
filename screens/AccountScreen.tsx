import * as React from 'react';
import styles from '../components/Styles';

import { Text, View } from '../components/Themed';
import {useContext} from "react";
import AuthContext from "../context/auth";

export default function AccountScreen() {
    // @ts-ignore
    const {customer}: {} = useContext(AuthContext)

    return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

