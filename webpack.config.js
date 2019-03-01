const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
      main: ["./src/index.js"]
    },
    output: {
      filename: "main.js",
      path: path.resolve(__dirname+'/dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use:  {
            loader: 'html-loader'
          }
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]' 
                },
              }
                 ]
        },
        { 
          test: /\.less$/,
          use: [
              isProduction ? MiniCssExtractPlugin.loader: 'style-loader',
              'css-loader', 
              'less-loader'
          ]
        }
      ]
    },
    plugins: isProduction ? [new MiniCssExtractPlugin({ 
      filename: "styles.css"
    }),
      
    ] : []

  };
