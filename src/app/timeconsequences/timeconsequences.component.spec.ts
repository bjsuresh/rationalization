import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeconsequencesComponent } from './timeconsequences.component';

describe('TimeconsequencesComponent', () => {
  let component: TimeconsequencesComponent;
  let fixture: ComponentFixture<TimeconsequencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeconsequencesComponent]
    });
    fixture = TestBed.createComponent(TimeconsequencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
