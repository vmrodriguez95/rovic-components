// Webpack uses this to work with directories
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/javascript/index.js',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
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
    new MiniCssExtractPlugin({
      filename: 'styles/styles.css'
    }),
  ]
});
