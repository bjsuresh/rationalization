import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposedChangesComponent } from './proposed-changes.component';

describe('ProposedChangesComponent', () => {
  let component: ProposedChangesComponent;
  let fixture: ComponentFixture<ProposedChangesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposedChangesComponent]
    });
    fixture = TestBed.createComponent(ProposedChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
