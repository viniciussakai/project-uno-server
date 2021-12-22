import { GlobalStateMap } from './GameState'
import { Room } from './Room'

export class Lobby {
	private static rooms: Room[] = []
	private static roomsNames = new Set()

	public addRoom(roomName): void {
		Lobby.roomsNames.add(roomName)
		const newRoom = new Room()
		Lobby.rooms[roomName] = newRoom
	}

	public addPlayerToRoom(clientId, roomName): void {
		const room = Lobby.rooms[roomName]
		room.addPlayer(clientId)
	}

	public roomCapacity(roomName): number {
		const room = Lobby.rooms[roomName]
		return room.capacity
	}

	public getRooms = () => {
		const roomNames = Array.from(Lobby.roomsNames)
		return roomNames.map(roomName => {
			return {
				name: roomName,
				capacity: this.roomCapacity(roomName)
			}
		})
	}
}
