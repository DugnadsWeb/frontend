import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DugnadListComponent } from './dugnad-list.component';

describe('DugnadListComponent', () => {
  let component: DugnadListComponent;
  let fixture: ComponentFixture<DugnadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DugnadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DugnadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
