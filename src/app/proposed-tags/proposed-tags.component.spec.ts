import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposedTagsComponent } from './proposed-tags.component';

describe('ProposedTagsComponent', () => {
  let component: ProposedTagsComponent;
  let fixture: ComponentFixture<ProposedTagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposedTagsComponent]
    });
    fixture = TestBed.createComponent(ProposedTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
