import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminAssignerComponent } from './org-admin-assigner.component';

describe('OrgAdminAssignerComponent', () => {
  let component: OrgAdminAssignerComponent;
  let fixture: ComponentFixture<OrgAdminAssignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgAdminAssignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAdminAssignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
