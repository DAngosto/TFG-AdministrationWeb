import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersControlPanelComponent } from './banners-control-panel.component';

describe('BannersControlPanelComponent', () => {
  let component: BannersControlPanelComponent;
  let fixture: ComponentFixture<BannersControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannersControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
