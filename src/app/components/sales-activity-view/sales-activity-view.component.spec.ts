import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesActivityViewComponent } from './sales-activity-view.component';

describe('SalesActivityViewComponent', () => {
  let component: SalesActivityViewComponent;
  let fixture: ComponentFixture<SalesActivityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesActivityViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesActivityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
