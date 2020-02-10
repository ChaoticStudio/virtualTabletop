import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AreaOfEffectService {
  context: CanvasRenderingContext2D
  private lastCircleRadius = 0
  constructor() {}

  setCanvas(context) {
    this.context = context
  }

  // Bresenham's circle algorithm
  drawCircle(
    positionX: number,
    positionY: number,
    radius: number = 20,
    pixelSize: number,
    context: CanvasRenderingContext2D,
    color = 'rgba(255, 255, 102, .75)'
  ) {
    if (this.lastCircleRadius !== 0) {
      const r = this.lastCircleRadius
      const pos = r / 5 + 2
      this.lastCircleRadius = 0
      const bgColor = '#1B1B1E'
      this.drawCircle(pos, pos, r, 55, context, bgColor)
    }
    this.lastCircleRadius = radius
    const unit = pixelSize
    const x0 = (positionX - 1) * unit
    const y0 = (positionY - 1) * unit
    // Feet to grid squares
    radius = (radius / 5 + 1) * unit

    let x = radius - unit
    let y = 0
    let dx = unit
    let dy = unit
    let err = dx - radius

    while (x >= y) {
      this.drawPixel(x0 + x - unit, y0 + y - unit, pixelSize, context, color)
      this.drawPixel(x0 + y - unit, y0 + x - unit, pixelSize, context, color)
      this.drawPixel(x0 - y, y0 + x - unit, pixelSize, context, color)
      this.drawPixel(x0 - x, y0 + y - unit, pixelSize, context, color)
      this.drawPixel(x0 - x, y0 - y, pixelSize, context, color)
      this.drawPixel(x0 - y, y0 - x, pixelSize, context, color)
      this.drawPixel(x0 + y - unit, y0 - x, pixelSize, context, color)
      this.drawPixel(x0 + x - unit, y0 - y, pixelSize, context, color)

      if (err <= 0) {
        y += unit
        err += dy
        dy += unit * 2
      }

      if (err > 0) {
        x -= unit
        dx += unit * 2
        err += dx - radius * 2
      }
    }
  }

  drawPixel(
    positionX,
    positionY,
    pixelSize,
    context: CanvasRenderingContext2D,
    color = 'rgba(255, 255, 102, .75)'
  ) {
    context.fillStyle = color
    pixelSize -= 2
    positionX += 1
    positionY += 1
    context.fillRect(positionX, positionY, pixelSize, pixelSize)
  }
}
