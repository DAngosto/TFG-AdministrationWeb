import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerorderdetailsControlPanelComponent } from './workerorderdetails-control-panel.component';

describe('WorkerorderdetailsControlPanelComponent', () => {
  let component: WorkerorderdetailsControlPanelComponent;
  let fixture: ComponentFixture<WorkerorderdetailsControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerorderdetailsControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerorderdetailsControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
