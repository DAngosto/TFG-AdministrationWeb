import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsControlPanelComponent } from './reviews-control-panel.component';

describe('ReviewsControlPanelComponent', () => {
  let component: ReviewsControlPanelComponent;
  let fixture: ComponentFixture<ReviewsControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
