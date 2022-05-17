import { makeAutoObservable } from 'mobx'

class SocketState {
    username = ''
    socket = null
    sessionId = null

    constructor() {
        makeAutoObservable(this)
    }

    setUsername(username) {
        this.username = username
    }

    setSocket(socket) {
        this.socket = socket
    }

    setSessionId(id) {
        this.sessionId = id
    }
}

export const socketState = new SocketState()
