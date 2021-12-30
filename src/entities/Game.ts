import { ICardColor, ICardType } from './Card'
import { Deck } from './Deck'
import { GameDeck } from './GameDeck'
import { Flow, GameState } from './GameState'
import { PlayDeck } from './PlayDeck'

export class Game {
	private _state: GameState

	public init() {
		this._state = this.createInitialState()
	}

	public get state() {
		return this._state
	}

	public addPlayer() {
		this._state.players.push({ cards: [] })
	}

	constructor(state?: GameState) {
		if (state) {
			this._state = state
		}
	}

	private createInitialState = () => {
		const gameDeck = new GameDeck()
		const playDeck = new PlayDeck(gameDeck)

		gameDeck.suffle()

		const gameState: GameState = {
			players: [],
			flow: Flow.LEFT,
			playerAtive: 0,
			gameDeck: gameDeck.cards,
			playDeck: playDeck.cards
		}

		return gameState
	}

	public dealCards() {
		const players = this._state.players
		players.forEach(player => {
			player.cards = this._state.gameDeck.splice(0, 7)
		})
	}

	private getNextPlayer() {
		const player = this._state.playerAtive
		const isLeft = this._state.flow === 'left'

		if (player === 3) {
			return isLeft ? 0 : 2
		}

		if (player === 0) {
			return isLeft ? 0 : 2
		}

		return isLeft ? player + 1 : player - 1
	}

	private nextPlayer() {
		const nextPlayer = this.getNextPlayer()
		this.state.playerAtive[nextPlayer]
	}

	public loop(): boolean {
		const { sendCardId, players, playerAtive, flow, sendColor } = this._state

		if (sendCardId === undefined) {
			return false
		}

		const playerHand = new Deck(this._state.players[playerAtive].cards)

		const sendCard = playerHand.cards.find(
			playersCard => playersCard.id === sendCardId
		)

		if (!sendCard) {
			return false
		}

		const sendCardIndex = playerHand.cards.findIndex(
			playersCard => playersCard.id === sendCardId
		)

		const gameDeck = new GameDeck(this._state.gameDeck)
		const playDeck = new Deck(this._state.playDeck)

		let lastCard = playDeck.last()

		const isSameColor = sendCard.color === lastCard.color
		const isSameNumber = sendCard.number === lastCard.number
		const isSameType =
			sendCard.type !== ICardType.NUMBER && sendCard.type === lastCard.type

		if (isSameColor || isSameNumber || isSameType) {
			this.state.players[playerAtive].cards.splice(sendCardIndex, 1)
			playDeck.add(sendCard)
		} else {
			return false
		}

		if (sendCard.type === ICardType.REVERSE) {
			if (flow == Flow.LEFT) {
				this.state.flow = Flow.RIGHT
			} else {
				this.state.flow = Flow.LEFT
			}
		}

		if (sendCard.type === ICardType.DRAW_TWO) {
			const nextPlayer = this.getNextPlayer()
			const nextPlayerHand = new Deck(this.state.players[nextPlayer].cards)

			let c = 1
			while (c < 3) {
				nextPlayerHand.add(gameDeck.last())
				gameDeck.delete(gameDeck.last())
				c++
			}
		}

		if (sendCard.type === ICardType.SKIPPED) {
			this.nextPlayer()
		}

		if (sendCard.type === ICardType.JOKER) {
			const card = playDeck.last()
			playDeck.delete(card)

			card.color = sendColor?.color || ICardColor.BLACK

			playDeck.add(card)
		}

		this.state.gameDeck = gameDeck.cards
		this.state.playDeck = playDeck.cards
		this.nextPlayer()

		return false
	}
}
