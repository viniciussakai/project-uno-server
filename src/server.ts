import express from 'express'

class Server {
	private _express: express.Express

	public constructor() {
		this._express = express()
	}

	public get express(): express.Express {
		return this._express
	}
}

export default Server
