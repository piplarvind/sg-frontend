import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable()
export class SettingsService {
  curClub: any;
  curSetting: any = {};
  createSettingUrl = 'settings/';
  fetchSetting = 'settings/';
  updateSettingUrl = 'settings/';
  patchSetting = 'settings/';
  fetchOnebr = 'settings/';
  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: localStorage.getItem('token')
  // });

  constructor(public http: HttpClient) {
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.curClub = localStorage.super_cur_clubId;
    } else {
      this.curClub = localStorage.club_id;
    }
  }
  createSettingData(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.createSettingUrl, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getAllSettings(data: any, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.fetchSetting + data + '&skip=' + skip + '&limit=' + limit)
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
  getFilterSetting(data: any, value) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchSetting + data + value).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getSorteSetting(data: any, skip, limit, sort) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.fetchSetting +
            data +
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

  updateSetting(data: any, id: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.updateSettingUrl + id, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  deleteSetting(data: any) {
    return new Promise((resolve, reject) => {
      this.http.patch(this.patchSetting + data._id, null).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  fetchSingleSetting(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOnebr + id).subscribe(
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
