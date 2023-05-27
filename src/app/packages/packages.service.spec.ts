import { TestBed, inject } from '@angular/core/testing';

import { PackagesService } from '@app/packages/packages.service';

describe('PackagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackagesService]
    });
  });

  it('should be created', inject([PackagesService], (service: PackagesService) => {
    expect(service).toBeTruthy();
  }));
});
