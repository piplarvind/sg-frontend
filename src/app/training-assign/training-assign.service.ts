import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


const routes = {
  newTraining: 'tl',
  updateTraining: 'trainings/',
  gettraining: 'trainings/?clubId='
};
const userType = localStorage.user_role;
const tenantId = localStorage.super_cur_clubId || '';
@Injectable()
export class TrainingAssignService {
  fetchOneAssing = 'trainings/';
  newTraining: 'tl';

  // headers = new HttpHeaders({
  //   // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
  //   Authorization: localStorage.getItem('token')
  // });

  constructor(public http: HttpClient) {}
  getAllTraining(id) {
    return this.http.get(routes.newTraining + '?clubId=' + id);
  }

  getAllAssignedTraining(id, skip, limit) {
    return this.http.get(
      routes.gettraining + id + '&active=false&skip=' + skip + '&limit=' + limit
    );
  }
  getAssignedTraining(id, skip, limit) {
    return this.http.get(
      routes.gettraining + id + '&skip=' + skip + '&limit=' + limit
    );
  }

  assignTraining(credentials: any) {
    return this.http.post(routes.updateTraining, credentials);
  }

  updateAssignedTraining(credentials: any) {
    if (
      userType === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      credentials.clubId = localStorage.super_cur_clubId;
    } else {
      credentials.clubId = localStorage.club_id;
    }
    return this.http.put(routes.updateTraining + credentials._id, credentials);
  }

  removeTraining(credentials: any) {
    credentials.active = false;
    return this.http.patch(
      routes.updateTraining + credentials._id,
      credentials
    );
  }
  getOneAssing(id: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOneAssing + id).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getSortedTrainingAssingment(url) {
    return new Promise((resolve, reject) => {
      this.http.get(routes.gettraining + url).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getfilterTraningAssingment(id, value) {
    return new Promise((resolve, reject) => {
      this.http.get(routes.gettraining + id + value).subscribe(
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
