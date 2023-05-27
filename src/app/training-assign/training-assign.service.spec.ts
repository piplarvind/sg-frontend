import { TestBed, inject } from '@angular/core/testing';

import { TrainingAssignService } from '@app/training-assign/training-assign.service';

describe('TrainingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingAssignService]
    });
  });

  it('should be created', inject([TrainingAssignService], (service: TrainingAssignService) => {
    expect(service).toBeTruthy();
  }));
});
