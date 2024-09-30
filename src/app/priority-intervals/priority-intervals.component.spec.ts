import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityIntervalsComponent } from './priority-intervals.component';

describe('PriorityIntervalsComponent', () => {
  let component: PriorityIntervalsComponent;
  let fixture: ComponentFixture<PriorityIntervalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriorityIntervalsComponent]
    });
    fixture = TestBed.createComponent(PriorityIntervalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
