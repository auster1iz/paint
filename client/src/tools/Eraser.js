import { Brush } from './Brush'

export class Eraser extends Brush {
    constructor(canvas, socket, id) {
        super(canvas, socket, id)
    }

    mouseMoveHandler(e) {
        if (this.mousedown) {
            this.socket.send(
                JSON.stringify({
                    method: 'draw',
                    id: this.id,
                    figure: {
                        type: 'eraser',
                        x: e.pageX - e.target.offsetLeft,
                        y: e.pageY - e.target.offsetTop,
                        lineWidth: this.ctx.lineWidth,
                        strokeColor: 'white',
                    },
                })
            )
        }
    }
}
