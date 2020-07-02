const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    promo: ['./pages/promo/promo.app.js'],
    app: ['./app.js'],
  },
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: false,
      template: './pages/promo/promo.index.html',
      filename: './index.html'
    }),
    new HTMLWebpackPlugin({
      inject: false,
      template: './pages/main/main.index.html',
      filename: './main.index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: './assets/favicon/',
        to: './assets/favicon/',
      },
      {
        from: './assets/fonts/',
        to: './assets/fonts/',
      },
      {
        from: './assets/img/',
        to: './assets/img/',
      },
      {
        from: './assets/audio/',
        to: './assets/audio/',
      },
      {
        from: './pages/promo/assets/img/',
        to: './assets/promo/img/',
      },
      {
        from: './pages/main/components/some_component/assets/',
        to: './assets/main/',
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(mp3|wav)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: './assets/audio/',
          },
        }],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './assets/img/',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|wooff2|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: './assets/fonts',
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    stats: 'errors-only',
    clientLogLevel: 'none'
  }
};