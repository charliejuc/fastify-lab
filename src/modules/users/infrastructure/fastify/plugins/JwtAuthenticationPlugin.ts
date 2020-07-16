import { FastifyReply, FastifyRequest } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import fastifyAuth from 'fastify-auth'

// return null user??
async function login(
    username: string,
    password: string
): Promise<Object | null> {
    if (username === undefined || password === undefined) {
        return null
    }

    if (username !== 'charliejuc' || password !== '123') {
        return null
    }

    return {
        username,
        password
    }
}

async function validateUserPasswordFromRequest(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<void> {
    const body = request.body as any
    const invalidCredentials = (): unknown =>
        reply.code(401).send('Invalid Credentials')

    const user = await login(body.username, body.password)

    if (user === null) {
        invalidCredentials()
        return
    }

    request.user = user
}

const fastifyJwtAuthPlugin = fastifyPlugin(async (fastify) => {
    try {
        await fastify
            .register(fastifyAuth)
            .decorate(
                'validateUserPassword',
                validateUserPasswordFromRequest
            )
            .after()
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
})

export default fastifyJwtAuthPlugin
