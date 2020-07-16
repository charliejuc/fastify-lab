import {
    FastifyRequest,
    FastifyInstance,
    FastifyReply
} from 'fastify'

export interface FastifyCustom extends FastifyInstance {
    validateUserPassword?(
        request: FastifyCustomRequest,
        reply: FastifyReply
    ): Promise<void>
}

export interface FastifyCustomRequest extends FastifyRequest {
    user?: Object
}

type RouteHandlerMethodCustom = (
    request: FastifyCustomRequest,
    reply: FastifyReply
) => void | Promise<any>
