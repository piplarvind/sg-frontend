import { TestBed, inject } from '@angular/core/testing';

import { SettingsService } from '@app/settings/settings.service';

describe('SettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsService]
    });
  });

  it('should be created', inject([SettingsService], (service: SettingsService) => {
    expect(service).toBeTruthy();
  }));
});
