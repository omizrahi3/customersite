import express from 'express';
import path from 'path';
import fs from 'fs';
import https from 'https';
import proxy from 'express-http-proxy';

const certOptions = {
  key: fs.readFileSync(path.join(__dirname, './ssl/server.key')),
  cert: fs.readFileSync(path.join(__dirname, './ssl/server.crt'))
}

import api from './api';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev'

const app = express();

app.use('/api', proxy('www.qa.getchatwith.com'));

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))

app.use(webpackHotMiddleware(compiler));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
});

// app.listen(3000, () => {
//   console.log('listening to port 3000')
// });

https.createServer(certOptions, app).listen(3000, () => {
  console.log('listening to port 3000 on HTTPS');
})