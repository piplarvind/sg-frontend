import { Group } from './group.model';

export class ProfileGroup {
  groups: Array<Group>;
  // _id: string;
  name: string;
  _id: string;
  // type: string;
  constructor() {
    this.groups = new Array<Group>();
  }
}
