import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssistComponent } from './view-assist.component';

describe('ViewAssistComponent', () => {
  let component: ViewAssistComponent;
  let fixture: ComponentFixture<ViewAssistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAssistComponent]
    });
    fixture = TestBed.createComponent(ViewAssistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
