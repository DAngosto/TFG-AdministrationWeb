import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCafeteriaComponent } from './update-cafeteria.component';

describe('UpdateCafeteriaComponent', () => {
  let component: UpdateCafeteriaComponent;
  let fixture: ComponentFixture<UpdateCafeteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCafeteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCafeteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
