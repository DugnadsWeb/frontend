import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgStatsComponent } from './org-stats.component';

describe('OrgStatsComponent', () => {
  let component: OrgStatsComponent;
  let fixture: ComponentFixture<OrgStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
