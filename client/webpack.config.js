const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        chunks: ['main'],
        filename: 'index.html',
      }),
      new WebpackPwaManifest({
        name: 'Just A Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        crossorigin: 'use-credentials',
        orientation: 'portrait',
        display: 'standalone',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: 'defaults' }]],
            },
          },
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
