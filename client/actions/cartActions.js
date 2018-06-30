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

export const replaceCart = cart => ({
  type: REPLACE_CART,
  cart
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

export const editCart = product => (dispatch, getState) => {
  const cart = getState().cart;
  const found = cart.findIndex(element => {
    console.log('/////////////////////////////////////');
    console.log(product)
    console.log(element.ProductOptionId);
    console.log('/////////////////////////////////////');
    if (product.ProductOptionId === element.ProductOptionId) {
      console.log('winner winner chicken dinner');
    }
    return element.ProductOptionId === product.ProductOptionId;
  });
  console.log(found);
  const storedCart = JSON.parse(localStorage.getItem("chatwithCart"));
  const newCart = storedCart.map((existing, index) => index === found ? product : existing)
  localStorage.setItem("chatwithCart", JSON.stringify(newCart));
  return dispatch(replaceCart(newCart));
};