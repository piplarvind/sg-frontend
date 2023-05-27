import { TestBed, inject } from '@angular/core/testing';

import { SeasonsService } from '@app/seasons/seasons.service';

describe('SeasonsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeasonsService]
    });
  });

  it('should be created', inject([SeasonsService], (service: SeasonsService) => {
    expect(service).toBeTruthy();
  }));
});
