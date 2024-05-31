import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnforceFailListComponent } from './enforce-fail-list.component';

describe('EnforceFailListComponent', () => {
  let component: EnforceFailListComponent;
  let fixture: ComponentFixture<EnforceFailListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnforceFailListComponent]
    });
    fixture = TestBed.createComponent(EnforceFailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
