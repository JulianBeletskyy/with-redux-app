const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)
const { join } = require('path')
const compression = require('compression')

const express = require('express')
var http = require('http');  
var https = require('https');

http.globalAgent.maxSockets = Infinity;  
https.globalAgent.maxSockets = Infinity;


app.prepare().then(() => {
	const server = express();
    server.use(compression({level: 9}))
    server.get('/index.js', function (req, res) {  
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.render('index.js');
    });
	server.use('/robots.txt', express.static(join(__dirname, '/static/robots.txt')));
	server.use('/sitemap.xml', express.static(join(__dirname, '/static/sitemap.xml')));
	server.use('/google1d28c663b970d3ad.html', express.static(join(__dirname, '/static/google1d28c663b970d3ad.html')));
	server.use(handler).listen(3000)
})

require('laravel-echo-server').run({
    authHost: 'https://api.lifein.love', //'https://api.lifein.love',
    authEndpoint: '/broadcasting/auth',
    secure: true,
    protocol: 'https',
    sslCertPath: '/etc/nginx/ssl/lifein.crt',
    sslKeyPath: '/etc/nginx/ssl/lifein.key',
    sslCertChainPath: '/etc/nginx/ssl/lifein-bundle.crt',
    devMode: true,
    database: "redis",
    databaseConfig: {
        redis: {
            host: 'lifein.mrzfhe.0001.usw1.cache.amazonaws.com',
            port: 6379,
        }
    },
    apiOriginAllow: {
        "allowCors" : true,
        "allowOrigin" : "http://127.0.0.1",
        "allowMethods" : "GET, POST",
        "allowHeaders" : "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id"
    },
});