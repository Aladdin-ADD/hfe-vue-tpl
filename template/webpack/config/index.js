// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
    build: {
        env: require('./prod.env'),
        assetsRoot: path.resolve(__dirname, '../../build'),
        assetsPublicPath: '',
        productionSourceMap: true
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        assetsPublicPath: '/',
        proxyTable: {},
        vueDevTools: true
    }
};
