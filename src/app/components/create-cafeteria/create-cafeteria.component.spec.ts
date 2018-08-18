import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCafeteriaComponent } from './create-cafeteria.component';

describe('CreateCafeteriaComponent', () => {
  let component: CreateCafeteriaComponent;
  let fixture: ComponentFixture<CreateCafeteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCafeteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCafeteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
