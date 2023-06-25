import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClubProfileService {

  fetchOneClubProfileTitle = 'club-profiles/'
  getProfile = 'club-profiles/';
  createClubTitle = 'club-profiles/';
  editClubTitle = 'club-profiles/';
  deleteClubTitle = 'club-profiles/';

  constructor(public http: HttpClient) { }

  getOneClubProfileTitle(id: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOneClubProfileTitle + id).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getClubProfileTitleList(title: any, skip = 0, limit = 0) {
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

  getInactiveClubProfileTitleList(skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getProfile + "?" + "active=false&skip=" + skip + "&limit=" + limit
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

  newClubTitle(inputData: any) {
    const tempHeaders = {
      Authorization: localStorage.getItem('token')
    };
    inputData.active = true;
    return new Promise((resolve, reject) => {
      console.log(inputData);
      this.http.post(this.createClubTitle, inputData, {
        headers: tempHeaders
      }).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  updateClubTitle(id: any, inputData: any) {
    const tempHeaders = {
      Authorization: localStorage.getItem('token')
    };

    return new Promise((resolve, reject) => {
      this.http
        .put(this.editClubTitle + id, inputData, {
          headers: tempHeaders
        })
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

  chnageStatusClubTitle(credentials: any, obj: any) {
    //console.log('obj', obj);
    return new Promise((resolve, reject) => {
      this.http.patch(this.deleteClubTitle + credentials, obj).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  removeClubTitle(credentials: any, obj: any) {
    //console.log('obj', obj);
    return new Promise((resolve, reject) => {
      this.http.delete(this.deleteClubTitle + credentials, obj).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  

  transformRequest(j: any) {
    const formDataTemp = new FormData();
    for (const p in j) {
      if (p) {
        formDataTemp.append(p, j[p]);
      }
    }
    return formDataTemp;
  }

}
