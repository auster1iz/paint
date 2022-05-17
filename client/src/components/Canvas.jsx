import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { canvasState } from '../store/canvasState'
import { toolState } from '../store/toolState'
import { socketState } from '../store/socketState'
import { Brush } from '../tools/Brush'
import { notify } from '../utils/notify'
import { notifyAboutUserConnection } from '../utils/notifyAboutUserConnection'
import { fetchCanvasImage } from '../helpers/fetchCanvasImage'
import { drawCanvasImage } from '../helpers/drawCanvasImage'
import { Modal } from './Modal'
import '../styles/canvas.scss'

const LOGIN_BUTTON_TEXT = 'Login'
const USERNAME_IS_REQUIRED = 'Username is required'
const WEBSOCKET_URL = 'ws://localhost:5000'

export const Canvas = observer(() => {
    const canvasRef = useRef(null)
    const inputUsernameRef = useRef(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const params = useParams()

    useEffect(() => {
        setIsModalOpen(true)
        canvasState.setCanvas(canvasRef.current)
    }, [])

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const connect = () => {
        const username = inputUsernameRef.current.value
        if (!username.trim()) {
            notify(USERNAME_IS_REQUIRED)
            return
        }
        const socket = new WebSocket(WEBSOCKET_URL)

        socketState.setUsername(username.trim())
        socketState.setSocket(socket)
        socketState.setSessionId(params.id)
        toolState.setTool(new Brush(canvasRef.current, socket, params.id))
        fetchCanvasImage(params, canvasRef.current)

        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    id: params.id,
                    username: socketState.username,
                    method: 'connection',
                })
            )
        }
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            switch (message.method) {
                case 'connection':
                    notifyAboutUserConnection(message)
                    break
                case 'draw':
                    drawCanvasImage(message, canvasRef.current)
                    break
            }
        }
        closeModal()
    }

    const pushToUndoList = () => {
        canvasState.pushToUndoList(canvasRef.current.toDataURL())
    }

    const sendCanvasImage = () => {
        axios.post(`http://localhost:5000/image?id=${params.id}`, {
            img: canvasRef.current.toDataURL(),
        })
    }

    return (
        <div className="canvas-container">
            <Modal isOpen={isModalOpen} closeModal={closeModal}>
                <div className="canvas-container__modal-content">
                    <input
                        ref={inputUsernameRef}
                        type="text"
                        className="canvas-container__input"
                        placeholder="Username"
                    />
                    <button
                        className="canvas-container__button"
                        onClick={connect}
                    >
                        {LOGIN_BUTTON_TEXT}
                    </button>
                </div>
            </Modal>
            <canvas
                className="canvas-container__canvas"
                ref={canvasRef}
                onMouseDown={pushToUndoList}
                onMouseUp={sendCanvasImage}
                width={1000}
                height={600}
            />
        </div>
    )
})
