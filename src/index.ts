import 'source-map-support/register'
import 'module-alias/register'
import Fastify from 'fastify'

const fastify = Fastify({
    logger: true
})

fastify.get('/sync', (request, reply) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    reply.send({ type: 'sync' })
})

fastify.get('/async', async (request, reply) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    reply.code(201)

    return {
        type: 'async'
    }
})

fastify.listen(3000).catch((error) => {
    console.error(error)
    process.exit(1)
})
