import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnforceSuccessListComponent } from './enforce-success-list.component';

describe('EnforceSuccessListComponent', () => {
  let component: EnforceSuccessListComponent;
  let fixture: ComponentFixture<EnforceSuccessListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnforceSuccessListComponent]
    });
    fixture = TestBed.createComponent(EnforceSuccessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
