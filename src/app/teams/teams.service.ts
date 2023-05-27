import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class TeamsService {
  curTeam: any = {};

  createTeam = 'teams/';
  getTeam = 'teams/?club=';
  editTeam = 'teams/';
  deleteTeam = 'teams/';
  oneTeam = 'teams/';

  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: localStorage.token
  // });
  // headers1 = new HttpHeaders({
  //   'Content-Type': 'multipart/form-data',
  //   Authorization: localStorage.token
  // });
  constructor(public http: HttpClient) {}

  getOneTeam(credentials: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.oneTeam + credentials).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  newTeam(credentials: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.createTeam, credentials).subscribe(
        (res: any) => {
          resolve(res);
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
      if (j.hasOwnProperty(p)) {
        formDataTemp.append(p, j[p]);
      }
    }
    return formDataTemp;
  }

  getTeamList(credentials: any, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.getTeam + credentials + '&skip=' + skip + '&limit=' + limit)
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
  getAllTeamList(credentials: any, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getTeam +
            credentials +
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

  // updateClub(club, credentials: any) {
  //   const tempHeaders = {
  //     Authorization: localStorage.getItem('token')
  //   };
  //   const newFormData = this.transformRequest(credentials);
  //   return new Promise((resolve, reject) => {
  //     this.http
  //       .put(this.editTeam + club, newFormData, {
  //         headers: tempHeaders
  //       })
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
  updateTeam(id, credentials: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.editTeam + id, credentials).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  removeTeam(credentials: any, a) {
    return new Promise((resolve, reject) => {
      this.http.patch(this.deleteTeam + credentials, a).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getTeamListSort(url) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getTeam + url).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getTeamListfilter(credentials: any, value) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getTeam + credentials + value).subscribe(
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
