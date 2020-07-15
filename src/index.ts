import 'module-alias/register'
import 'source-map-support/register'
import { HttpServer } from './HttpServer'
import { Router } from './Router'
import { setupFastifyServer } from './SetupFastifyServer'

const httpServer = new HttpServer(setupFastifyServer())
const router = new Router(httpServer)

router.setupRoutes()

httpServer.listen(3000).catch((error) => {
    console.error(error)
    process.exit(1)
})
