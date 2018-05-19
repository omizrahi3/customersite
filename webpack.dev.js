import path from 'path';
import webpack from 'webpack';

export default {
  entry: [
    path.join(__dirname, './client/index.js')
  ],
  output: {
    filename: 'bundle.js',
    path: '/',
    publicPath: '/'
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'helpers')
        ],
        use: ['babel-loader']
      }
    ]
  }
}