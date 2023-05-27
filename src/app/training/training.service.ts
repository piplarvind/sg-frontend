import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


const routes = {
  newTraining: 'tl',
  updateTraining: 'tl/'
};
const userType = localStorage.user_role;
const tenantId = localStorage.super_cur_clubId || '';
@Injectable()
export class TrainingService {
  // headers = new HttpHeaders({
  //   // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
  //   Authorization: localStorage.getItem('token')
  // });

  constructor(public http: HttpClient) {}
  getAllTraining(id, skip, limit) {
    return this.http.get(
      routes.newTraining +
        '?clubId=' +
        id +
        '&active=false&skip=' +
        skip +
        '&limit=' +
        limit
    );
  }
  getTraining(id, skip, limit) {
    return this.http.get(
      routes.newTraining + '?clubId=' + id + '&skip=' + skip + '&limit=' + limit
    );
  }
  getSortedTraining(url) {
    return new Promise((resolve, reject) => {
      this.http.get(routes.newTraining + '/?clubId=' + url).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getfilterTraning(id, value) {
    return new Promise((resolve, reject) => {
      this.http.get(routes.newTraining + '/?clubId=' + id + value).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  createTraining(credentials: any) {
    return this.http.post(routes.newTraining, credentials);
  }

  updateTraining(credentials: any) {
    let temptenant;
    if (
      userType === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      temptenant = localStorage.super_cur_clubId;
    } else {
      temptenant = localStorage.club_id;
    }
    delete credentials.created_by;
    return this.http.put(
      routes.updateTraining + credentials._id + '?tenant=' + temptenant,
      credentials
    );
  }

  removeTraining(credentials: any) {
    const data = { active: false };
    return this.http.patch(routes.updateTraining + credentials, data);
  }

  getOneTraining(credentials: any) {
    console.log('team credentials', credentials);
    return new Promise((resolve, reject) => {
      this.http.get(routes.updateTraining + credentials).subscribe(
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
