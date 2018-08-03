import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetBuilderComponent } from './sheet-builder.component';

describe('SheetBuilderComponent', () => {
  let component: SheetBuilderComponent;
  let fixture: ComponentFixture<SheetBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
