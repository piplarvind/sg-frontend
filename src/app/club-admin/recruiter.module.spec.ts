import { RecruiterModule } from './recruiter.module';

describe('RecruiterModule', () => {
  let recruiterModule: RecruiterModule;

  beforeEach(() => {
    recruiterModule = new RecruiterModule();
  });

  it('should create an instance', () => {
    expect(recruiterModule).toBeTruthy();
  });
});
