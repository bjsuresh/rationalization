import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardsComponent } from './hazards.component';

describe('HazardsComponent', () => {
  let component: HazardsComponent;
  let fixture: ComponentFixture<HazardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HazardsComponent]
    });
    fixture = TestBed.createComponent(HazardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
