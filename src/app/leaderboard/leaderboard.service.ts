import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';

const routes = {
  'getAllEvents': 'api/event/all',
  'getUsersByRole': 'api/user/getUserbyRoles',
  'updateEventById': 'api/event/updateEvent',
};
const data = {
  'userId': '5b02ba1509c48b48675d4b48',
  'hashedId': 'tg_wehsVbUNydLP'
};
const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable()
export class LeaderboardService {


  constructor(public http: HttpClient) { }

  getAllEvents() {
    return new Promise((resolve, reject) => {
      this.http.post(routes.getAllEvents, data, { headers })
        .subscribe((res: any) => {
          resolve(res);
          // console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUsersByRole() {
    const ath = {
      'userId': '5b02ba1509c48b48675d4b48',
      'hashedId': 'tg_wehsVbUNydLP',
      'role': 'athlete'
    };
    return new Promise((resolve, reject) => {
      this.http.post(routes.getUsersByRole, ath, { headers })
        .subscribe((res: any) => {
          resolve(res);
          // console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateEventById(params: any) {
    return new Promise((resolve, reject) => {
      this.http.put(routes.updateEventById, params, { headers })
        .subscribe((res: any) => {
          resolve(res);
          // console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }


}
