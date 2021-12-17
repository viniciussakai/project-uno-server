import http from 'http'
import Server from './server'

import { SocketIO } from '@entities/Socket'

const port = process.env.PORT || 3000

const app = new Server().express
const server = http.createServer(app)
const io = new SocketIO().setInstance(server).io

server.listen(port, () => {
	console.log(`[server] Running on port ${port}`)
})
