import React, {useContext} from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
//Text
import CustomText from "../../../components/UI/CustomText";
//Icon
import { Ionicons } from "@expo/vector-icons";
//Colors
import Colors from "../../../utils/Colors";
import CartContext from "../../../context/cart";

const { height } = Dimensions.get("window");

export const Header = ({ navigation }) => {
    const {cartState, dispatch} = useContext(CartContext)
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons
          name='ios-arrow-back'
          size={30}
          color={Colors.lighter_green}
        />
      </TouchableOpacity>
      <CustomText style={styles.titleHeader}>
        Cart{" "}
        {cartState.cartItems.length === 0
          ? ""
          : `(${cartState.cartItems.length})`}
      </CustomText>
      <View style={{ width: 15 }} />
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: Platform.OS === "android" ? 85 : height < 668 ? 85 : 90,
    paddingVertical: 0,
    paddingHorizontal: 20,
    paddingBottom: 10,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 4,
  },
  titleHeader: {
    textAlign: "center",
    color: Colors.lighter_green,
    fontSize: 20,
  },
});
