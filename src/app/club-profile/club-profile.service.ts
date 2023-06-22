import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClubProfileService {
  getProfile = 'club-profiles/';
  constructor(public http: HttpClient) { }

  getClubProfileTitleList(title:any, skip=0, limit=0) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getProfile +
            title +
            '&skip=' +
            skip +
            '&limit=' +
            limit
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



}
