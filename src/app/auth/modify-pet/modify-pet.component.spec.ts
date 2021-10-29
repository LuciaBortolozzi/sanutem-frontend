import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyPetComponent} from './modify-pet.component';

describe('ModifyPetComponent', () => {
  let component: ModifyPetComponent;
  let fixture: ComponentFixture<ModifyPetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyPetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
