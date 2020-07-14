import Fastify from 'fastify'
import 'module-alias/register'
import 'source-map-support/register'
import { HttpServer } from './HttpServer'
import { Router } from './Router'

const httpServer = new HttpServer(
    Fastify({
        logger: true
    })
)
const router = new Router(httpServer)

router.setupRoutes()

httpServer
    .listen(3000)
    .then(console.log)
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
