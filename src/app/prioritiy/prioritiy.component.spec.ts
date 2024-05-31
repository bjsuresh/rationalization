import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritiyComponent } from './prioritiy.component';

describe('PrioritiyComponent', () => {
  let component: PrioritiyComponent;
  let fixture: ComponentFixture<PrioritiyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrioritiyComponent]
    });
    fixture = TestBed.createComponent(PrioritiyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
