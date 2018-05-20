import express from 'express';
import bodyParser from 'body-parser';
import validateSignupInput from '../helpers/validate';

const api = express.Router();

api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())

api.post('/users', (req, res) => {
  console.log('api requested');
  console.log(req.body);
  const { errors, isValid } = validateSignupInput(req.body);

  if (isValid) {
    console.log('is valid');
    res.json(
      {
        success: true
      }
    );
  } else {
    res.status(400).json(errors);
  }
})

export default api;