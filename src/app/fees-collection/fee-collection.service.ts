import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class FeeCollectionService {
  curEvent: any = {};
  planType = 'plans/types';
  eventType = 'events/types';
  feeCollection = 'fee-collections';

  constructor(public http: HttpClient) {}

  getPlanTypes() {
    return new Promise((resolve, reject) => {
      this.http.get(this.planType).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getEventTypes(data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.eventType}${data}`).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getFeeCollections(data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.feeCollection}${data}`).subscribe(
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
