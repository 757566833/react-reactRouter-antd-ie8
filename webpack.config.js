const path = require('path')
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const extractLess = new ExtractTextPlugin({
    filename: "antd.css",
    disable: process.env.NODE_ENV === "development"
});

console.log("开始封装")
module.exports = {
    entry: {
        index: './src/index.jsx'
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, './public'),
    },
    resolve: {
        extensions: [' ', '.js', '.json', '.scss', '.css', '.less']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                options: {
                    presets: ['env', "stage-0", "react"]
                },
                exclude: /node_modules/
            },
            {
                test: /\.css?$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: { loader: "css-loader", options: { modules: true, minimize: true } }
                })
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader", options: { minimize: true }
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(jpg|jpeg|png|svg|gif|woff|woff2|otf|ttf)?$/,
                loader: ['url-loader?limit=8192']
            },
            {
                test: /\.jsx?$/,
                enforce: "post",
                loader: "es3ify-loader"
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: path.join(__dirname),
            manifest: require("./public/dll/vendors-manifest.json")
        }),
        new ExtractTextPlugin("index.css"),
        new UglifyJsPlugin({
            uglifyOptions: {
                ie8: true
            }
        }),
        extractLess
    ]
};
