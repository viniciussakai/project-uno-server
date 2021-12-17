import http from 'http'
import Server from './server'

const port = process.env.PORT || 3000

const app = new Server().express
const server = http.createServer(app)

server.listen(port, () => console.log(`[server] Running on port ${port}`))
