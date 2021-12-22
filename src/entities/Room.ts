import { GameState } from './GameState'

export class Room {
	private _state: GameState
	private _players = new Set()

	public addPlayer(playerId) {
		this._players.add(playerId)
	}

	get players() {
		return this._players
	}

	get capacity() {
		return this._players.size
	}
}
