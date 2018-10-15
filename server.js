const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)
const { join } = require('path')

const express = require('express')

app.prepare().then(() => {
	const server = express();
	server.use('/robots.txt', express.static(join(__dirname, '/static/robots.txt')));
	server.use('/sitemap.xml', express.static(join(__dirname, '/static/sitemap.xml')));
	server.use('/google1d28c663b970d3ad.html', express.static(join(__dirname, '/static/google1d28c663b970d3ad.html')));
	server.use(handler).listen(3000)
})

/*require('laravel-echo-server').run({
    authHost: 'https://api.lifein.love/',
    authEndpoint: '/broadcasting/auth',
    devMode: true,
    database: "redis",
    databaseConfig: {
        redis: {
            host: 'localhost',
            port: 6379,
        }
    },
    apiOriginAllow: {
        "allowCors" : true,
        "allowOrigin" : "http://127.0.0.1",
        "allowMethods" : "GET, POST",
        "allowHeaders" : "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id"
    },
});*/