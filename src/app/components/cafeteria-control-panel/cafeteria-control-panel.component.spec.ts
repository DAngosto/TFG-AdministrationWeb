import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeteriaControlPanelComponent } from './cafeteria-control-panel.component';

describe('CafeteriaControlPanelComponent', () => {
  let component: CafeteriaControlPanelComponent;
  let fixture: ComponentFixture<CafeteriaControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CafeteriaControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeteriaControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
