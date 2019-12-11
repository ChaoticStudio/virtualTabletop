import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AreaOfEffectService {
  context
  private lastCircle = 0
  constructor() {}

  setCanvas(context) {
    this.context = context
  }

  // Bresenham's circle algorithm
  drawCircle(
    positionX,
    positionY,
    radius,
    pixelSize,
    context: CanvasRenderingContext2D,
    color = 'rgba(255, 255, 102, .75)'
  ) {
    if (this.lastCircle !== 0) {
      const r = this.lastCircle
      const pos = r / 5 + 2
      this.lastCircle = 0
      this.drawCircle(pos, pos, r, 55, context, '#ffffff')
    }
    this.lastCircle = radius
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
