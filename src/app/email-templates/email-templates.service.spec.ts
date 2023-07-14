import { TestBed, inject } from '@angular/core/testing';

import { EmailTemplatesService } from '@app/email-templates/sports.service';

describe('EmailTemplatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailTemplatesService]
    });
  });

  it('should be created', inject([EmailTemplatesService], (service: EmailTemplatesService) => {
    expect(service).toBeTruthy();
  }));
});
