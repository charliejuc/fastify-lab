import { FastifyReply } from 'fastify'

declare module 'fastify' {
    export interface FastifyRequest {
        user?: Object
    }

    export interface FastifyInstance {
        validateUserPassword?(
            request: FastifyRequest,
            reply: FastifyReply
        ): Promise<void>
    }
}
