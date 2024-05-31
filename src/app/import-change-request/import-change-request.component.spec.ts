import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportChangeRequestComponent } from './import-change-request.component';

describe('ImportChangeRequestComponent', () => {
  let component: ImportChangeRequestComponent;
  let fixture: ComponentFixture<ImportChangeRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportChangeRequestComponent]
    });
    fixture = TestBed.createComponent(ImportChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
