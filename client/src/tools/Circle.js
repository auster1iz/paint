import { Tool } from './Tool'

export class Circle extends Tool {
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
                    type: 'circle',
                    x: this.startX,
                    y: this.startY,
                    radius: this.radius,
                    lineWidth: this.ctx.lineWidth,
                    fillColor: this.ctx.fillStyle,
                    strokeColor: this.ctx.strokeStyle,
                },
            })
        )

        this.isNewItem = false
    }

    mouseDownHandler(e) {
        this.mousedown = true
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e) {
        if (this.mousedown) {
            const currentX = e.pageX - e.target.offsetLeft
            const currentY = e.pageY - e.target.offsetTop
            const width = currentX - this.startX
            const height = currentY - this.startY
            this.radius = Math.sqrt(width ** 2 + height ** 2)

            this.draw(this.startX, this.startY, this.radius)
        }
    }
    draw(x, y, r) {
        this.isNewItem = true
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, r, 0, 2 * Math.PI)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }

    static staticDraw(ctx, x, y, r, lineWidth, fillColor, strokeColor) {
        const oldStyles = Tool.saveOldStyles(ctx)
        ctx.lineWidth = lineWidth
        ctx.fillStyle = fillColor
        ctx.strokeStyle = strokeColor
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()
        Tool.resetOldStyles(oldStyles, ctx)
        ctx.beginPath()
    }
}
