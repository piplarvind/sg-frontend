import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  getGender = 'lookup/gender';
  getProfile = 'profiles/';
  getRole = 'profiles/types/';
  getOneRoleFiled = 'profiles/types/';
  profile = 'profiles/';
  fields = 'profiles/onboard?screen=cms_profile';
  imgpath: 'lookup/upload/';
  getTypeOne = 'profiles/';
  getOneUser = 'profiles/';
  update = 'profiles/';
  getoneroleList = 'profiles/?club=';
  getProfileListRole = 'profiles/byrole';
  check = 'check/';
  Groups = 'profiles/groups/';
  getAllAge = 'lookup/allage';
  getAge = 'lookup/age';

  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: localStorage.token
  // });

  constructor(public http: HttpClient) {}
  // getProfiles(club) {
  //   return new Promise((resolve, reject) => {
  //     this.http
  //       .get(this.getProfile + '?club=' + club, )
  //       .subscribe(
  //         (res: any) => {
  //           resolve(res);
  //         },
  //         err => {
  //           reject(err);
  //         }
  //       );
  //   });
  // }

  getProfiles(club, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getProfile +
            '?club=' +
            club +
            '&skip=' +
            skip +
            '&limit=' +
            limit
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
  getAllProfiles(club, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getProfile +
            '?club=' +
            club +
            '&active=false&skip=' +
            skip +
            '&limit=' +
            limit
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
  getRoles() {
    return new Promise((resolve, reject) => {
      this.http.get(this.getRole).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  fatchFields(role) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getOneRoleFiled + role).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  createProfile(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.profile, data).subscribe(
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
        },
        err => {
          reject(err);
        }
      );
    });
  }

  editProfile(id, data) {
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

  uploadImage(data: any) {
    let headers1 = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data/json',
      Authorization: localStorage.token
    });
    return this.http.post(this.imgpath, data, {
      headers: headers1,
      reportProgress: true,
      observe: 'events'
    });
  }
  getRoleList(credentials: any, role, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getoneroleList +
            credentials +
            '&type=' +
            role +
            '&skip=' +
            skip +
            '&limit=' +
            limit
        )
        .subscribe(
          (res: any) => {
            // let temp = res.toArray();
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  getFilterProfilesRole(credentials: any, role, value) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.getoneroleList + credentials + '&type=' + role + value)
        .subscribe(
          (res: any) => {
            // let temp = res.toArray();
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getFilterProfilesRoleathlete(credentials: any, role, value) {
    return this.http.get(
      this.getoneroleList + credentials + '&type=' + role + value
    );
  }
  getSortedProfilesbyRole(club, role, skip, limit, sort) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getoneroleList +
            club +
            '&type=' +
            role +
            '&skip=' +
            skip +
            '&limit=' +
            limit +
            '&sort=' +
            sort
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
  fetchOneUser(id: any, screen, type) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.getOneUser + id + '?screen=' + screen + '&types=' + type)
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

  getAthleteListByage(credentials, role, selectedTeamAge) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getoneroleList +
            credentials +
            '&type=' +
            role +
            '&age=' +
            selectedTeamAge
        )
        .subscribe(
          (res: any) => {
            // let temp = res.toArray();
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  Profiledelete(id, data) {
    return new Promise((resolve, reject) => {
      this.http.patch(this.getProfile + id, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  checkusername(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.check, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getGroups(skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.Groups + '?skip=' + skip + '&limit=' + limit)
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
  getFilterGroup(value) {
    return new Promise((resolve, reject) => {
      this.http.get(this.Groups + value).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getSortedGruop(skip, limit, value) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.Groups + '?skip=' + skip + '&limit=' + limit + '&sort=' + value
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
  getfields(path) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fields + path).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getAgeList() {
    return new Promise((resolve, reject) => {
      this.http.get(this.getAge).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getAgeAllList() {
    return new Promise((resolve, reject) => {
      this.http.get(this.getAllAge).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getSortedProfiles(url) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getProfile + url).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getFilterProfiles(club, sreach) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getProfile + '?club=' + club + sreach).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getRoleListAlluser(credentials: any, role) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.getoneroleList + credentials + '&type=' + role)
        .subscribe(
          (res: any) => {
            // let temp = res.toArray();
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getProfileListByRole(clubId, role) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.getProfileListRole + '?clubId='+clubId+'&role='+ role)
        .subscribe(
          (res: any) => {
            // let temp = res.toArray();
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getAgeListfilterGender(Id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getAge + '?filter=' + Id).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getGenderList() {
    return new Promise((resolve, reject) => {
      this.http.get(this.getGender).subscribe(
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
