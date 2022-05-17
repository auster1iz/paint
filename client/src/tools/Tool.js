export class Tool {
    constructor(canvas, socket, id) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.socket = socket
        this.id = id
        this.removeEvents()
    }

    removeEvents() {
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
        this.canvas.onmousemove = null
    }

    set fillStyle(color) {
        this.ctx.fillStyle = color
    }

    set strokeStyle(color) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width) {
        this.ctx.lineWidth = width
    }

    static saveOldStyles(ctx) {
        const currentLineWidth = ctx.lineWidth
        const currentFillColor = ctx.fillStyle
        const currentStrokeColor = ctx.strokeStyle
        return { currentLineWidth, currentFillColor, currentStrokeColor }
    }
    static resetOldStyles(
        { currentLineWidth, currentFillColor, currentStrokeColor },
        ctx
    ) {
        ctx.lineWidth = currentLineWidth
        ctx.fillStyle = currentFillColor
        ctx.strokeStyle = currentStrokeColor
    }
}
