import * as React from 'react';
import {useContext, useState} from 'react';
import styles from '../components/Styles';

import {Text, View} from '../components/Themed';
import AuthContext from "../context/auth";
import {Modal, Pressable} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function AccountScreen(props: any) {
    const {navigation} = props;

    // @ts-ignore
    const {customer}: {} = useContext(AuthContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerText}>{customer.name}</Text>
            ),
            headerRight: () => (
                <MaterialCommunityIcons name='account-cog' size={28} onPress={openSettings} style={styles.headerIcon}/>
            ),
        });
    }, [navigation]);

    const openSettings = () => {
        navigation.navigate('AccountSettingsScreen', {})
    }
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Text style={styles.title}>Account</Text>
        </View>
    );
}

