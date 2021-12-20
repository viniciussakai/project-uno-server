import { GlobalStateMap } from './GameState'

export class Lobby {
	private static lobbyState: GlobalStateMap = new Map()
	private static rooms: Map<string, string[]> = new Map()

	public addRoom(roomName): void {
		Lobby.rooms.set(roomName, [])
	}

	public addClient(clientId, roomName): void {
		const roomClients = Lobby.rooms.get(roomName) || []
		Lobby.rooms.set(roomName, [...roomClients, clientId])
	}

	public roomCapacity(roomName: string): number {
		return Lobby.rooms.get(roomName)?.length || 0
	}

	public getRooms = () => {
		const rooms = Array.from(Lobby.rooms)
		return rooms.map(([roomName, roomClients]) => {
			return {
				roomName,
				capacity: roomClients.length
			}
		})
	}
}
