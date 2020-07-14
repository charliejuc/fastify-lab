import {
    FastifyInstance,
    RouteHandlerMethod,
    RouteShorthandOptionsWithHandler
} from 'fastify'
import { HttpServerActions } from './interfaces/HttpServerActions'

type httpActions = 'get' | 'post' | 'put' | 'delete'
export class HttpServer {
    private readonly server: FastifyInstance

    constructor(server: HttpServerActions) {
        this.server = server as FastifyInstance
    }

    get(
        slug: string,
        handler: RouteHandlerMethod,
        handlerOrOpts?: RouteShorthandOptionsWithHandler
    ): HttpServerActions {
        return this.httpAction('get', slug, handler, handlerOrOpts)
    }

    post(
        slug: string,
        handler: RouteHandlerMethod,
        handlerOrOpts?: RouteShorthandOptionsWithHandler
    ): HttpServerActions {
        return this.httpAction('post', slug, handler, handlerOrOpts)
    }

    put(
        slug: string,
        handler: RouteHandlerMethod,
        handlerOrOpts?: RouteShorthandOptionsWithHandler
    ): HttpServerActions {
        return this.httpAction('put', slug, handler, handlerOrOpts)
    }

    delete(
        slug: string,
        handler: RouteHandlerMethod,
        handlerOrOpts?: RouteShorthandOptionsWithHandler
    ): HttpServerActions {
        return this.httpAction('delete', slug, handler, handlerOrOpts)
    }

    private httpAction(
        httpAction: httpActions,
        slug: string,
        handler: RouteHandlerMethod,
        handlerOrOpts?: RouteShorthandOptionsWithHandler
    ): HttpServerActions {
        return handler !== undefined
            ? this.server[httpAction](
                  slug,
                  handlerOrOpts ?? {},
                  handler
              )
            : this.server[httpAction](slug, handler)
    }

    async listen(port: number): Promise<string> {
        return await this.server.listen(port)
    }
}
