import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class FeeCollectionService {
  curEvent: any = {};
  planType = 'plan/types';
  eventType = 'events/types';

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

  getEventTypes() {
    return new Promise((resolve, reject) => {
      this.http.get(this.eventType).subscribe(
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
