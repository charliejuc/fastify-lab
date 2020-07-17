import { FastifyReply, FastifyRequest } from 'fastify'

declare module 'fastify' {
    interface FastifyInstance {
        validateUserPassword: (
            request: FastifyRequest,
            reply: FastifyReply
        ) => Promise<void>
        validateJWT: (
            request: FastifyRequest,
            reply: FastifyReply
        ) => Promise<void>
    }
}
