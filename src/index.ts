import Fastify from 'fastify'
import 'module-alias/register'
import 'source-map-support/register'
import { HttpServer } from './HttpServer'

const httpServer = new HttpServer(
    Fastify({
        logger: true
    })
)

httpServer.get('/sync', (request, reply) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    reply.send({ type: 'sync' })
})

httpServer.get('/async', async (request, reply) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    reply.code(201)

    return {
        type: 'async'
    }
})

httpServer
    .listen(3000)
    .then(console.log)
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
