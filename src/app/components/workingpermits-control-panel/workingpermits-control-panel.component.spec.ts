import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingpermitsControlPanelComponent } from './workingpermits-control-panel.component';

describe('WorkingpermitsControlPanelComponent', () => {
  let component: WorkingpermitsControlPanelComponent;
  let fixture: ComponentFixture<WorkingpermitsControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingpermitsControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingpermitsControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
