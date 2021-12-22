import { ICard } from './Card'
import { shuffleArray } from '@utils/shuffleArray'
import { randomNumber } from '@utils/randomNumber'

export class Deck {
	private _cards: ICard[]

	constructor(cards?: ICard[]) {
		if (cards) {
			this._cards = cards
		}
	}

	public get cards(): ICard[] {
		return this._cards
	}

	public set cards(cards: ICard[]) {
		this._cards = cards
	}

	public add(card: ICard): void {
		this._cards.push(card)
	}

	public last(): ICard {
		return this._cards[this._cards.length - 1]
	}

	public suffle() {
		shuffleArray(this._cards)
	}

	private getCardIndex(card: ICard): number {
		return this.cards.findIndex(cardItem => {
			return cardItem === card
		})
	}

	public delete(card: ICard): void {
		this._cards.splice(this.getCardIndex(card), 1)
	}
}
