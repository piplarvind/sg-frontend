import { TestBed, inject } from '@angular/core/testing';

import { MailService } from '@app/mail/mail.service';

describe('MailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailService]
    });
  });

  it('should be created', inject([MailService], (service: MailService) => {
    expect(service).toBeTruthy();
  }));
});
