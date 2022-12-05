const parcel = require('parcel-bundler');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(createProxyMiddleware('/api', {
    target: "http://192.168.0.195:5000/",
    secure: true
    
}));

const bundler = new parcel('client/src/index.html', {
    outDir: 'client/dist',
    outFile: 'simpleGroupWare.html',
    watch: true,
    cache: false,
    minify: false,
    target: "browser",
    https: false,
    logLevel: 3,
    sourceMaps: false,
    detailedReport: false
});

app.use(bundler.middleware());

app.listen(1234);