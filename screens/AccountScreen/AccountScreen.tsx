import * as React from 'react';
import {useContext, useState} from 'react';
import Styles from '../../components/Styles';

import {Text, View} from '../../components/Themed';
import AuthContext from "../../context/auth";
import {Modal, Pressable} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ListItem} from "react-native-elements";

export default function AccountScreen(props: any) {
    const {navigation} = props;

    // @ts-ignore
    const {customer}: {} = useContext(AuthContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={Styles.headerText}>{customer.name}</Text>
            ),
            headerRight: () => (
                <MaterialCommunityIcons name='account-cog' size={28} onPress={openSettings} style={Styles.headerIcon}/>
            ),
        });
    }, [navigation]);

    const openSettings = () => {
        navigation.navigate('AccountSettingsScreen', {})
    }
    return (
        <View style={Styles.flexContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={Styles.centeredView}>
                    <View style={Styles.modalView}>
                        <Text style={Styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[Styles.button, Styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={Styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <ListItem key="account-orders"  style={{}}>
                <ListItem.Content style={{}}>
                    <ListItem.Title>
                        <Text style={Styles.subtitle}>My orders</Text>
                    </ListItem.Title>
                </ListItem.Content>
                <ListItem.Content right>
                    <Text onPress={() => navigation.navigate('MyOrdersScreen', {})}>
                        All orders {">>"}
                    </Text>
                </ListItem.Content>
            </ListItem>
        </View>
    );
}

