import { TestBed, inject } from '@angular/core/testing';

import { AthletesService } from '@app/athletes/athletes.service';

describe('AthletesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AthletesService]
    });
  });

  it('should be created', inject([AthletesService], (service: AthletesService) => {
    expect(service).toBeTruthy();
  }));
});
