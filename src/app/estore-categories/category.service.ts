import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class CategoryService {
  curCategory: any = {};
  curSizeList: Array<any>;
  clubId: any;
  getSize = 'eStoreUtils/club/';
  createCategory = 'categories/';
  fetchCategory = 'categories/?clubId=';
  update = 'categories/';
  patchCategory = 'categories/';
  size = 'eStoreUtils/club/';
  fetchOne = 'categories/';
  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
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

  getSizeGroup() {
    return new Promise((resolve, reject) => {
      this.http.get(this.getSize + this.clubId + '/sizeGroup').subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  addCategory(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.createCategory, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getCategories(clubId: any, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.fetchCategory + clubId + '&skip=' + skip + '&limit=' + limit)
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
  getFilterecategory(clubId: any, value) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchCategory + clubId + value).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getSorteCategory(clubId: any, skip, limit, sort) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.fetchCategory +
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
  updateCategory(data: any, id: any) {
    console.log('updtae c at ser--', id);
    return new Promise((resolve, reject) => {
      this.http.put(this.update + id, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  deleteCategory(data: any, temp: any) {
    return new Promise((resolve, reject) => {
      this.http.patch(this.patchCategory + data._id, temp).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getSizeList(sizeGrpId: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.size + this.clubId + '/sizeGroup/' + sizeGrpId)
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
  fetchOnecategory(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOne + id).subscribe(
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
