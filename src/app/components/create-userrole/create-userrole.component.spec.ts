import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserroleComponent } from './create-userrole.component';

describe('CreateUserroleComponent', () => {
  let component: CreateUserroleComponent;
  let fixture: ComponentFixture<CreateUserroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
