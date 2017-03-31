import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DugnadInfoComponent } from './dugnad-info.component';

describe('DugnadInfoComponent', () => {
  let component: DugnadInfoComponent;
  let fixture: ComponentFixture<DugnadInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DugnadInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DugnadInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
