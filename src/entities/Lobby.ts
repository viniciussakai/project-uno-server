import { GameState, GlobalStateMap } from './GameState'
import { Room } from './Room'

export class Lobby {
	private static rooms: Room[] = []
	private static roomsNames = new Set()

	public add(roomName): void {
		Lobby.roomsNames.add(roomName)
		const newRoom = new Room()
		Lobby.rooms[`${roomName}`] = newRoom
	}

	public delete(roomName): void {
		Lobby.roomsNames.delete(roomName)
		Lobby.rooms[`${roomName}`] = undefined
	}

	public addPlayerToRoom(clientId, roomName): void {
		const room = Lobby.rooms[roomName]
		room.addPlayer(clientId)
		this.updateRoom(roomName, room)
	}

	public roomCapacity(roomName): number {
		const room = Lobby.rooms[roomName]
		return room.capacity
	}

	public getRooms() {
		const roomNames = Array.from(Lobby.roomsNames)
		return roomNames.map(roomName => {
			return {
				name: roomName,
				capacity: this.roomCapacity(roomName)
			}
		})
	}

	public getRoom(roomName: string) {
		return {
			state: Lobby.rooms[roomName].state,
			player: Lobby.rooms[roomName].players
		}
	}

	public updateRoom(roomName, updateRoom) {
		Lobby.rooms[roomName] = updateRoom
	}
}
