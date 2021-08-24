import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FinalTouchComponent} from './final-touch.component';

describe('FinalTouchComponent', () => {
  let component: FinalTouchComponent;
  let fixture: ComponentFixture<FinalTouchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinalTouchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalTouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
