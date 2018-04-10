const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
	resolve: {
		extensions: [".js", ".jsx"]
	},
	entry: {
		vendors: ['es5-shim','es5-shim/es5-sham','console-polyfill',"match-media","antd", "react", "react-dom","react-router"]
	},
	output: {
		path: path.join(__dirname,"public", "dll"),
		filename: "[name].js",
		library: "[name]_[hash]"
	},
	plugins: [
		new webpack.DllPlugin({
			context: path.join(__dirname),
			path: path.join(__dirname, "public","dll", "[name]-manifest.json"),
			name: "[name]_[hash]"
		}),
        new UglifyJsPlugin({
            uglifyOptions: {
                ie8: true
            }
        })
	]
};