import { PRODUCT_ADDED, REMOVE_PRODUCT, LOAD_CART, REPLACE_CART, EMPTY_CART } from "../actions/types";

export default function cart(state = [], action = {}) {
  switch (action.type) {
    case EMPTY_CART:
      return []
    case LOAD_CART :
      return [...action.cart];
    case REPLACE_CART :
      return [...action.cart];
    case PRODUCT_ADDED :
      return [...state, action.product];
    case REMOVE_PRODUCT :
      return [...state.filter(item => item.ProductOptionId !== action.productId)];
    default:
      return state;
  }
}
