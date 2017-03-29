import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHubComponent } from './info-hub.component';

describe('InfoHubComponent', () => {
  let component: InfoHubComponent;
  let fixture: ComponentFixture<InfoHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
