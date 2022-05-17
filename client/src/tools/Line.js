import { Tool } from './Tool'

export class Line extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id)
        this.listen()
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler() {
        this.mousedown = false

        if (!this.isNewItem) return

        this.socket.send(
            JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'line',
                    startX: this.currentX,
                    startY: this.currentY,
                    endX: this.endX,
                    endY: this.endY,
                    lineWidth: this.ctx.lineWidth,
                    strokeColor: this.ctx.strokeStyle,
                },
            })
        )

        this.isNewItem = false
    }

    mouseDownHandler(e) {
        this.mousedown = true
        this.currentX = e.pageX - e.target.offsetLeft
        this.currentY = e.pageY - e.target.offsetTop
        this.ctx.beginPath()
        this.ctx.moveTo(this.currentX, this.currentY)
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e) {
        if (this.mousedown) {
            this.endX = e.pageX - e.target.offsetLeft
            this.endY = e.pageY - e.target.offsetTop

            this.draw(this.endX, this.endY)
        }
    }
    draw(x, y) {
        this.isNewItem = true
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.currentX, this.currentY)
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }
    }

    static staticDraw(ctx, startX, startY, endX, endY, lineWidth, strokeColor) {
        const oldStyles = Tool.saveOldStyles(ctx)
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = strokeColor
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
        Tool.resetOldStyles(oldStyles, ctx)
        ctx.beginPath()
    }
}
