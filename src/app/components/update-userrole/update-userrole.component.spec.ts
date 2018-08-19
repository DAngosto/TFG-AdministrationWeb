import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserroleComponent } from './update-userrole.component';

describe('UpdateUserroleComponent', () => {
  let component: UpdateUserroleComponent;
  let fixture: ComponentFixture<UpdateUserroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUserroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
