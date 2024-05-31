import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTagsComponent } from './import-tags.component';

describe('ImportTagsComponent', () => {
  let component: ImportTagsComponent;
  let fixture: ComponentFixture<ImportTagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportTagsComponent]
    });
    fixture = TestBed.createComponent(ImportTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
