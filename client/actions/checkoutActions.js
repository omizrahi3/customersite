import { EMPTY_CART } from "./types";
import api from "../api";

export const emptyCart = () => ({
  type: EMPTY_CART
});

export const checkoutExisting = data => dispatch =>
  api.checkout.existing(data)
  .then(res => {
    // const { Error = false, Response = '' } = res.CreateProductValue;
    // if (Error) return Promise.reject({server: Response})
    // else return res;
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

export const checkoutNew = data => dispatch =>
  api.checkout.new(data)
  .then(res => {
    // console.log('FIRST');
    // console.log(res);
    // console.log('SECOND');
    // console.log(res.Response);
    // console.log('THIRD');
    // console.log(res.Response[0])
    // console.log('CreateProductValue');
    // console.log(res.Response[0].Response.CreateProductValue)
    // console.log('Error');
    // console.log(res.Response[0].Error)

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