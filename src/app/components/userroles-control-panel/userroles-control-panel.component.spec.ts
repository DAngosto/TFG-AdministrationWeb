import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrolesControlPanelComponent } from './userroles-control-panel.component';

describe('UserrolesControlPanelComponent', () => {
  let component: UserrolesControlPanelComponent;
  let fixture: ComponentFixture<UserrolesControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserrolesControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrolesControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
