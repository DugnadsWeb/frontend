import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingProductsComponent } from './assing-products.component';

describe('AssingProductsComponent', () => {
  let component: AssingProductsComponent;
  let fixture: ComponentFixture<AssingProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssingProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
