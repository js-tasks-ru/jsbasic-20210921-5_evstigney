const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");

module.exports = {
	mode: process.env.NODE_ENV || 'production', // development, production, none
	entry: './9-module/2-task/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, './'),
		port: 8080,
	},
	resolve: {
    extensions: ['.js', '.json', '.wasm'],
		mainFields: ['module', 'main'],
		mainFiles: ['index'],
  },
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
					{
						loader: 'style!css',
					},
        ]
			}
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({template: './9-module/2-task/index.html'}),
	]
};
