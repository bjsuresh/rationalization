import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatoralrmAssistComponent } from './operatoralrm-assist.component';

describe('OperatoralrmAssistComponent', () => {
  let component: OperatoralrmAssistComponent;
  let fixture: ComponentFixture<OperatoralrmAssistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperatoralrmAssistComponent]
    });
    fixture = TestBed.createComponent(OperatoralrmAssistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
