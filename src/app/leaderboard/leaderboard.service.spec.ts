import { TestBed, inject } from '@angular/core/testing';

import { LeaderboardService } from '@app/leaderboard/leaderboard.service';

describe('LeaderboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaderboardService]
    });
  });

  it('should be created', inject([LeaderboardService], (service: LeaderboardService) => {
    expect(service).toBeTruthy();
  }));
});
