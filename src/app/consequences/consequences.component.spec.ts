import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsequencesComponent } from './consequences.component';

describe('ConsequencesComponent', () => {
  let component: ConsequencesComponent;
  let fixture: ComponentFixture<ConsequencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsequencesComponent]
    });
    fixture = TestBed.createComponent(ConsequencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
