// Webpack uses this to work with directories
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const pages = require('./src/javascript/pages');

module.exports = {
  entry: './src/javascript/index.js',
  output: {
    path: path.resolve(__dirname, 'rovic-components'),
    filename: 'scripts/bundle.js'
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: (filename, resourcePath, context) => {
                let relativePath = path.relative(context, resourcePath);
                relativePath = relativePath.replace('src\\', '');
                relativePath = relativePath.replace(/\\/g, '/');
                return relativePath;
              }
            },
          }
        ]
      },
      /* Descomentar si se añaden fuentes
      {
        test: /\.(woff)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../fonts/',
            },
          },
        ],
      },
      */
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          partialDirs: [
            path.join(__dirname, 'src', 'views'),
            path.join(__dirname, 'src', 'views', 'layout'),
            path.join(__dirname, 'src', 'components'),
          ],
        },
      }
    ],
  },
  plugins: [
    ...pages.map(page => new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', `${page.path + page.fileName}.hbs`),
      filename: `./${page.path}index.html`,
      title: page.title,
    })),
    new CssoWebpackPlugin(),
  ],
  stats: {
    children: false
  }
};
