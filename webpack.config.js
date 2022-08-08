/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")

const isDevelopment = true
module.exports = {
	entry: '/src/main.js',
	devServer:
	{
		historyApiFallback: true,
		port: 8080,
		open: true,
		static: {
			directory: path.join(__dirname, './public'),
		},
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main.js',
		publicPath: "/dist/"
	},
	mode: isDevelopment ? 'development' : 'production',
	module: {
		rules: [
			{

				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.module\.s(a|c)ss$/,
				use: [
					isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]__[sha1:hash:hex:7]'
							},
							sourceMap: isDevelopment
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isDevelopment
						}
					}
				]
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.s(a|c)ss$/,
				exclude: /\.module.(s(a|c)ss)$/,
				use: [
					isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isDevelopment
						}
					}
				]
			},
			{
				test: /\.svg$/,
				use: ["@svgr/webpack"]
			},
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles.css',
		}),
		new HtmlWebpackPlugin({
			template: 'public/index.html'
		}),
		new CopyPlugin({
			patterns: [
				{
					from: "public",
					to: "public",
					globOptions: {
						ignore: ["**/index.html"],
					},
				},

			],
		}),
	]
}
