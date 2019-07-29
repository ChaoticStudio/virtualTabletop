import { Component, OnInit } from '@angular/core';
import { AreaOfEffectService } from '../area-of-effect.service';

@Component({
  selector: 'app-aoe',
  templateUrl: './area-of-effect.component.html',
  styleUrls: ['./area-of-effect.component.scss']
})
export class AreaOfEffectComponent implements OnInit {

  pos;
  color;
  radius;

  constructor(private _areaOfEffect: AreaOfEffectService) { }

  ngOnInit() {

  }

  drawArea() {
    console.log(this.color);
    this.pos = this.radius / 5 + 2;
    this._areaOfEffect.drawCircle(this.pos, this.pos, this.radius, 55, this._areaOfEffect.context, this.color);
  }

}
