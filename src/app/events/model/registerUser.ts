import { Profile } from './profile.model';

export class RegisterUser {
  _id: string;
  parent: Profile;
  athlete: Profile;

  constructor() {
    this.parent = new Profile();
    this.athlete = new Profile();
  }
}
