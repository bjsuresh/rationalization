import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddchangeRequestComponent } from './addchange-request.component';

describe('AddchangeRequestComponent', () => {
  let component: AddchangeRequestComponent;
  let fixture: ComponentFixture<AddchangeRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddchangeRequestComponent]
    });
    fixture = TestBed.createComponent(AddchangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
