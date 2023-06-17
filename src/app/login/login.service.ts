import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class LoginService {
  passwordForgot = 'forget/';
  resetEmail = 'password/';

  constructor(public http: HttpClient) {}

  forgotpassword(email: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.passwordForgot, email).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  changePassword(data: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.resetEmail, data).subscribe(
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
