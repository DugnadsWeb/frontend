import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveOrgApplicationComponent } from './approve-org-application.component';

describe('ApproveOrgApplicationComponent', () => {
  let component: ApproveOrgApplicationComponent;
  let fixture: ComponentFixture<ApproveOrgApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveOrgApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveOrgApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
