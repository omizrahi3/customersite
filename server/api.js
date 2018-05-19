import express from 'express';
import bodyParser from 'body-parser';
import validateSignupInput from '../helpers/validate';

const api = express.Router();

api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())

api.post('/users', (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);

  if (isValid) {
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