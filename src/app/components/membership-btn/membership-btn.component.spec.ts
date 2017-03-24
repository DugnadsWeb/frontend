import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipBtnComponent } from './membership-btn.component';

describe('MembershipBtnComponent', () => {
  let component: MembershipBtnComponent;
  let fixture: ComponentFixture<MembershipBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
