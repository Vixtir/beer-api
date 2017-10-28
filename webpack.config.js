const path = require('path');

module.exports = {
  entry: './public/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'app.bundle.js'
  }
};