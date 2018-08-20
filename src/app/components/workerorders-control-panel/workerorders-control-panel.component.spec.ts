import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerordersControlPanelComponent } from './workerorders-control-panel.component';

describe('WorkerordersControlPanelComponent', () => {
  let component: WorkerordersControlPanelComponent;
  let fixture: ComponentFixture<WorkerordersControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerordersControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerordersControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
