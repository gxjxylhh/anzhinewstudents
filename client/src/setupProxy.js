// /client/src/setupProxy.js

// /client/src/setupProxy.js

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    //proxy setup currently at localhost 5000
    app.use(proxy('/*', { target: 'http://localhost:5000' }))
};