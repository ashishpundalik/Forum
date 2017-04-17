const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sourcePath = path.join(__dirname, '../src');
const imgPath = path.join(__dirname, sourcePath+'/assets/img');

const rules = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  query: {
      presets: [['es2015', {modules: false}], 'react']
  },
  loader: 'babel-loader'
}, {
  test: /\.(png|gif|jpg|svg)$/,
  include: imgPath,
  use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]'
}];

if (isProduction) {
  rules.push(
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!postcss-loader!sass-loader',
      }),
    }
  );
} else {
  rules.push(
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader?sourceMap',
      ],
    }
  );
}

module.exports = rules;
