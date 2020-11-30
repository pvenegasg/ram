const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  mode: 'development',

  entry: './src/index.tsx',

  output: {
    filename: '[name]-[fullhash].bundle.js',
    path: path.join(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },

  devServer: {
    host: '0.0.0.0',
    port: '8080',
    compress: true,
    contentBase: path.join(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  externals:
    NODE_ENV === 'production' ? ['react', 'react-dom', 'axios', 'antd'] : [],

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[fullhash].styles.css',
      chunkFilename: '[id]-[fullhash].styles.css',
    }),

    new HtmlWebpackPlugin({
      template:
        NODE_ENV === 'production'
          ? './src/index.prod.template.html'
          : './src/index.dev.template.html',
    }),
  ],
};
