import { ICard, ICardColor } from './Card'
import { Player } from './Player'

export type GlobalStateMap = Map<string, GameState>

export interface GameState {
	players: Player[]
	flow: Flow
	playerAtive: number
	gameDeck: ICard[]
	playDeck: ICard[]

	sendCardId?: string

	sendColor?: {
		color: ICardColor
	}

	unoButton?: boolean
}

export enum Flow {
	LEFT = 'left',
	RIGHT = 'right'
}
