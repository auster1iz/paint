import React from 'react'
import { Brush } from '../tools/Brush'
import { Rect } from '../tools/Rect'
import { Circle } from '../tools/Circle'
import { Eraser } from '../tools/Eraser'
import { Line } from '../tools/Line'
import { toolState } from '../store/toolState'
import { canvasState } from '../store/canvasState'
import { socketState } from '../store/socketState'
import '../styles/toolbar-settings.scss'

const CLEAR_BUTTON_TEXT = 'Clear'
const tools = [
    { className: 'brush', Item: Brush },
    { className: 'line', Item: Line },
    { className: 'rect', Item: Rect },
    { className: 'circle', Item: Circle },
    { className: 'eraser', Item: Eraser },
]

export const Toolbar = () => {
    const changeFillColor = (e) => {
        toolState.setFillColor(e.target.value)
    }

    const saveImage = () => {
        const dataUrl = canvasState.canvas.toDataURL()
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = socketState.sessionId + '.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    const clearCanvas = () => {
        const canvas = canvasState.canvas
        canvasState.pushToUndoList(canvas.toDataURL())
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    const undo = () => {
        canvasState.undo()
    }
    const redo = () => {
        canvasState.redo()
    }

    return (
        <div className="toolbar">
            {tools.map(({ className, Item }) => (
                <button
                    key={className}
                    className={`toolbar__btn ${className}`}
                    onClick={() =>
                        toolState.setTool(
                            new Item(
                                canvasState.canvas,
                                socketState.socket,
                                socketState.sessionId
                            )
                        )
                    }
                />
            ))}
            <input
                className="toolbar__color-input"
                type="color"
                onChange={changeFillColor}
            />
            <button className="clear font" onClick={clearCanvas}>
                {CLEAR_BUTTON_TEXT}
            </button>
            <button className="toolbar__btn undo" onClick={undo} />
            <button className="toolbar__btn redo" onClick={redo} />
            <button className="toolbar__btn save" onClick={saveImage} />
        </div>
    )
}
