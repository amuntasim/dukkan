import React, {useContext} from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
//Redux
// import { useDispatch } from "react-redux";
//Action
// import { removeFromCart, addToCart, decCartQuantity } from "../../../reducers";
import {
  AddToCart,
  RemoveItemCart,
  UpdateExistingItemQuantity,
  RemoveSingleItemFromCart
} from "../../../constants/ActionTypes";
//Text
import CustomText from "../../../components/UI/CustomText";
//Colors
import Colors from "../../../utils/Colors";
import { CartItem } from "./CartItem";
import Messages from "../../../messages/user";
import CartContext from "../../../context/cart";

export const CartBody = ({
  navigation,
  carts,
  loadCarts,
  isRefreshing,
}) => {
  const {cartState, dispatch} = useContext(CartContext)

  const onRemove = (itemId) => {
    Alert.alert("Removing item", "You want to remove item from the cart. Are you sure?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          dispatch({type: RemoveSingleItemFromCart, itemId });
        },
      },
    ]);
  };
  return (
    <View style={styles.footer}>
      {carts.cartItems.length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 16 }}>
            There are no products in the cart yet
          </CustomText>
        </View>
      ) : (
        <View style={{ marginBottom: 80 }}>
          <FlatList
            data={carts.cartItems}
            onRefresh={loadCarts}
            refreshing={isRefreshing}
            keyExtractor={(item) => item.item.productId}
            renderItem={({ item }) => {
              const itemId = item.item.productId;
              return (
                <CartItem
                  item={item}
                  onRemove={() => onRemove(itemId)}
                  onAdd={() => {
                    dispatch({type: UpdateExistingItemQuantity, itemId, quantity: item.quantity + 1});
                  }}
                  onDes={() => {
                    dispatch({type: UpdateExistingItemQuantity, itemId, quantity: item.quantity - 1});
                  }}
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
  },
  nextButton: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.lighter_green,
    borderRadius: 5,
    borderColor: Colors.lighter_green,
    marginTop: 10,
  },
  center: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
