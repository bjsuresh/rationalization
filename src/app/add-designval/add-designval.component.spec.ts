import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesignvalComponent } from './add-designval.component';

describe('AddDesignvalComponent', () => {
  let component: AddDesignvalComponent;
  let fixture: ComponentFixture<AddDesignvalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDesignvalComponent]
    });
    fixture = TestBed.createComponent(AddDesignvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
