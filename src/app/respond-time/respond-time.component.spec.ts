import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondTimeComponent } from './respond-time.component';

describe('RespondTimeComponent', () => {
  let component: RespondTimeComponent;
  let fixture: ComponentFixture<RespondTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RespondTimeComponent]
    });
    fixture = TestBed.createComponent(RespondTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
