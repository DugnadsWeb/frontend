import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUssComponent } from './contact-uss.component';

describe('ContactUssComponent', () => {
  let component: ContactUssComponent;
  let fixture: ComponentFixture<ContactUssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
