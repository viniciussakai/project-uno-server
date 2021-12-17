import { Server } from 'socket.io'

export class SocketController {
	private listenEvents() {
		return {
			newGame: () => {},
			enterGame: () => {}
		}
	}

	public constructor(io: Server) {
		const events = this.listenEvents()

		io.on('connection', socket => {
			for (const event of Object.keys(events)) {
				socket.on(event, events[event])
			}
		})
	}
}
