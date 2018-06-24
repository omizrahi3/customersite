import { CHECKOUT_SUCCESS } from "./types";
import api from "../api";

export const checkoutSuccess = () => ({
  type: CHECKOUT_SUCCESS
});

export const checkoutExisting = data => dispatch =>
  api.checkout.existing(data)
  .then(res => {
    const { Error = false, Response = '' } = res.CreateProductValue;
    if (Error) return Promise.reject({server: Response})
    else return res;
  })
  .then(res => {
    dispatch(checkoutSuccess());
  })

export const checkoutNew = data => dispatch =>
  api.checkout.new(data)
  .then(res => {
    const { Error = false, Response = '' } = res.CreateProductValue;
    if (Error) return Promise.reject({server: Response})
    else return res;
  })
  .then(res => {
    dispatch(checkoutSuccess());
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