import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignViewComponent } from './design-view.component';

describe('DesignViewComponent', () => {
  let component: DesignViewComponent;
  let fixture: ComponentFixture<DesignViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignViewComponent]
    });
    fixture = TestBed.createComponent(DesignViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
