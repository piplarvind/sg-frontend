import { ProfileTypeModule } from './profile-type.module';

describe('ProfileTypeModule', () => {
  let profileTypeModule: ProfileTypeModule;

  beforeEach(() => {
    profileTypeModule = new ProfileTypeModule();
  });

  it('should create an instance', () => {
    expect(profileTypeModule).toBeTruthy();
  });
});
