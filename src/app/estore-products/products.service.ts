import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable()
export class ProductsService {
  curProduct: any = {};
  clubId: any;
  createProduct = 'products/';
  fetch = 'products/?clubId=';
  delete = 'products/';
  update = 'products/';
  gender = 'gender/';
  getOneProduct = 'products/';

  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: localStorage.getItem('token')
  // });
  // headers1 = new HttpHeaders({
  //   'Content-Type': 'multipart/form-data',
  //   Authorization: localStorage.getItem('token')
  // });
  constructor(public http: HttpClient) {
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.clubId = localStorage.super_cur_clubId;
    } else {
      this.clubId = localStorage.club_id;
    }
  }

  transformRequest(j) {
    let formDataTemp = new FormData();
    var str = [];
    for (var p in j) {
      formDataTemp.append(p, j[p]);
    }
    return formDataTemp;
  }

  addProduct(data: any) {
    let tempHeaders = {
      Authorization: localStorage.getItem('token')
    };
    let newFormData = this.transformRequest(data);
    return new Promise((resolve, reject) => {
      this.http
        .post(this.createProduct, newFormData, { headers: tempHeaders })
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

  getProducts(clubId, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.fetch + clubId + '&skip=' + skip + '&limit=' + limit)
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
  getSorteProduct(clubId, skip, limit, sort) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.fetch +
            clubId +
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
  getFiltereProduct(clubId, value) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetch + clubId + value).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  updateProduct(data: any, productId: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.update + productId, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  fetchProduct(id: any) {
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.clubId = localStorage.super_cur_clubId;
    } else {
      this.clubId = localStorage.club_id;
    }
    return new Promise((resolve, reject) => {
      this.http.get(this.getOneProduct + id).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  deleteProduct(data: any, temp: any) {
    return new Promise((resolve, reject) => {
      this.http.patch(this.delete + data, temp).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getGender() {
    return new Promise((resolve, reject) => {
      this.http.get(this.gender).subscribe(
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
