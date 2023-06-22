import { TestBed } from '@angular/core/testing';

import { ClubProfileService } from './club-profile.service';

describe('ClubProfileService', () => {
  let service: ClubProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
