import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesActivityStatsComponent } from './sales-activity-stats.component';

describe('SalesActivityStatsComponent', () => {
  let component: SalesActivityStatsComponent;
  let fixture: ComponentFixture<SalesActivityStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesActivityStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesActivityStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
