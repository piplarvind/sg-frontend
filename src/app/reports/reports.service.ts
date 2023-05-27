import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


const routes = {
  getAgeingReports: 'reports',
  getUnpaidReports: 'payments/reports/'
};
const userType = localStorage.user_role;
const tenantId = localStorage.super_cur_clubId || '';
@Injectable()
export class ReportsService {
  // headers = new HttpHeaders({
  //   // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
  //   Authorization: localStorage.getItem('token')
  // });

  constructor(public http: HttpClient) {}

  createTraining(credentials: any) {
    // return this.http.post(routes.newTraining, credentials, { headers: this.headers })
  }

  getUnpaidReports(credentials: any, skip, limit) {
    return this.http.get(
      routes.getUnpaidReports +
        credentials +
        '/dueDate' +
        '?skip=' +
        skip +
        '&limit=' +
        limit
    );
  }

  getDeclinedReports(credentials: any, skip, limit) {
    return this.http.get(
      routes.getUnpaidReports +
        credentials +
        '?skip=' +
        skip +
        '&limit=' +
        limit
    );
  }
  getDeclinedReportsfilter(ageingReportData: any, value) {
    return this.http.get(routes.getUnpaidReports + ageingReportData + value);
  }
  getSortedDeclinedReports(ageingReportData: any, skip, limit, sort) {
    return this.http.get(
      routes.getUnpaidReports +
        ageingReportData +
        '?skip=' +
        skip +
        '&limit=' +
        limit +
        '&sort=' +
        sort
    );
  }
  getAgeingReports(ageingReportData: any, skip, limit) {
    return this.http.get(
      routes.getUnpaidReports +
        ageingReportData +
        '/ageingReport' +
        '?skip=' +
        skip +
        '&limit=' +
        limit
    );
  }
  getfilterage(ageingReportData: any, value) {
    return this.http.get(
      routes.getUnpaidReports + ageingReportData + '/ageingReport' + value
    );
  }
  getSortedage(ageingReportData: any, skip, limit, sort) {
    return this.http.get(
      routes.getUnpaidReports +
        ageingReportData +
        '/ageingReport' +
        '?skip=' +
        skip +
        '&limit=' +
        limit +
        '&sort=' +
        sort
    );
  }

  getSuccessTransReportfilter(ageingReportData: any, value) {
    return this.http.get(
      routes.getUnpaidReports + ageingReportData + '/transactions/' + value
    );
  }
  getSuccessTransReports(credentials: any, skip, limit) {
    return this.http.get(
      routes.getUnpaidReports +
        credentials +
        '/transactions' +
        '?skip=' +
        skip +
        '&limit=' +
        limit
    );
  }
  sortgetSuccessTransReports(ageingReportData: any, skip, limit, sort) {
    return this.http.get(
      routes.getUnpaidReports +
        ageingReportData +
        '/transactions' +
        '?skip=' +
        skip +
        '&limit=' +
        limit +
        '&sort=' +
        sort
    );
  }
}
