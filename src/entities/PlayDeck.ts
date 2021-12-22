import { ICard, ICardType } from './Card'
import { Deck } from './Deck'
import { GameDeck } from './GameDeck'

export class PlayDeck extends Deck {
	constructor(gameDeck?: GameDeck) {
		super()

		if (gameDeck) {
			this.initDeck(gameDeck)
		}
	}

	private initDeck(gameDeck: GameDeck) {
		let card = gameDeck.random()

		while (card.type !== ICardType.NUMBER) {
			card = gameDeck.random()
		}

		gameDeck.delete(card)

		this.add(card)
	}
}
