import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDugnadComponent } from './edit-dugnad.component';

describe('EditDugnadComponent', () => {
  let component: EditDugnadComponent;
  let fixture: ComponentFixture<EditDugnadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDugnadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDugnadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
