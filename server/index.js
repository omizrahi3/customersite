import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev'

const app = express();

app.post('/api/users', (req, res) => {
  let errors = {};

  errors.username = 'username is required';
  errors.email = 'email is required';
  errors.password = 'password is required';
  errors.passwordConfirmation = 'password confirmation required';

  res.status(400).json(errors);
})

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))

app.use(webpackHotMiddleware(compiler));

// app.use(express.static('public'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
});

app.listen(3000, () => {
  console.log('listening to port 3000')
});
