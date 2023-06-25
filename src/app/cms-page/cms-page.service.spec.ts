import { TestBed } from '@angular/core/testing';

import { CmsPageService } from './cms-page.service';

describe('CmsPageService', () => {
  let service: CmsPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
