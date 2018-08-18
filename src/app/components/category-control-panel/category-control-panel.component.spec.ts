import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryControlPanelComponent } from './category-control-panel.component';

describe('CategoryControlPanelComponent', () => {
  let component: CategoryControlPanelComponent;
  let fixture: ComponentFixture<CategoryControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
