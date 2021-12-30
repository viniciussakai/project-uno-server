import { Game } from './Game'
import { GameState } from './GameState'

export class Room {
	private _state: GameState
	private _players: string[] = []

	constructor(state?, players?) {
		if (state && players) {
			this._players = players
			this._state = state
		}
	}

	public addPlayer(playerId) {
		this._players.push(playerId)
	}

	public get players() {
		return this._players
	}

	public get capacity() {
		return this._players.length
	}

	public initGame() {
		const game = new Game()
		game.init()

		this.players.forEach(() => game.addPlayer())

		game.dealCards()

		this._state = game.state
	}

	public gameLoop() {
		const game = new Game(this._state)
		const winner = game.loop()

		this._state = game.state

		return winner
	}

	public get state(): GameState {
		return this._state
	}

	public setState(state: GameState) {
		this._state = state
	}
}
