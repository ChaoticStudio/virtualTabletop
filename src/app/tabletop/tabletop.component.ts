import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabletop',
  templateUrl: './tabletop.component.html',
  styleUrls: ['./tabletop.component.css']
})
export class TabletopComponent implements OnInit {

  zoom = 25; // square size in pixels

  constructor() { }

  ngOnInit() {
    this.generateGrid();
  }

  resize() {
    document.getElementById('canvas').style.maxHeight = window.innerHeight - 55 + 'px';
  }

  generateGrid() {
    const canvasContainer = <HTMLDivElement>document.getElementById('canvas'),
          canvas = <HTMLCanvasElement>document.getElementById('grid'),
          ctx = canvas.getContext('2d');
    let canvasHeight,
        canvasWidth,
        horizontalSquares,
        verticalSquares;

    window.addEventListener('resize', this.resize);
    canvasContainer.style.maxHeight = window.innerHeight - 55 + 'px';
    horizontalSquares = 26;
    verticalSquares = 26;
    canvasWidth = horizontalSquares * this.zoom;
    canvasHeight = verticalSquares * this.zoom;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    for (let i = 0; i <= canvasWidth; i += this.zoom) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvasHeight);
    }

    for (let i = 0; i <= canvasHeight; i += this.zoom) {
      ctx.moveTo(0, i);
      ctx.lineTo(canvasWidth, i);
    }

    ctx.stroke();
    this.drawCircle(14, 14, 13, ctx);
    this.drawCircle(14, 14, 9, ctx, 'rgba(55, 255, 55, .75)');
    this.drawCircle(14, 14, 5, ctx, 'rgba(255, 55, 55, .75)');
    // this.drawPixel(12 * this.zoom, 12 * this.zoom, ctx);
  }

  drawCircle (positionX, positionY, radius, context, color = 'rgba(255, 255, 102, .75)') {
    let x0 = positionX - 1;
    let y0 = positionY - 1;
    let unit = this.zoom;
    radius *= unit;
    x0 *= unit;
    y0 *= unit;

    let x = radius - unit;
    let y = 0;
    let dx = unit;
    let dy = unit;
    let err = dx - radius;

    while (x >= y) {
      this.drawPixel(x0 + x - unit, y0 + y - unit, context, color);
      this.drawPixel(x0 + y - unit, y0 + x - unit, context, color);
      this.drawPixel(x0 - y, y0 + x - unit, context, color);
      this.drawPixel(x0 - x, y0 + y - unit, context, color);
      this.drawPixel(x0 - x, y0 - y, context, color);
      this.drawPixel(x0 - y, y0 - x, context, color);
      this.drawPixel(x0 + y - unit, y0 - x, context, color);
      this.drawPixel(x0 + x - unit, y0 - y, context, color);

      if (err <= 0) {
        y += unit;
        err += dy;
        dy += (unit * 2);
      }

      if (err > 0) {
        x -= unit;
        dx += (unit * 2);
        err += dx - radius * 2;
      }
    }
  }

  drawPixel(positionX, positionY, context, color = 'rgba(255, 255, 102, .75)') {
    context.fillStyle = color;
    context.fillRect(positionX, positionY, this.zoom, this.zoom);
  }
}
