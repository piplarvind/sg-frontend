import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class OrdersService {
  clubId: any;
  orders = 'orders/club/';
  update = 'orders/';
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

  getOrders(clubId, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.orders + clubId + '?skip=' + skip + '&limit=' + limit)
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
  getSorteOrder(clubId, skip, limit, sort) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.orders + clubId + '?skip=' + skip + '&limit=' + limit + sort)
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
  getFiltereOrder(clubId, value) {
    return new Promise((resolve, reject) => {
      this.http.get(this.orders + clubId + value).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  updateOrder(orderId: any, reqObj: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.update + orderId, reqObj).subscribe(
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
