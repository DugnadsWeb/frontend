import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAttendansOverviewComponent } from './member-attendans-overview.component';

describe('MemberAttendansOverviewComponent', () => {
  let component: MemberAttendansOverviewComponent;
  let fixture: ComponentFixture<MemberAttendansOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberAttendansOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAttendansOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
