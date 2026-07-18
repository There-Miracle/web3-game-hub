const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  context: __dirname,
  mode: isProduction ? 'production' : 'development',
  entry: path.join(__dirname, 'src', 'main.jsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: isProduction ? 'assets/[name].[contenthash].js' : 'assets/bundle.js',
    publicPath: '/',
    clean: isProduction,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    fullySpecified: false,
    modules: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, '..', 'node_modules'),
    ],
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, '..', 'node_modules'),
      path.join(__dirname, 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: { fullySpecified: false },
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: {
                filter: (url) => !url.startsWith('/'),
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|mp4|woff2?|ttf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      inject: 'body',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'public'),
          to: '.',
          noErrorOnMissing: true,
        },
        {
          from: path.join(__dirname, 'src', 'assets', 'owl-carousel'),
          to: 'owl-carousel',
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  // Inline source maps made the dev bundle >100MB and the tab stayed blank while it parsed.
  devtool: false,
  performance: {
    hints: false,
  },
  watchOptions: {
    ignored: ['**/node_modules/**', '**/.git/**'],
  },
};
