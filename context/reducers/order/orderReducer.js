import {
  ADD_ORDER,
  FETCH_ORDER,
  ORDER_LOADING,
  ORDER_FAILURE,
} from "./orderActions";


export const OrderReducer = (state, action) => {
  const {orders} = state;
  switch (action.type) {
    case ORDER_LOADING:
      return {
        ...state,
        orders,
        isLoading: true,
      };

    case FETCH_ORDER:
      return {
        ...state,
        orders: action.orderData,
        isLoading: false,
      };
    case ADD_ORDER:
      orders.push(action.orderItem);
      return {
        ...state,
        orders,
        isLoading: false,
      };

    case ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
