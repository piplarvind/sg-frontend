import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


const routes = {
  sendMailTeams: 'emails/teams',
  sendMailAll: 'emails/toAll',
  sendMailRoles: 'emails/roles',
  getMailList: 'emails/?club=',
  deleteMail: 'emails/'
};

const userType = localStorage.user_role;
const tenantId = localStorage.super_cur_clubId || '';
@Injectable()
export class MailService {
  // headers = new HttpHeaders({
  //   // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
  //   Authorization: localStorage.getItem('token')
  // });

  constructor(public http: HttpClient) {}

  sendMailToRole(credentials: any) {
    return this.http.post(routes.sendMailRoles, credentials);
  }

  sendMailToAll(credentials: any) {
    return this.http.post(routes.sendMailAll, credentials);
  }

  sendMailToTeams(credentials: any) {
    return this.http.post(routes.sendMailTeams, credentials);
  }

  getAll(credentials: any, skip, limit) {
    return this.http.get(
      routes.getMailList +
        credentials.clubId +
        '&skip=' +
        skip +
        '&limit=' +
        limit
    );
  }
  getSortedmail(credentials: any, skip, limit, sort) {
    return this.http.get(
      routes.getMailList +
        credentials +
        '&skip=' +
        skip +
        '&limit=' +
        limit +
        '&sort=' +
        sort
    );
  }
  getfiltermail(credentials: any, value) {
    return this.http.get(routes.getMailList + credentials + value);
  }

  removeMail(credentials: any) {
    console.log('crreebhcbx : :', credentials);

    credentials.active = false;
    return this.http.patch(routes.deleteMail + credentials._id, credentials);
  }
}
