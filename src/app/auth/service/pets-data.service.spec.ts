import {TestBed} from '@angular/core/testing';

import {PetsDataService} from './pets-data.service';

describe('PetsDataService', () => {
  let service: PetsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
