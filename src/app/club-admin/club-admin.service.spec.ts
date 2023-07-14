import { TestBed } from '@angular/core/testing';

import { ClubAdminService } from './club-admin.service';

describe('ClubAdminService', () => {
  let service: ClubAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
