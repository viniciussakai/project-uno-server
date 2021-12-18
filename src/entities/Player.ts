import { ICard } from './Card'

export interface Player {
	id: number
	name: string
	cards: ICard[]
}
