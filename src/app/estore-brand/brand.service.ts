import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable()
export class BrandService {
  curClub: any;
  curBrand: any = {};
  createBrand = 'brands/';
  fetchBrand = 'brands/?clubId=';
  updateBrand = 'brands/';
  patchBrand = 'brands/';
  fetchOnebr = 'brands/';
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
  addBrand(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.createBrand, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getBrands(data: any, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.fetchBrand + data + '&skip=' + skip + '&limit=' + limit)
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
  getFiltereBrand(data: any, value) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchBrand + data + value).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getSorteBrand(data: any, skip, limit, sort) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.fetchBrand +
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

  editBrand(data: any, id: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.updateBrand + id, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  deleteBrand(data: any, temp: any) {
    return new Promise((resolve, reject) => {
      this.http.patch(this.patchBrand + data._id, temp).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  fetchOneBrand(id) {
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
