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
    }

    private setupAuth(): void {
        if (
            this.httpServer.server.validateUserPassword === undefined
        ) {
            return
        }

        this.httpServer.post(
            '/auth',
            async (request, reply) => {
                const user = request.user as RequestUser
                reply.code(200)

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
