import { Section } from './section.model';
import { ProfileType } from './profiletype.model';

export class Group {
  _id: string;
  order: number;
  // groupname: string;
  type: ProfileType;
  sections: Array<Section>;
  constructor() {
    this.sections = new Array<Section>();
    // this.order = 0;
  }
}
