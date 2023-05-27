import { ProfileField } from './profile-field.model';

export class ProfileType {
  _id: string;
  name: string;
  abbr: string;

  icon: string;

  priority: number;
  order: string;
  fields: Array<ProfileField>;
}
