import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class DashboardService {
  staticsUrl = 'get-statics/';
  graphDataUrl = 'get-graph-data/';

  constructor(public http: HttpClient) {}

  getStaticsData() {
    return new Promise((resolve, reject) => {
      this.http.get(this.staticsUrl).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getGraphData() {
    return new Promise((resolve, reject) => {
      this.http.get(this.graphDataUrl).subscribe(
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
