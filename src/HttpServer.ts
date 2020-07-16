import {
    FastifyInstance,
    FastifyPluginCallback,
    FastifyPluginOptions,
    RegisterOptions,
    RouteHandlerMethod,
    RouteShorthandOptions
} from 'fastify'
import { HttpServerActions } from './interfaces/HttpServerActions'

type httpActions = 'get' | 'post' | 'put' | 'delete'
export class HttpServer implements HttpServerActions {
    private readonly _server: FastifyInstance

    constructor(server: HttpServerActions) {
        this._server = server as FastifyInstance
    }

    get server(): FastifyInstance {
        return this._server
    }

    get(
        slug: string,
        handler: RouteHandlerMethod,
        handlerOrOpts?: RouteShorthandOptions
    ): HttpServerActions {
        this.httpAction('get', slug, handler, handlerOrOpts)
        return this
    }

    post(
        slug: string,
        handler: RouteHandlerMethod,
        handlerOrOpts?: RouteShorthandOptions
    ): HttpServerActions {
        this.httpAction('post', slug, handler, handlerOrOpts)
        return this
    }

    put(
        slug: string,
        handler: RouteHandlerMethod,
        handlerOrOpts?: RouteShorthandOptions
    ): HttpServerActions {
        this.httpAction('put', slug, handler, handlerOrOpts)
        return this
    }

    delete(
        slug: string,
        handler: RouteHandlerMethod,
        handlerOrOpts?: RouteShorthandOptions
    ): HttpServerActions {
        this.httpAction('delete', slug, handler, handlerOrOpts)
        return this
    }

    private httpAction(
        httpAction: httpActions,
        slug: string,
        handler: RouteHandlerMethod,
        handlerOrOpts?: RouteShorthandOptions
    ): HttpServerActions {
        handler !== undefined
            ? this._server[httpAction](
                  slug,
                  handlerOrOpts ?? {},
                  handler
              )
            : this._server[httpAction](slug, handler)

        return this
    }

    async listen(port: number): Promise<string> {
        return await this._server.listen(port)
    }

    enablePlugin(
        plugin: FastifyPluginCallback,
        opts?:
            | (RegisterOptions & FastifyPluginOptions)
            | (() => RegisterOptions & FastifyPluginOptions)
            | undefined
    ): FastifyInstance & PromiseLike<undefined> {
        return this._server.register(plugin, opts).after()
    }
}
