import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkReceptionistComponent } from './link-receptionist.component';

describe('LinkReceptionistComponent', () => {
  let component: LinkReceptionistComponent;
  let fixture: ComponentFixture<LinkReceptionistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkReceptionistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
