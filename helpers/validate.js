import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateSignupForm(data) {
  let errors = {};

  if (isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (isEmpty(data.email)) {
    errors.email = 'This field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!isEmpty(data.password) && !isEmpty(data.passwordConfirmation)) {
    if (!Validator.equals(data.password, data.passwordConfirmation)) {
      errors.passwordConfirmation = 'Passwords must match';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}