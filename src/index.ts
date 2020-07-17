import Fastify from 'fastify'
import 'module-alias/register'
import pino from 'pino'
import 'source-map-support/register'
import { handleFatalError } from './utils/ErrorUtil'

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', (reason) =>
    handleFatalError(new Error(String(reason)))
)

const fastify = Fastify({
    logger: pino({
        prettyPrint: true
    })
})

async function main(): Promise<void> {
    fastify.get('/sync', (request, reply) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        reply.send({ type: 'sync' })
    })

    fastify.get('/async', async (request, reply) => {
        return {
            type: 'async'
        }
    })

    await fastify.listen(3000)
}

main().catch(handleFatalError)
