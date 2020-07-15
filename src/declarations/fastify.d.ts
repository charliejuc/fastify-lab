import { FastifyRequest } from 'fastify'

export interface FastifyCustomRequest extends FastifyRequest {
    user?: Object
}
