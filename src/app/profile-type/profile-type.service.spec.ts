import { TestBed } from '@angular/core/testing';

import { ProfileTypeService } from './profile-type.service';

describe('ProfileTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileTypeService = TestBed.inject(ProfileTypeService);
    expect(service).toBeTruthy();
  });
});
