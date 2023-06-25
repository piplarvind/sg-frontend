import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CmsPageService {

  getCMSPages = 'cms-pages/';
  editCMSPage = 'cms-pages/';
  fetchOneCMSPage = 'cms-pages/';
  changeStatus = 'cms-pages/';
  fetchOneCMSPageBySlug = 'public-page/';

  constructor(public http: HttpClient) { }
  
  allPCMSPages(skip, limit) {
    return this.http.get(
      this.getCMSPages +
        '?skip=' +
        skip +
        '&limit=' +
        limit
    );
  }

  getCMSPage(credentials: any) {
    return this.http.get(this.getCMSPages + credentials._id);
  }

  updatingCMSPage(credentials: any) {
    return this.http.put(this.editCMSPage + credentials._id, credentials);
  }

  getOneCMSPage(subscribersID: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOneCMSPage + subscribersID).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getOneCMSPageBySlug(slug:string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOneCMSPageBySlug + slug).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getSortedCMSPage(skip, limit, sort) {
    return this.http.get(
      this.getCMSPages +
        '?skip=' +
        skip +
        '&limit=' +
        limit +
        '&sort=' +
        sort
    );
  }

  chnageStatusCMSPage(credentials: any, obj: any) {
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

  getInactiveCMSPageList(skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getCMSPages + "?" + "active=false&skip=" + skip + "&limit=" + limit
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
