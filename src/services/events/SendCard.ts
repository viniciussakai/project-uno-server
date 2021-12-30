import { Event, EventParams } from '@entities/Event'
import { Lobby } from '@entities/Lobby'
import { Room } from '@entities/Room'

export class SendCard {
	public handle({ io, params }: EventParams): void {
		const { roomName, sendCard } = params

		if (!roomName) {
			return
		}

		const lobby = new Lobby()
		const room = new Room(lobby.getRoom(roomName))
		const state = { ...room.state, sendCardId: sendCard }

		room.setState(state)
		lobby.updateRoom(roomName, room)
	}
}
