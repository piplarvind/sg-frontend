import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class ProfileTypeService {
  field = 'profiles/fields/';
  type = 'profiles/types/';
  getType = 'profiles/types/';
  getTypeOne = 'profiles/types/';
  groups = 'profiles/groups/';
  getGroupOne = 'profiles/groups/';
  update = 'profiles/types/';

  constructor(public http: HttpClient) {}
  getFields() {
    return new Promise((resolve, reject) => {
      this.http.get(this.field).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  newProfileType(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.type, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getTypes(skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.getType + '?skip=' + skip + '&limit=' + limit)
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  fetchOneProfile(id: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getTypeOne + id).subscribe(
        (res: any) => {
          resolve(res);
          console.log('res', res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  editProfileType(id, data) {
    return new Promise((resolve, reject) => {
      this.http.put(this.update + id, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  newGroups(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.groups, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  fetchOneGroup(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getGroupOne + id).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  Editgroup(id, data) {
    return new Promise((resolve, reject) => {
      this.http.put(this.getGroupOne + id, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getSortedProfileType(skip, limit, value) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getType + '?skip=' + skip + '&limit=' + limit + '&sort=' + value
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  getFilterProfileType(value) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getType + value).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
