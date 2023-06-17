import { TestBed } from '@angular/core/testing';

import { OfflinePaymentService } from './offline-payment.service';

describe('OfflinePaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfflinePaymentService = TestBed.inject(OfflinePaymentService);
    expect(service).toBeTruthy();
  });
});
