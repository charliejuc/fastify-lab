import 'module-alias/register'
import 'source-map-support/register'
import { HttpServer } from './HttpServer'
import { Router } from './Router'
import { setupFastifyServer } from './SetupFastifyServer'
import fastifyJWTAuthPlugin from './modules/users/infrastructure/fastify/plugins/JwtAuthenticationPlugin'

const httpServer = new HttpServer(setupFastifyServer())
const router = new Router(httpServer)

async function main(): Promise<void> {
    await httpServer.enablePlugin(fastifyJWTAuthPlugin)

    router.setupRoutes()

    await httpServer.listen(3000)
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
