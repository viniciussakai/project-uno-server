import { v4 as uuid } from 'uuid'
import { ICard, ICardColor, ICardType } from '@entities/Card'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const colors = [
	ICardColor.YELLOW,
	ICardColor.BLUE,
	ICardColor.GREEN,
	ICardColor.RED
]
const typesColor = [ICardType.DRAW_TWO, ICardType.REVERSE, ICardType.SKIPPED]

const typesJoker = [ICardType.JOKER, ICardType.JOKER_DRAW]

export function generateUnoDeck(): ICard[] {
	const cards: ICard[] = []

	for (let contador = 1; contador <= 2; contador++) {
		colors.forEach(color => {
			numbers.forEach(number => {
				cards.push({
					id: uuid(),
					type: ICardType.NUMBER,
					number,
					color
				})
			})

			typesColor.forEach(type => {
				cards.push({
					id: uuid(),
					type,
					color
				})
			})
		})

		typesJoker.forEach(type => {
			cards.push({ id: uuid(), color: ICardColor.BLACK, type })
			cards.push({ id: uuid(), color: ICardColor.BLACK, type })
		})
	}

	colors.forEach(color => {
		cards.push({ id: uuid(), type: ICardType.NUMBER, number: 0, color })
	})

	return cards
}
