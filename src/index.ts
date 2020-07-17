import Fastify from 'fastify'
import 'module-alias/register'
import pino from 'pino'
import 'source-map-support/register'
import jwtAuthenticationPlugin from './modules/users/infrastructure/fastify/JWTAthenticationPlugin'
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
    await fastify.register(jwtAuthenticationPlugin)

    fastify.post(
        '/auth',
        {
            preValidation: fastify.auth([
                fastify.validateUserPassword
            ])
        },
        async (request, reply) => {
            const body = request.body as any

            // eslint-disable-next-line @typescript-eslint/return-await
            return reply.jwtSign({
                username: body.username
            })
        }
    )

    fastify.get(
        '/secure',
        {
            preValidation: fastify.auth([fastify.validateJWT])
        },
        async (request, reply) => {
            return {
                message: 'This resource is secure.'
            }
        }
    )

    await fastify.listen(3000)
}

main().catch(handleFatalError)
