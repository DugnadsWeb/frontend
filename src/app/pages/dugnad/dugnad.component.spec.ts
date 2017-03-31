import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DugnadComponent } from './dugnad.component';

describe('DugnadComponent', () => {
  let component: DugnadComponent;
  let fixture: ComponentFixture<DugnadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DugnadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DugnadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
