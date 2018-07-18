
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin

module.exports = {
  entry: __dirname + "/src/js/index.js", // webpack entry point. Module to start building dependency graph
  devtool: 'cheap-module-eval-source-map',
  mode: "development",
  output: {
    path: __dirname + '/dist', // Folder to store generated bundle
    filename: 'bundle.js',  // Name of generated bundle after build
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },
  module: {  // where we defined file patterns and their loaders
      rules: [ 

          {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: [
              /node_modules/
            ]
          },
          {
            test: /\.(sass|scss)$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
          }
      ]
  },
  plugins: [  // Array of plugins to apply to build chunk
      new HtmlWebpackPlugin({
          template:  './public/index.html',
          inject: 'head'
      })
  ]//,
//   devServer: {  // configuration for webpack-dev-server
//       contentBase: './src/public',  //source of static assets
//       port: 7700, // port to run dev-server
//   } 
};

