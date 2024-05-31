import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnforceedTagsComponent } from './enforceed-tags.component';

describe('EnforceedTagsComponent', () => {
  let component: EnforceedTagsComponent;
  let fixture: ComponentFixture<EnforceedTagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnforceedTagsComponent]
    });
    fixture = TestBed.createComponent(EnforceedTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
