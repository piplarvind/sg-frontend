import { TestBed, inject } from '@angular/core/testing';

import { SubscriptionsService } from '@app/subscriptions/subscriptions.service';

describe('SubscriptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscriptionsService]
    });
  });

  it('should be created', inject([SubscriptionsService], (service: SubscriptionsService) => {
    expect(service).toBeTruthy();
  }));
});
