const routes = module.exports = require('next-routes')()

routes.add('success-stories', '/success-stories')
routes.add('success-stories/story', '/success-stories/:slug')

routes.add('blogs', '/blogs')
routes.add('blogs/blog', '/blogs/:slug')

routes.add('index', '/activate/:hash')

routes.add('girls', '/girls', '/')
routes.add('men', '/men', '/')

routes.add('contacts', '/contacts/:slug')

routes.add('member', '/member/:id')

routes.add('mail', '/mail/:slug')

routes.add('mail/message', '/mail/:slug/:id')

routes.add('profile', '/profile/:slug')

routes.add('edit', '/edit/:slug')

