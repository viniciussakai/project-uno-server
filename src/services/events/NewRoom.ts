import { Event, EventParams } from '@entities/Event'
import { Lobby } from '@entities/Lobby'
import { makeid } from '@utils/randomString'

export class NewRoom implements Event {
	public handle({ io, socket }: EventParams): void {
		const roomName = makeid(8)

		const lobby = new Lobby()

		lobby.addRoom(roomName)
		lobby.addPlayerToRoom(socket.id, roomName)

		socket.emit('roomCode', roomName)
		socket.broadcast.emit('updateRooms', lobby.getRooms())

		socket.join(roomName)
		socket.data.playerId = 1
	}
}
