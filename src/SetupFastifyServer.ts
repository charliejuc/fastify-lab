import Fastify, { FastifyInstance } from 'fastify'
import pino from 'pino'

const fastifyDefaultOptions = {
    logger: pino({
        prettyPrint: true
    })
}

let fastify: FastifyInstance | null = null
export function setupFastifyServer(): FastifyInstance {
    if (fastify === null) {
        fastify = Fastify(fastifyDefaultOptions)
    }

    return fastify
}
