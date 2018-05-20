import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export const validateSignupForm =  function validateSignupForm(data) {
  console.log('validateSignupForm');
  let errors = {};

  if (isEmpty(data.Firstname)) {
    errors.Firstname = 'This field is required';
  }
  if (isEmpty(data.Lastname)) {
    errors.Lastname = 'This field is required';
  }
  if (isEmpty(data.EmailAddress)) {
    errors.EmailAddress = 'This field is required';
  } else if (!Validator.isEmail(data.EmailAddress)) {
    errors.EmailAddress = 'Email is invalid';
  }
  if (isEmpty(data.Password)) {
    errors.Password = 'This field is required';
  }
  if (isEmpty(data.PasswordConfirmation)) {
    errors.PasswordConfirmation = 'This field is required';
  }
  if (!isEmpty(data.Password) && !isEmpty(data.PasswordConfirmation)) {
    if (!Validator.equals(data.Password, data.PasswordConfirmation)) {
      errors.PasswordConfirmation = 'Passwords must match';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const validateLogin = function validateLogin(data) {
  console.log('validateLogin')
  let errors = {};

  if (Validator.isEmpty(data.EmailAddress)) {
    errors.EmailAddress = 'This field is required';
  } else if (!Validator.isEmail(data.EmailAddress)) {
    errors.EmailAddress = 'Email is invalid';
  }
  if (Validator.isEmpty(data.Password)) {
    errors.Password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}