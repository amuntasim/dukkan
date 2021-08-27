import * as React from 'react';
import {useContext} from 'react';
import styles from '../components/Styles';

import {Text, View} from '../components/Themed';
import {Keyboard, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback} from "react-native";
import {Button} from 'react-native-elements';
import AuthContext from "../context/auth";
import Settings from "../constants/Settings";
import {Formik} from 'formik';

export default function SignInScreen() {
    // @ts-ignore
    const {signed, signIn} = useContext(AuthContext)

    return (
        // <KeyboardAvoidingView style={styles.flexContainer} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        onSubmit={(values) => {
                            signIn(values);
                        }}
                    >
                        {props => (
                            <View style={styles.loginFormView}>
                                <Text style={styles.logoText}>{Settings.appName}</Text>
                                <TextInput placeholder="Username"
                                           style={styles.loginFormTextInput}
                                           onChangeText={props.handleChange('email')}
                                           value={props.values.email}
                                />
                                <TextInput placeholder="Password" style={styles.loginFormTextInput}
                                           onChangeText={props.handleChange('password')}
                                           value={props.values.password}
                                           secureTextEntry={true}/>
                                <Button
                                    buttonStyle={styles.loginButton}
                                    onPress={() => props.handleSubmit()}
                                    title="Login.."
                                />
                            </View>
                        )}
                    </Formik>
                </View>
            </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>
    );
}

