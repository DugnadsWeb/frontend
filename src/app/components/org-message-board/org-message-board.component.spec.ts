import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMessageBoeardComponent } from './org-message-boeard.component';

describe('OrgMessageBoeardComponent', () => {
  let component: OrgMessageBoeardComponent;
  let fixture: ComponentFixture<OrgMessageBoeardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgMessageBoeardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgMessageBoeardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
