import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSalesActivityComponent } from './create-sales-activity.component';

describe('CreateSalesActivityComponent', () => {
  let component: CreateSalesActivityComponent;
  let fixture: ComponentFixture<CreateSalesActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSalesActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSalesActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
