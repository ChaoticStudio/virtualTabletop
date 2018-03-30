import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabletop',
  templateUrl: './tabletop.component.html',
  styleUrls: ['./tabletop.component.css']
})
export class TabletopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.generateGrid();
  }

  generateGrid() {
    const canvas = <HTMLCanvasElement>document.getElementById('grid'),
          ctx = canvas.getContext('2d');
    let canvasHeight,
        canvasWidth,
        zoom,
        horizontalSquares,
        verticalSquares;

    horizontalSquares = 25;
    verticalSquares = 25;
    zoom = 75; // square size in pixels
    canvasWidth = horizontalSquares * zoom;
    canvasHeight = verticalSquares * zoom;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    for (let i = 0; i <= canvasWidth; i += zoom) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvasHeight);
    }

    for (let i = 0; i <= canvasHeight; i += zoom) {
      ctx.moveTo(0, i);
      ctx.lineTo(canvasWidth, i);
    }

    ctx.stroke();
  }

}
