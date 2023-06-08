import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class SubscriptionsService {
  curClub: any;
  createPlan = 'plans/';
  getPlans = 'plans/';
  editPlan = 'plans/';
  deletePlan = 'plans/';
  getTypes = 'plans/types';
  fetchOneSubscription = 'plans/';

  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: localStorage.token
  // });

  constructor(public http: HttpClient) {}

  allPlans(credentials: any, skip, limit) {
    return this.http.get(
      this.getPlans +
        '?club=' +
        credentials +
        '&skip=' +
        skip +
        '&limit=' +
        limit
    );
  }
  getClubSubscriptionallPlans(credentials: any, Subscriptiontype) {
    return this.http.get(
      this.getPlans + '?club=' + credentials + '&type=' + Subscriptiontype
    );
  }
  getfilterSubscription(credentials: any, value) {
    return this.http.get(this.getPlans + '?club=' + credentials + value);
  }
  getSortedSubscription(credentials: any, skip, limit, sort) {
    return this.http.get(
      this.getPlans +
        '?club=' +
        credentials +
        '&skip=' +
        skip +
        '&limit=' +
        limit +
        '&sort=' +
        sort
    );
  }

  planTypes() {
    return this.http.get(this.getTypes);
  }

  newPlan(credentials: any) {
    return this.http.post(this.createPlan, credentials);
  }

  getClubPlans(credentials: any) {
    return this.http.get(this.getPlans + credentials.clubId);
  }

  updatingPlan(credentials: any) {
    let clubId;
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      clubId = localStorage.super_cur_clubId;
    } else {
      clubId = localStorage.club_id;
    }
    return this.http.put(this.editPlan + credentials._id, credentials);
  }

  deletingPlan(credentials: any) {
    let clubId;
    credentials.active = false;
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      clubId = localStorage.super_cur_clubId;
    } else {
      clubId = localStorage.club_id;
    }
    return this.http.patch(this.deletePlan + credentials._id, credentials);
  }

  getOneSubscription(subscribersID: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOneSubscription + subscribersID).subscribe(
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
