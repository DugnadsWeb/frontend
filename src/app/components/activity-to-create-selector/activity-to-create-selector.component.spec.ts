import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityToCreateSelectorComponent } from './activity-to-create-selector.component';

describe('ActivityToCreateSelectorComponent', () => {
  let component: ActivityToCreateSelectorComponent;
  let fixture: ComponentFixture<ActivityToCreateSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityToCreateSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityToCreateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
