import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSoldAmmountComponent } from './set-sold-ammount.component';

describe('SetSoldAmmountComponent', () => {
  let component: SetSoldAmmountComponent;
  let fixture: ComponentFixture<SetSoldAmmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetSoldAmmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSoldAmmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
