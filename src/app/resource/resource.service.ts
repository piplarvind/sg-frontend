import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// import { HttpClient,  } from '@angular/common/http';


const routes = {
  uploadVideo: 'medias/videos',
  uploadImage: 'image',
  uploadImageProfile: 'lookup/upload/',
  uploadDocs: 'medias/docs',
  deleteResource: 'rl/',
  addQuestion: 'rl/quiz',
  getTaskTypes: 'rl/tasks',
  getAssignmentTypes: 'rl/assignments/',
  getTaskNameByAssignment: 'rl/',
  newResources: 'rl'
};

const userType = localStorage.user_role;
const tenantId = localStorage.super_cur_clubId || '';
@Injectable()
export class ResourceService {
  // headers = new HttpHeaders({
  //   // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
  //   Authorization: localStorage.getItem('token')
  // });

  constructor(public http: HttpClient) {}

  uploadVideo(data: any) {
    return this.http.post(routes.uploadVideo, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  uploadImage(data: any) {
    return this.http.post(routes.uploadImage, data, {
      reportProgress: true,
      observe: 'events'
    });
  }
  uploadProfileImage(data: any) {
    return this.http.post(routes.uploadImageProfile, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  private getEventMessage(event: HttpEvent<any>, formData) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);

      case HttpEventType.Response:
        return this.apiResponse(event);

      default:
        return `File "${
          formData.get('profile').name
        }" surprising upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event) {
    const percentDone = Math.round((100 * event.loaded) / event.total);
    return { status: 'progress', message: percentDone };
  }

  private apiResponse(event) {
    return event.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }

  uploadDocument(data: any) {
    return this.http.post(routes.uploadDocs, data);
  }

  addQuestion(data: any) {
    return this.http.post(
      routes.addQuestion + '?clubId=' + localStorage.super_cur_clubId,
      data
    );
  }

  getAllTaskTypes() {
    let url = routes.getTaskTypes;
    // if (userType === 'Super Admin' || localStorage.user_role === "Platform Admin") {
    //   url += '?tenant=' + tenantId;
    // }
    return this.http.get(url);
  }

  getTaskNameByAssignment(id: any) {
    let url = routes.getTaskNameByAssignment;
    url += id + '/assignments';
    if (
      userType === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      url += '?tenant=' + localStorage.super_cur_clubId;
    }

    return this.http.get(url);
  }

  getAllAssignmentTypes(clubid) {
    let url = routes.getAssignmentTypes;
    // if (userType === 'Super Admin' || localStorage.user_role === "Platform Admin") {
    //   url += '?tenant=' + tenantId;
    // }
    return this.http.get(url + '?clubId=' + clubid);
  }

  createResources(credentials: any) {
    return this.http.post(routes.newResources, credentials);
  }

  updateResources(credentials: any) {
    return this.http.put(
      routes.newResources + '/' + credentials._id,
      credentials
    );
  }

  resourceDelete(credentials: any) {
    credentials.active = false;
    return this.http.patch(
      routes.deleteResource + credentials._id,
      credentials
    );
  }
  getAllResources(id, skip, limit) {
    return this.http.get(
      routes.newResources +
        '/?clubId=' +
        id +
        '&skip=' +
        skip +
        '&limit=' +
        limit
    );
  }
  getSortedResources(id, skip, limit, sort) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          routes.newResources +
            '/?clubId=' +
            id +
            '&skip=' +
            skip +
            '&limit=' +
            limit +
            '&sort=' +
            sort
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
  getfilterResource(id, value) {
    return new Promise((resolve, reject) => {
      this.http.get(routes.newResources + '/?clubId=' + id + value).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getAAllResources(fetchAll: any) {
    let url = routes.newResources;
    if (
      userType === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      url +=
        '?tenant=' +
        localStorage.super_cur_clubId +
        '&' +
        'fetchAll=' +
        fetchAll;
    }
    return this.http.get(url);
  }
  getResources(id: any) {
    let url = routes.newResources;
    if (
      userType === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin' ||
      localStorage.user_role === 'Coach'
    ) {
      url += '/' + id + '?tenant=' + localStorage.super_cur_clubId;
    }
    return this.http.get(url);
  }
  getAllResourceswithoutskip(id) {
    return this.http.get(routes.newResources + '/?clubId=' + id);
  }
}
