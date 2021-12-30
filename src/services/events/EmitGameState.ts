import { Event, EventParams } from '@entities/Event'

export class EmitGameState {
	public handle({ io, params }: EventParams): void {
		const { roomName, gameState } = params

		io.in(roomName).emit('gameState', gameState)
	}
}
