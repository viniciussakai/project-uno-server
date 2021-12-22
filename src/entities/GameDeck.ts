import { randomNumber } from '@utils/randomNumber'
import { generateUnoDeck } from '@utils/unoDeck'
import { ICard } from './Card'
import { Deck } from './Deck'

export class GameDeck extends Deck {
	constructor(cards?: ICard[]) {
		super()

		if (!cards) {
			this.initDeck()
		}
	}

	private initDeck() {
		this.cards = generateUnoDeck()
		this.suffle
	}

	public random(): ICard {
		const random = randomNumber(this.cards.length)
		return this.cards[random]
	}
}
