import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MedicalTestsComponent} from './medical-tests.component';

describe('MedicalTestsComponent', () => {
  let component: MedicalTestsComponent;
  let fixture: ComponentFixture<MedicalTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalTestsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
