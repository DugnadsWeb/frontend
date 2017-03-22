import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DugnadOverViewComponent } from './dugnad-over-view.component';

describe('DugnadOverViewComponent', () => {
  let component: DugnadOverViewComponent;
  let fixture: ComponentFixture<DugnadOverViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DugnadOverViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DugnadOverViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
