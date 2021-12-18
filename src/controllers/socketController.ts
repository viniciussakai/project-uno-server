import { Server } from 'socket.io'
import { NewRoom } from 'src/services/events/NewRoom'

export class SocketController {
	private listenEvents() {
		return {
			newRoom: new NewRoom().handle,
			enterRoom: (io, params) => {}
		}
	}

	public constructor(io: Server) {
		const events = this.listenEvents()

		io.on('connection', socket => {
			for (const event of Object.keys(events)) {
				socket.on(event, params => {
					const jsonParse = JSON.parse(params)
					events[event]({ io, socket, params: jsonParse })
				})
			}
		})
	}
}
