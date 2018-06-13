import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaOfEffectComponent } from './area-of-effect.component';

describe('AreaOfEffectComponent', () => {
  let component: AreaOfEffectComponent;
  let fixture: ComponentFixture<AreaOfEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaOfEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaOfEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
