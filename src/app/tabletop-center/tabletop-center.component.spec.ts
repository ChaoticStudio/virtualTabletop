import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletopCenterComponent } from './tabletop-center.component';

describe('TabletopCenterComponent', () => {
  let component: TabletopCenterComponent;
  let fixture: ComponentFixture<TabletopCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabletopCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabletopCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
