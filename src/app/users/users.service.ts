import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormatWidth } from '@angular/common';

@Injectable()
export class UsersService {
  createUser = '/api/v1/users/web';
  getUsers = '/api/v1/users/';
  editUser = '/api/v1/auths/';
  deleteUser = '/api/v1/users/';
  userRoles = '/api/user/roles';
  getbyRoles = '/api/v1/users/';
  getRoles = '/api/v1/roles';
  getIdByRoles = '/api/v1/roles/';
  getCountries = '/api/v2/countries';
  allregions = '/api/v2/regions';
  getDistrictsList = '/api/v2/districts';
  getOneUser = '/api/v2/role/';
  // checkImg = 'http://cms.sportgrit.innovatily.net/sg/';

  checkImg = 'http://192.168.1.250:8080/api/v1/users';
  curUser: Object = {};

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token')
  });

  constructor(public http: HttpClient) {}

  newUser(credentials: any) {
    // const data = credentials;
    // data.mobile_phone = this.extraxtNo(credentials.mobile_phone);
    // data.home_phone = this.extraxtNo(credentials.home_phone);
    // console.log('creden ', data);
    return new Promise((resolve, reject) => {
      console.log(credentials);
      this.http
        .post(this.createUser, credentials, { headers: this.headers })
        .subscribe(
          (res: any) => {
            resolve(res);
            console.log(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getUserList(credentials: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.getUsers + credentials.clubId + '/clubs', {
          headers: this.headers
        })
        .subscribe(
          (res: any) => {
            resolve(res);
            // console.log(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getAllUserList(credentials: any, fetchAll1: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getUsers +
            credentials.clubId +
            '/clubs' +
            '?' +
            'fetchAll=' +
            fetchAll1,
          { headers: this.headers }
        )
        .subscribe(
          (res: any) => {
            resolve(res);
            // console.log(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getUserRoles() {
    return new Promise((resolve, reject) => {
      this.http.post(this.userRoles, {}).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  updateUser(credentials: any) {
    return new Promise((resolve, reject) => {
      this.http
        .put(this.editUser + credentials.user_id, credentials, {
          headers: this.headers
        })
        .subscribe(
          (res: any) => {
            resolve(res);
            console.log('service res', res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  transformRequest(j: any) {
    const formDataTemp = new FormData();
    for (const p in j) {
      if (p) {
        formDataTemp.append(p, j[p]);
      }
    }
    return formDataTemp;
  }

  updateCoach(credentials: any) {
    console.log('credentials::', credentials.user_id);

    return new Promise((resolve, reject) => {
      this.http
        .put(this.editUser + credentials.user_id, credentials, {
          headers: this.headers
        })
        .subscribe(
          (res: any) => {
            resolve(res);
            console.log(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  updateParent(credentials: any) {
    console.log('credentials::', credentials.user_id);
    return new Promise((resolve, reject) => {
      this.http
        .put(this.editUser + credentials.user_id, credentials, {
          headers: this.headers
        })
        .subscribe(
          (res: any) => {
            resolve(res);
            console.log(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  updateRecruiter(credentials: any) {
    console.log('credentials::', credentials.user_id);
    return new Promise((resolve, reject) => {
      this.http
        .put(this.editUser + credentials.user_id, credentials, {
          headers: this.headers
        })
        .subscribe(
          (res: any) => {
            resolve(res);
            console.log(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  userdelete(credentials: any) {
    const reqObj = {
      deleted: !credentials.user_id.deleted,
      hard_delete: true
    };
    return new Promise((resolve, reject) => {
      this.http
        .put(this.deleteUser + credentials.user_id._id, reqObj, {
          headers: this.headers
        })
        .subscribe(
          (res: any) => {
            resolve(res);
            console.log(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  userinactive(credentials: any) {
    const reqObj = {
      deleted: !credentials.user_id.deleted
    };
    return new Promise((resolve, reject) => {
      this.http
        .put(this.deleteUser + credentials.user_id._id, reqObj, {
          headers: this.headers
        })
        .subscribe(
          (res: any) => {
            resolve(res);
            console.log(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  athletedelete(credentials: any) {
    return new Promise((resolve, reject) => {
      this.http
        .put(this.deleteUser + credentials.user_id, credentials.user_id, {
          headers: this.headers
        })
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

  getAthleteList(credentials: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getbyRoles + credentials.hashedId + '/role/' + credentials.role,
          { headers: this.headers }
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

  getAllRoles1(level: any) {
    return new Promise((resolve, reject) => {
      if (level) {
        this.http
          .get(this.getRoles + '?' + 'fetch=' + level, {
            headers: this.headers
          })
          .subscribe(
            (res: any) => {
              resolve(res);
            },
            err => {
              reject(err);
            }
          );
      } else {
        this.http.get(this.getRoles, { headers: this.headers }).subscribe(
          (res: any) => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
      }
    });
  }
  getAllRoles() {
    return new Promise((resolve, reject) => {
      this.http.get(this.getRoles, { headers: this.headers }).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getRolesId(role: any) {
    console.log('getRolesId ::', role);

    return new Promise((resolve, reject) => {
      this.http
        .get(this.getIdByRoles + role, { headers: this.headers })
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

  uploadWithImage(credentials: any) {
    let temp = {
      Authorization: localStorage.getItem('token')
    };
    let formData = new FormData();
    formData.append('profile_pic', credentials.file);
    return new Promise((resolve, reject) => {
      console.log(credentials);
      this.http
        .put(this.editUser + credentials.userId + '/image', formData, {
          headers: temp
        })
        .subscribe(
          // this.http.put(this.editUser + credentials.userId + formData, { headers: temp }).subscribe(
          (res: any) => {
            resolve(res);
            console.log(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getAthleteByAge(credentials: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getbyRoles +
            credentials.hashedId +
            '/role/' +
            credentials.role +
            '/age/' +
            credentials.age,
          {
            headers: this.headers
          }
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

  // uploadWithImage2(credentials:any) {
  //   let temp = {
  //     'Authorization': localStorage.getItem('token')
  //   }
  //   let formData = new FormData();
  //   formData.append('profile_pic',credentials.file);
  //   return new Promise((resolve, reject) => {
  //     console.log(credentials);
  //     this.http.put( this.checkImg+ credentials.userId +'/image', formData, { headers: temp })
  //       .subscribe((res: any) => {
  //         resolve(res);
  //         console.log(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });

  // }

  getAllCountries() {
    return this.http.get(this.getCountries, { headers: this.headers });
  }
  getStates(countryId: any) {
    return this.http.get(this.getCountries + '/' + countryId + '/states', {
      headers: this.headers
    });
  }
  // getCities(countryId: any, stateId: any) {
  //   return this.http.get(this.getCountries + '/' + countryId + '/states/' + stateId + '/city', { headers: this.headers })
  // }
  getDistricts() {
    return this.http.get(this.getDistrictsList, { headers: this.headers });
  }

  getRegions() {
    return this.http.get(this.allregions, { headers: this.headers });
  }

  fetchOneUser(id: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getOneUser + id, { headers: this.headers }).subscribe(
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
