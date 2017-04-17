import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveMemberFromActivityComponent } from './remove-member-from-activity.component';

describe('RemoveMemberFromActivityComponent', () => {
  let component: RemoveMemberFromActivityComponent;
  let fixture: ComponentFixture<RemoveMemberFromActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveMemberFromActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveMemberFromActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
