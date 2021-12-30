import { Server } from 'socket.io'
import { Server as HttpServer } from 'http'

export class SocketIO {
	private static _instance: Server

	public setInstance(httpServer: HttpServer) {
		const socketio = new Server(httpServer, {
			cors: {
				origin: ['http://localhost:3000', 'http://localhost:3001', 'https://admin.socket.io/'],
				methods: ['GET', 'POST']
			}
		})


		SocketIO._instance = socketio
		return this
	}

	public get io(): Server {
		return SocketIO._instance
	}
}
