import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOptionsMenuComponent } from './input-options-menu.component';

describe('InputOptionsMenuComponent', () => {
  let component: InputOptionsMenuComponent;
  let fixture: ComponentFixture<InputOptionsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputOptionsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputOptionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
