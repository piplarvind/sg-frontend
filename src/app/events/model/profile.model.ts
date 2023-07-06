import { Age } from './age.model';

export class Profile {
  first_name: string;
  last_name: string;
  age: Age;
  dob: Date;
  street_address: string;
  position: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  country: string;
  zip: string;

  constructor() {
    this.country = 'US';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.mobile = '';
    this.dob = null;
    this.city = '';
    this.street_address = '';
    this.state = '';
    this.zip = '';
  }
}
