import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostFigComponent } from './cost-fig.component';

describe('CostFigComponent', () => {
  let component: CostFigComponent;
  let fixture: ComponentFixture<CostFigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostFigComponent]
    });
    fixture = TestBed.createComponent(CostFigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
