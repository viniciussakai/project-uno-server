import { Server } from 'socket.io'
import { EnterRoom } from 'src/services/events/EnterRoom'
import { NewRoom } from 'src/services/events/NewRoom'

export class SocketController {
	private listenEvents() {
		return {
			newRoom: new NewRoom().handle,
			enterRoom: new EnterRoom().handle
		}
	}

	public constructor(io: Server) {
		const events = this.listenEvents()

		io.on('connection', socket => {
			for (const event of Object.keys(events)) {
				socket.on(event, params => {
					events[event]({ io, socket, params })
				})
			}
		})
	}
}
