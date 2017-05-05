import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMessageBoardComponent } from './org-message-board.component';

describe('OrgMessageBoardComponent', () => {
  let component: OrgMessageBoardComponent;
  let fixture: ComponentFixture<OrgMessageBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgMessageBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgMessageBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
