import React from "react";
import { View, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../../utils/Colors";
import {Text} from "../Themed";
import Styles from "../Styles";

const { width, height, _text } = Dimensions.get("window");

const Loader = () => {
    const text = _text || 'Processing, please wait!'
  return (
    <View
      style={{
        position: "absolute",
        flex: 1,
        width,
        height,
        backgroundColor: "rgba(128, 129, 130,0.5)",
        zIndex: 1001,
        justifyContent: "center",
      }}
    >
      <Text style={{textAlign: 'center', marginBottom: 10}}> {text} </Text>
      <ActivityIndicator size='large' color={Colors.lighter_green} />
    </View>
  );
};

export default Loader;
