import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersControlPanelComponent } from './orders-control-panel.component';

describe('OrdersControlPanelComponent', () => {
  let component: OrdersControlPanelComponent;
  let fixture: ComponentFixture<OrdersControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
