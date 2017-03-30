import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DugnadViewComponent } from './dugnad-view.component';

describe('DugnadViewComponent', () => {
  let component: DugnadViewComponent;
  let fixture: ComponentFixture<DugnadViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DugnadViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DugnadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
