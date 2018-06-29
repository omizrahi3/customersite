import { PRODUCT_ADDED, REMOVE_PRODUCT, LOAD_CART } from "./types";

export const loadCart = cart => ({
  type: LOAD_CART,
  cart
});

export const productAdded = product => ({
  type: PRODUCT_ADDED,
  product
});

export const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId
});

export const atc = product => dispatch => {
  const storedCart = JSON.parse(localStorage.getItem("chatwithCart"));
  storedCart.push(product);
  localStorage.setItem("chatwithCart", JSON.stringify(storedCart));
  return dispatch(productAdded(product));
};

export const rfc = ProductOptionId => dispatch => {
  const storedCart = JSON.parse(localStorage.getItem("chatwithCart"));
  const newCart = storedCart.filter(item => item.ProductOptionId !== ProductOptionId);
  localStorage.setItem("chatwithCart", JSON.stringify(newCart));
  return dispatch(removeProduct(ProductOptionId));
};