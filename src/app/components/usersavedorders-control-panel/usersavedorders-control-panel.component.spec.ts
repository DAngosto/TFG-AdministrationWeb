import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersavedordersControlPanelComponent } from './usersavedorders-control-panel.component';

describe('UsersavedordersControlPanelComponent', () => {
  let component: UsersavedordersControlPanelComponent;
  let fixture: ComponentFixture<UsersavedordersControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersavedordersControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersavedordersControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
