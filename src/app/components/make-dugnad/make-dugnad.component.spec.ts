import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDugnadComponent } from './make-dugnad.component';

describe('MakeDugnadComponent', () => {
  let component: MakeDugnadComponent;
  let fixture: ComponentFixture<MakeDugnadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeDugnadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeDugnadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
