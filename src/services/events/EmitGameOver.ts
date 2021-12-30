import { Event, EventParams } from '@entities/Event'

export class EmitGameOver {
	public handle({ io, params }: EventParams): void {
		const { roomName, gameState } = params

		io.sockets.in(roomName).emit('gameOver', {})
	}
}
