import { Server, Socket } from 'socket.io'

export interface EventParams {
	io: Server
	socket: Socket
	params: object
}

export abstract class Event {
	public handle({ io, socket, params }: EventParams) {}
}
