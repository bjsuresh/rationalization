import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RationalisationComponent } from './rationalisation.component';

describe('RationalisationComponent', () => {
  let component: RationalisationComponent;
  let fixture: ComponentFixture<RationalisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RationalisationComponent]
    });
    fixture = TestBed.createComponent(RationalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
