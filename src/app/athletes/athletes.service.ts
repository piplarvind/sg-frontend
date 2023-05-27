import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormatWidth } from '@angular/common';

@Injectable()
export class AthletesService {
  fetchPos = 'lookup/position';
  fetchGen = 'gender';
  handed = 'lookup/handed';
  status = 'lookup/status';
  installmentUrl = 'clubs/installment'
  paymentUrl = 'clubs/payment'
  editInstallment = 'clubs/installment/edit/'
  deleteInstallment = 'clubs/installment/delete/'
  payInstallmentUrl = 'clubs/installment/pay/'
  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: localStorage.getItem('token')
  // });

  constructor(public http: HttpClient) {}
  fetchHanded() {
    return new Promise((resolve, reject) => {
      this.http.get(this.handed).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  fetchStatus() {
    return new Promise((resolve, reject) => {
      this.http.get(this.status).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  fetchPosition() {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchPos).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  fetchGender() {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchGen).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  fetchInstallmentById(installmentId: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.installmentUrl + "/" + installmentId).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  fetchPaymentById(paymenId:any, installmentId: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.paymentUrl + "/" + paymenId + "/" + installmentId).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  updatingInstallment(credentials: any) {    
    return this.http.put(this.editInstallment + credentials.paymentId + "/" + credentials._id, credentials);
  }

  removeInstallment(credentials: any) {
    return new Promise((resolve, reject) => {
      const objBody = {
        active: credentials.active
      };
      const url = this.deleteInstallment + credentials._id;
      this.http.patch(url, objBody).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  payInstallment(credentials: any) {
    return new Promise((resolve, reject) => {      
      const url = this.payInstallmentUrl + credentials._id + "/" + credentials.installments._id;
      this.http.patch(url, credentials).subscribe(
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

