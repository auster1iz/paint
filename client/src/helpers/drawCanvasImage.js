import { Brush } from '../tools/Brush'
import { Eraser } from '../tools/Eraser'
import { Rect } from '../tools/Rect'
import { Circle } from '../tools/Circle'
import { Line } from '../tools/Line'

export const drawCanvasImage = (message, canvas) => {
    const figure = message.figure
    const ctx = canvas.getContext('2d')
    switch (figure.type) {
        case 'brush':
            Brush.draw(
                ctx,
                figure.x,
                figure.y,
                figure.lineWidth,
                figure.strokeColor
            )
            break
        case 'eraser':
            Eraser.draw(
                ctx,
                figure.x,
                figure.y,
                figure.lineWidth,
                figure.strokeColor
            )
            break
        case 'finish':
            ctx.beginPath()
            break
        case 'rect':
            Rect.staticDraw(
                ctx,
                figure.x,
                figure.y,
                figure.width,
                figure.height,
                figure.lineWidth,
                figure.fillColor,
                figure.strokeColor
            )
            break
        case 'circle':
            Circle.staticDraw(
                ctx,
                figure.x,
                figure.y,
                figure.radius,
                figure.lineWidth,
                figure.fillColor,
                figure.strokeColor
            )
            break
        case 'line':
            Line.staticDraw(
                ctx,
                figure.startX,
                figure.startY,
                figure.endX,
                figure.endY,
                figure.lineWidth,
                figure.strokeColor
            )
            break
    }
}
