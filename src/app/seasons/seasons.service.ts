import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable()
export class SeasonsService {
  curEvent: any = {};
  createSeason = 'seasons/';
  editSeason = 'seasons/';
  checkSeason = '/api/v1/seasons?filter=true';
  getSeason = 'seasons/?club=';
  editEvent = 'api/event/updateEvent';
  deleteEvent = 'api/event/removeEvent';
  allteams = 'api/generic/getTeams';
  endCurSeason = 'seasons/';
  fetchOneseason = 'seasons/';
  // headers: Headers;

  constructor(public http: HttpClient) {}

  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: localStorage.getItem('token')
  // });

  newSeason(credentials: any) {
    return new Promise((resolve, reject) => {
      console.log(credentials);
      this.http.post(this.createSeason, credentials).subscribe(
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

  getSeasonList(credentials: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getSeason + credentials + '&yts=true').subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getSeasonList1(credentials: any, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getSeason +
            credentials +
            '&yts=true&skip=' +
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
  getfilterseason(credentials: any, value) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.getSeason + credentials + '&yts=true&skip=' + value)
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
  getSortedseason(credentials: any, skip, limit, sort) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getSeason +
            credentials +
            '&yts=true&skip=' +
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
  getSeasons(credentials: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.checkSeason).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  deleteSeason(season: any) {
    return new Promise((resolve, reject) => {
      console.log(season);
      const reqObj = {
        active: false
      };
      this.http.patch(this.endCurSeason + season, reqObj).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  updateSeason(credentials: any) {
    return new Promise((resolve, reject) => {
      console.log(credentials);
      this.http.put(this.editSeason + credentials._id, credentials).subscribe(
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

  removeEvent(credentials: any) {
    return new Promise((resolve, reject) => {
      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json'
      // });
      console.log(credentials);
      this.http.post(this.deleteEvent, credentials).subscribe(
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

  getAllTeams(credentials: any) {
    return new Promise((resolve, reject) => {
      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json'
      // });
      console.log(credentials);
      this.http.post(this.allteams, credentials).subscribe(
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

  getOneSeason(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOneseason + id).subscribe(
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
