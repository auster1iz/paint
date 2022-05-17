import { Tool } from './Tool'

export class Brush extends Tool {
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
        this.socket.send(
            JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'finish',
                },
            })
        )
    }

    mouseDownHandler(e) {
        this.mousedown = true
        this.ctx.beginPath()
        this.ctx.moveTo(
            e.pageX - e.target.offsetLeft,
            e.pageY - e.target.offsetTop
        )
    }

    mouseMoveHandler(e) {
        if (this.mousedown) {
            this.socket.send(
                JSON.stringify({
                    method: 'draw',
                    id: this.id,
                    figure: {
                        type: 'brush',
                        x: e.pageX - e.target.offsetLeft,
                        y: e.pageY - e.target.offsetTop,
                        lineWidth: this.ctx.lineWidth,
                        strokeColor: this.ctx.strokeStyle,
                    },
                })
            )
        }
    }
    static draw(ctx, x, y, lineWidth, strokeColor) {
        const oldStyles = Tool.saveOldStyles(ctx)
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = strokeColor
        ctx.lineTo(x, y)
        ctx.stroke()
        Tool.resetOldStyles(oldStyles, ctx)
    }
}
