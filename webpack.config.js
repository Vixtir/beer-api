const path = require('path');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');

module.exports = {
  entry: './public/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'app.bundle.js'
  },
  module: {
      rules:[
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [ 'css-loader' ]
        })
        },
      ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ],
  watch: true
};