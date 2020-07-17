import fastifyPlugin from 'fastify-plugin'
import fastifyAuth from 'fastify-auth'
import fastifyJWT from 'fastify-jwt'
import { FastifyRequest, FastifyReply } from 'fastify'

const jwtAuthenticationPlugin = fastifyPlugin(async (fastify) => {
    async function validateUserPasswordFromRequest(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> {
        const body = request.body as any

        const username = body.username
        const password = body.password

        if (username !== 'terminal-life' || password !== '1234') {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            reply.code(401).send({
                error: 'Invalid Credentials'
            })
        }
    }

    async function validateJWTFromRequest(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> {
        try {
            await request.jwtVerify()
        } catch (error) {
            fastify.log.error(error)
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            reply.code(401).send({
                error: 'Invalid Token'
            })
        }
    }

    try {
        await fastify
            .register(fastifyAuth)
            .register(fastifyJWT, {
                secret: 'MySuperSecretPassword'
            })
            .decorate(
                'validateUserPassword',
                validateUserPasswordFromRequest
            )
            .decorate('validateJWT', validateJWTFromRequest)
            .after()
    } catch (error) {
        fastify.log.error(error)
    }
})

export default jwtAuthenticationPlugin
