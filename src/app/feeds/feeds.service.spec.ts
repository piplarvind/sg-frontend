import { TestBed } from '@angular/core/testing';

import { FeedsService } from './feeds.service';

describe('FeedsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeedsService = TestBed.inject(FeedsService);
    expect(service).toBeTruthy();
  });
});
