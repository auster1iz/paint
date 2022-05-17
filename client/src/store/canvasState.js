import { makeAutoObservable } from 'mobx'

class CanvasState {
    canvas = null
    redoList = []
    undoList = []

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }

    pushToUndoList(data) {
        this.undoList.push(data)
    }

    undo() {
        const ctx = this.canvas.getContext('2d')
        if (this.undoList.length) {
            const dataUrl = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            this.drawImage(ctx, dataUrl)
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }
    redo() {
        const ctx = this.canvas.getContext('2d')
        if (this.redoList.length) {
            const dataUrl = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            this.drawImage(ctx, dataUrl)
        }
    }
    drawImage(ctx, dataUrl) {
        const img = new Image()
        img.src = dataUrl
        img.onload = () => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        }
    }
}

export const canvasState = new CanvasState()
