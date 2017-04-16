import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberToActivityComponent } from './add-member-to-activity.component';

describe('AddMemberToActivityComponent', () => {
  let component: AddMemberToActivityComponent;
  let fixture: ComponentFixture<AddMemberToActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberToActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberToActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
