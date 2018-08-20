import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersControlPanelComponent } from './users-control-panel.component';

describe('UsersControlPanelComponent', () => {
  let component: UsersControlPanelComponent;
  let fixture: ComponentFixture<UsersControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
