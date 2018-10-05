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
	server.use(handler).listen(3000)
})