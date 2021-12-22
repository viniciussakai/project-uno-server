import { Event, EventParams } from '@entities/Event'
import { Lobby } from '@entities/Lobby'

export class EnterRoom implements Event {
	public handle({ io, socket, params }: EventParams): void {
		const { roomName } = params
		const lobby = new Lobby()

		const roomExists = io.sockets.adapter.rooms.has(roomName)

		if (!roomExists) {
			socket.emit('roomNotFound', {})
			return
		}

		const roomCapacity = lobby.roomCapacity(roomName)

		if (roomCapacity == 4) {
			socket.emit('roomFull', {})
			return
		}

		lobby.addPlayerToRoom(socket.id, roomName)
		socket.broadcast.emit('updateRooms', lobby.getRooms())

		socket.join(roomName)
		socket.data.playerId = roomCapacity + 1
		socket.emit('enterSucess', {})
	}
}
