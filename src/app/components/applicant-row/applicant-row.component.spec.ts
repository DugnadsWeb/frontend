import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantRowComponent } from './applicant-row.component';

describe('ApplicantRowComponent', () => {
  let component: ApplicantRowComponent;
  let fixture: ComponentFixture<ApplicantRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
