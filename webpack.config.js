
var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var libPath = path.resolve(__dirname, 'lib');
var mainPath = path.resolve(__dirname, 'src','react-rating.js');
var package = require('./package.json');
var banner = package.name + '-' + package.version + '(c) ' + package.author.name;

module.exports = {
	entry: {
		start: ['./src/react-jrate.jsx', './src/index.jsx']
	},
	output: {
		path: libPath,
		filename: "react-jrate.js",
		library: "react-jrate",
		libraryTarget: "umd"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: [nodeModulesPath]
			}
		]
	}
};
	