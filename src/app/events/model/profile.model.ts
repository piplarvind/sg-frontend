import { Age } from './age.model';

export class Profile {
  first_name: string;
  last_name: string;
  age: Age;
  dob: Date;
  address_line_1: string;
  address_line_2: string;
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
    this.address_line_1 = '';
    this.address_line_2 = '';
    this.state = '';
    this.zip = '';
  }
}
