import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnforceTodoListComponent } from './enforce-todo-list.component';

describe('EnforceTodoListComponent', () => {
  let component: EnforceTodoListComponent;
  let fixture: ComponentFixture<EnforceTodoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnforceTodoListComponent]
    });
    fixture = TestBed.createComponent(EnforceTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
