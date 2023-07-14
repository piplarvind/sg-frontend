import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {

  getEmailTemplates = 'email-templates/';
  editEmailTemplate = 'email-templates/';
  fetchOneEmailTemplate = 'email-templates/';
  changeStatus = 'email-templates/';

  constructor(public http: HttpClient) { }
  
  allPEmailTemplates(skip, limit) {
    return this.http.get(
      this.getEmailTemplates +
        '?skip=' +
        skip +
        '&limit=' +
        limit
    );
  }

  getEmailTemplate(credentials: any) {
    return this.http.get(this.getEmailTemplates + credentials._id);
  }

  updatingEmailTemplate(credentials: any) {
    return this.http.put(this.editEmailTemplate + credentials._id, credentials);
  }

  getOneEmailTemplate(subscribersID: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOneEmailTemplate + subscribersID).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getSortedEmailTemplate(skip, limit, sort) {
    return this.http.get(
      this.getEmailTemplates +
        '?skip=' +
        skip +
        '&limit=' +
        limit +
        '&sort=' +
        sort
    );
  }

  chnageStatusEmailTemplate(credentials: any, obj: any) {
    //console.log('obj', obj);
    return new Promise((resolve, reject) => {
      this.http.patch(this.changeStatus + credentials, obj).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getInactiveEmailTemplateList(skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getEmailTemplates + "?" + "active=false&skip=" + skip + "&limit=" + limit
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  
}
