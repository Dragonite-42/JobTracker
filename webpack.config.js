const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './client/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	mode: process.env.NODE_ENV,
	devServer: {
		publicPath: '/',
		compress: true,
		port: 8080,
		proxy: {
			'/': 'http://localhost:3000/',
		},
		hot: true,
	},
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'client/index.html',
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
};
