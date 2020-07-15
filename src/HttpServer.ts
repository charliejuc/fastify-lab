import {
    FastifyInstance,
    FastifyPluginCallback,
    RegisterOptions,
    RouteHandlerMethod,
    RouteShorthandOptionsWithHandler
} from 'fastify'
import { HttpServerActions } from './interfaces/HttpServerActions'

type httpActions = 'get' | 'post' | 'put' | 'delete'
export class HttpServer implements HttpServerActions {
    private readonly server: FastifyInstance

    constructor(server: HttpServerActions) {
        this.server = server as FastifyInstance
    }

    get(
        slug: string,
        handler: RouteHandlerMethod,
        handlerOrOpts?: RouteShorthandOptionsWithHandler
    ): HttpServerActions {
        this.httpAction('get', slug, handler, handlerOrOpts)
        return this
    }

    post(
        slug: string,
        handler: RouteHandlerMethod,
        handlerOrOpts?: RouteShorthandOptionsWithHandler
    ): HttpServerActions {
        this.httpAction('post', slug, handler, handlerOrOpts)
        return this
    }

    put(
        slug: string,
        handler: RouteHandlerMethod,
        handlerOrOpts?: RouteShorthandOptionsWithHandler
    ): HttpServerActions {
        this.httpAction('put', slug, handler, handlerOrOpts)
        return this
    }

    delete(
        slug: string,
        handler: RouteHandlerMethod,
        handlerOrOpts?: RouteShorthandOptionsWithHandler
    ): HttpServerActions {
        this.httpAction('delete', slug, handler, handlerOrOpts)
        return this
    }

    private httpAction(
        httpAction: httpActions,
        slug: string,
        handler: RouteHandlerMethod,
        handlerOrOpts?: RouteShorthandOptionsWithHandler
    ): HttpServerActions {
        handler !== undefined
            ? this.server[httpAction](
                  slug,
                  handlerOrOpts ?? {},
                  handler
              )
            : this.server[httpAction](slug, handler)

        return this
    }

    async listen(port: number): Promise<string> {
        return await this.server.listen(port)
    }

    decorate(
        property: string | symbol,
        value: any,
        dependencies: string[] | undefined
    ): HttpServerActions {
        this.server.decorate(property, value, dependencies)
        return this
    }

    register(
        plugin: FastifyPluginCallback,
        opts: RegisterOptions
    ): HttpServerActions {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.server.register(plugin, opts)
        return this
    }

    after(
        afterListener?: (error: Error) => void
    ): HttpServerActions | PromiseLike<HttpServerActions> {
        if (afterListener !== undefined) {
            this.server.after(afterListener)
            return this
        }

        return new Promise((resolve, reject) => {
            this.server.after().then(() => resolve(this), reject)
        })
    }
}
