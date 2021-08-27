import {
  InitCart,
  AddToCart,
  RemoveItemCart,
  UpdateExistingItemQuantity,
  RemoveSingleItemFromCart
} from "../../constants/ActionTypes";
import {Cart} from "../../models/Cart";

const findIndex = (cartList, id) => {
  const index = cartList.findIndex((cart) => {
    return cart.item.productId === id;
  });
  return index;
};

export const CartReducer = (state, action) => {
  const {cartItems} = state;
  let index;
  switch (action.type) {
    case InitCart:
      return action.cart;

    case AddToCart:
      const {productId} = action.cartItem;
      if (cartItems.length !== 0) {
        index = findIndex(cartItems, productId);
        if (index >= 0) {
          cartItems[index] = new Cart(
              action.cartItem,
              +cartItems[index].quantity + action.quantity
          );
        } else {
          const newItem = new Cart(action.cartItem, action.quantity);
          cartItems.push(newItem);
        }
      } else {
        const newItem = new Cart(action.cartItem, action.quantity);
        cartItems.push(newItem);
      }

      return {
        ...state,
        cartItems,
        isLoading: false,
      };

    case RemoveItemCart:
        index = findIndex(cartItems, action.itemId);
      // console.log('cartItems[index]')
      // console.log(cartItems[index])
        // if (index >= 0) {
        //   cartItems[index] = new Cart(
        //       action.cartItem,
        //       +cartItems[index].quantity + action.quantity
        //   );
        // } else {
        //   const newItem = new Cart(action.cartItem, action.quantity);
        //   cartItems.push(newItem);
        // }

      return {
        ...state,
        cartItems,
        isLoading: false,
      };

    case UpdateExistingItemQuantity:
      index = findIndex(cartItems, action.itemId);
      cartItems[index].quantity = Math.max(action.quantity, 0)
      return {
        ...state,
        cartItems,
        isLoading: false,
      };

    case RemoveSingleItemFromCart:
      index = findIndex(cartItems, action.itemId);
      cartItems.splice(index,1);
      return {
        ...state,
        cartItems,
        isLoading: false,
      };

    default:
      return state;
  }
}
