import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';
@Injectable()
export class ColorService {
  curClub: any;
  curColor: any = {};
  createColor = 'colors/';
  fetchColor = 'colors/?clubId=';
  deleteColors = 'colors/';
  updateColors = 'colors/';
  fetchOneCo = 'colors/';
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
  addColor(data: any) {
    console.log('data add  :::', data);
    return new Promise((resolve, reject) => {
      this.http.post(this.createColor, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getColors(data: any, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.fetchColor + data + '&skip=' + skip + '&limit=' + limit)
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
  getFiltereColor(data: any, value) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchColor + data + value).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getSortecolor(data: any, skip, limit, sort) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.fetchColor +
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
  deleteColor(data: any, temp: any) {
    console.log('data.id', data._id);

    return new Promise((resolve, reject) => {
      this.http.patch(this.deleteColors + data._id, temp).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  updateColor(data: any, colorId: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.updateColors + colorId, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  fetchOneColor(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOneCo + id).subscribe(
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
