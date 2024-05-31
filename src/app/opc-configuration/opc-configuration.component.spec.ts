import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcConfigurationComponent } from './opc-configuration.component';

describe('OpcConfigurationComponent', () => {
  let component: OpcConfigurationComponent;
  let fixture: ComponentFixture<OpcConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpcConfigurationComponent]
    });
    fixture = TestBed.createComponent(OpcConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
