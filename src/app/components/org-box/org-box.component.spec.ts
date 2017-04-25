import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgBoxComponent } from './org-box.component';

describe('OrgBoxComponent', () => {
  let component: OrgBoxComponent;
  let fixture: ComponentFixture<OrgBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
