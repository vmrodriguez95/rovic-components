// Webpack uses this to work with directories
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new MinifyPlugin({}, {
      comments: false,
      sourceMap: false
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/styles.css'
    }),
  ]
});
