/* eslint-disable @typescript-eslint/no-floating-promises */
import { HttpServer } from './HttpServer'
import { RequestUser } from './declarations/user'

export class Router {
    private readonly httpServer: HttpServer

    constructor(httpServer: HttpServer) {
        this.httpServer = httpServer
    }

    setupRoutes(): void {
        this.setupAuth()

        this.httpServer.get(
            '/secure',
            (request, reply) => {
                reply.send('This resource in secure.')
            },
            {
                preValidation: this.httpServer.server.auth([
                    this.httpServer.server.validateJWT
                ])
            }
        )
    }

    private setupAuth(): void {
        this.httpServer.post(
            '/auth',
            async (request, reply) => {
                const user = request.user as RequestUser

                return await reply.jwtSign({
                    username: user.username
                })
            },
            {
                preValidation: this.httpServer.server.auth([
                    this.httpServer.server.validateUserPassword
                ])
            }
        )
    }
}
