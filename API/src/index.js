require('dotenv').config()

const fastify = require('fastify')({
    logger: true
})
fastify.register(require('@fastify/jwt'), {
    secret: process.env.TOKEN_KEY
})

fastify.register(require('fastify-bcrypt'), {
    saltWorkFactor: 10
})

fastify.register(require('@fastify/cors'), {
    origin: process.env.CORS_URL_ACCEPTED
})

const noteRoutes = require('./routes/note.routes')
const userRoutes = require('./routes/user.routes')

require('./db/db.js')

noteRoutes.forEach(route => {
    fastify.route(route)
})
userRoutes.forEach(route => {
    fastify.route(route)
})

const start = async () => {
    try {
        await fastify.listen({port: process.env.PORT || 3000})
        console.log('[+] Server connected')   
    } catch (err) {
        console.log(`[!] Connection error: ${err}`)
    }
}

fastify.get('/', (req, rep) => {
    rep.send('Home')
})

start()