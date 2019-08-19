import { Component, OnInit } from '@angular/core';
import { AreaOfEffectService } from '../area-of-effect.service';

@Component({
  selector: 'app-tabletop',
  templateUrl: './tabletop.component.html',
  styleUrls: ['./tabletop.component.scss']
})
export class TabletopComponent implements OnInit {

  zoom = 55; // square size in pixels

  constructor(private _areaOfEffect: AreaOfEffectService) { }

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

    this._areaOfEffect.setCanvas(ctx);
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
    // this._areaOfEffect.drawCircle(10, 10, 40, this.zoom, ctx);
    // this._areaOfEffect.drawCircle(10, 10, 20, this.zoom, ctx, 'rgba(255, 55, 55, .75)');
    // this._areaOfEffect.drawCircle(10, 10, 5, this.zoom, ctx, 'rgba(0, 55, 55, .75)');
  }

}
