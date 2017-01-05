var glob = require('glob')
var config = require('./config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./webpack/dev-client'].concat(baseWebpackConfig.entry[name])
})

var html = glob.sync('./src/pages/*/*.html').map(function (item) {
    return new HtmlWebpackPlugin({
        data: {
            build: false
        },
        filename: item.substr(6),
        template: 'ejs-compiled!' + item,
        inject: false,
        minify: false
    })
})

module.exports = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders()
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ].concat(html)
})
