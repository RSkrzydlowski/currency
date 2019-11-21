const HtmlWebPackPlugin = require('html-webpack-plugin');

var path = require('path');

var SRC_DIR = path.join(__dirname, 'src');

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader'
					}
				]
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.scss$/,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ]
			}
		]
	},
	entry: SRC_DIR + '/index.js',
	output: {
		path: path.resolve(__dirname, `../../build`),
		filename: 'bundle.js',
		libraryTarget: 'umd',
		publicPath: '/'
	},
	resolve: {
		extensions: [ '.js', '.jsx' ]
	},
	devtool: 'eval',
	devServer: {
		contentBase: path.resolve(__dirname, '../../build'),
		historyApiFallback: true,
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html'
		})
	]
};
