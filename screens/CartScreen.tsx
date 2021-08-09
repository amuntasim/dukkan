import * as React from 'react';

import styles from '../components/Styles';
import { Text, View } from '../components/Themed';

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

