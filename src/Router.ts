/* eslint-disable @typescript-eslint/no-floating-promises */
import { HttpServer } from './HttpServer'

export class Router {
    private readonly httpServer: HttpServer

    constructor(httpServer: HttpServer) {
        this.httpServer = httpServer
    }

    setupRoutes(): void {
        this.httpServer.get('/sync', (request, reply) => {
            reply.send({ type: 'sync' })
        })

        this.httpServer.get('/async', async (request, reply) => {
            reply.code(201)

            return {
                type: 'async'
            }
        })

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
                reply.code(201)

                return {
                    type: request.user
                }
            },
            {
                preValidation: this.httpServer.server.auth([
                    this.httpServer.server.validateUserPassword
                ])
            }
        )
    }
}
