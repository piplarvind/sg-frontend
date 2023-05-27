import { ProfileField } from './profile-field.model';

export class Section {
  _id: string;
  title: string;
  order: string;
  profile_fields: Array<ProfileField>;

  constructor(profile_fields) {
    this.profile_fields = new Array<ProfileField>();
    if (profile_fields && profile_fields.length) {
      this.profile_fields = [];
      profile_fields.map(field => {
        this.profile_fields.push({
          order: '0',
          field: field,
          isSelected: false
        });
      });
    }
  }

  public changeProfileFields(newFields) {
    this.profile_fields = [];

    newFields.map(field => {
      this.profile_fields.push({
        order: '0',
        field: field,
        isSelected: false
      });
    });
  }
}
