import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderalertsControlPanelComponent } from './orderalerts-control-panel.component';

describe('OrderalertsControlPanelComponent', () => {
  let component: OrderalertsControlPanelComponent;
  let fixture: ComponentFixture<OrderalertsControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderalertsControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderalertsControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
