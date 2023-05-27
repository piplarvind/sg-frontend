import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  curclub: any;
  getFlagged = 'feeds/flagged/club/';
  updateStatus = 'feeds/posts/';

  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: localStorage.getItem('token')
  // });

  constructor(public http: HttpClient) {}

  getAllFlagPost(curclub, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.getFlagged + curclub + '?skip=' + skip + '&limit=' + limit)
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
  getFilterFeed(curclub, value) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getFlagged + curclub + value).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getSortFeed(curclub, skip, limit, sort) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getFlagged +
            curclub +
            '?skip=' +
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

  updateFeed(credentials: any, reqObj: any) {
    return new Promise((resolve, reject) => {
      this.http
        .put(this.updateStatus + credentials._id + '/report', reqObj)
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
}
