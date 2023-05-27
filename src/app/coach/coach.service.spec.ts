import { TestBed, inject } from '@angular/core/testing';

import { CoachService } from '@app/coach/coach.service';

describe('CoachService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoachService]
    });
  });

  it('should be created', inject([CoachService], (service: CoachService) => {
    expect(service).toBeTruthy();
  }));
});
