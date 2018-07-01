import { EMPTY_CART } from "./types";
import api from "../api";

export const emptyCart = () => ({
  type: EMPTY_CART
});

export const checkoutGuest = data => dispatch =>
  api.checkout.guest(data)
  .then(res => {
    console.log('RESPONSE');
    console.log(res.Response[0].Response);
    const { Error = false, Response = '' } = res.Response[0].Response.CreateProductValue;
    if (Error) return Promise.reject({server: Response})
    else return res;
  })
  .then(res => {
    localStorage.removeItem("chatwithCart");
    dispatch(emptyCart());
  })

export const checkoutExisting = data => dispatch =>
  api.checkout.existing(data)
  .then(res => {
    // console.log('RESPONSE');
    // console.log(res.Response[0].Response);
    const { Error = false, Response = '' } = res.Response[0].Response.CreateProductValue;
    if (Error) return Promise.reject({server: Response})
    else return res;
  })
  .then(res => {
    localStorage.removeItem("chatwithCart");
    dispatch(emptyCart());
  })

export const checkoutNew = data => dispatch =>
  api.checkout.new(data)
  .then(res => {
    // console.log('RESPONSE');
    // console.log(res.Response[0].Response);
    const { Error = false, Response = '' } = res.Response[0].Response.CreateProductValue;
    if (Error) return Promise.reject({server: Response})
    else return res;
  })
  .then(res => {
    localStorage.removeItem("chatwithCart");
    dispatch(emptyCart());
  })

export const checkoutUpdate = data => dispatch =>
  api.checkout.update(data)
  .then(res => {
    console.log('RESPONSE');
    console.log(res);
    const { Error = false, Response = '' } = res.CreateProductValue;
    if (Error) return Promise.reject({server: Response})
    else return res;
  })
  .then(res => {
    dispatch(checkoutSuccess());
  })