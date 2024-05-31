import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSelectionComponent } from './tag-selection.component';

describe('TagSelectionComponent', () => {
  let component: TagSelectionComponent;
  let fixture: ComponentFixture<TagSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagSelectionComponent]
    });
    fixture = TestBed.createComponent(TagSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
