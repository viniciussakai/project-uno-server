import { Event, EventParams } from '@entities/Event'
import { Lobby } from '@entities/Lobby'
import { EmitGameState } from './EmitGameState'
import { EmitGameOver } from './EmitGameOver'
import { Room } from '@entities/Room'

export class InitGame implements Event {
	public handle({ io, socket, params }: EventParams): void {
		const { roomName = '' } = socket?.data || {}
		const lobby = new Lobby()
		const roomState = lobby.getRoom(roomName)
		const room = new Room(roomState)

		room.initGame()
		lobby.updateRoom(roomName, room)

		const intervalId = setInterval(() => {
			const winner = room.gameLoop()
			const params = { roomName, gameState: room.state }

			if (!winner) {
				new EmitGameState().handle({ io, socket, params })
				lobby.updateRoom(roomName, room)
			} else {
				new EmitGameOver().handle({ io, socket, params })
				lobby.delete(roomName)
				clearInterval(intervalId)
			}
		}, 1000)
	}
}
