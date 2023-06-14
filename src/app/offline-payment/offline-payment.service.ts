import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class OfflinePaymentService {
  curClub: any;
  allPayments = 'payments/subscribers?clubId=';
  fetchOnePayment = 'payments/subscribers/';
  updatePayment = 'payments/offline/';
  deletePayment = '';
  specificPackage = 'plans/club/';
  installment = 'plans/';
  saveOffPayment = 'payments/offline';
  saveOfflinePaymentUrl = 'payments/addOfflinePayment';
  Transactionlist = 'payments/types';
  installmentFrequencyUrl = 'payments/installmentFrequency';
  installmentTypeUrl = 'payments/installmentType';
  
  constructor(public http: HttpClient) {
    // if (
    //   localStorage.user_role === 'Super Admin' ||
    //   localStorage.user_role === 'Platform Admin'
    // ) {
    //   this.curClub = localStorage.super_cur_clubId;
    //   // this.curClub = localStorage.curentSelectedClub;
    //   console.log('club id constructor::', this.curClub);
    // } else {
    //   this.curClub = localStorage.club_id;
    // }
  }

  getAllPayments(clubId, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.allPayments +
            clubId +
            '&is_offline=false&skip=' +
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
  getfilteroffPayment(clubId, value) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.allPayments + clubId + '&is_offline=true&' + value)
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
  getSortedOffPayment(clubId, skip, limit, sort) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.allPayments +
            clubId +
            '&is_offline=true&skip=' +
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
  getOnePayment(subscribersID: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOnePayment + subscribersID).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  updateOfflinePayment(data: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.updatePayment + data._id, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  removePayment(credentials: any) {
    return new Promise((resolve, reject) => {
      const objBody = {
        active: false
      };
      const url = this.deletePayment;
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

  // GET Plan - fetch specific

  getSpecPackage(clubId, data: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.specificPackage + clubId + '/user/' + data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  savePayment(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.saveOffPayment, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  saveOfflinePayment(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.saveOfflinePaymentUrl, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  // GET Transaction types
  getTransactionList() {
    return new Promise((resolve, reject) => {
      this.http.get(this.Transactionlist).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getInstallment(plan_id, installment_no, installment_amount) {
    console.log("installment_amount @ getInstallment: ",installment_amount)
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.installment +
            plan_id + "/" +
            'installment?installment=true&installment_no=' + 
            //'/installment?installment=true&installment_no=' +
            installment_no + '&installment_amount=' + installment_amount
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
  getActivityPackageInstallment(plan_id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.installment + plan_id + '/installment').subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  installmentFrequency() {
    return new Promise((resolve, reject) => {
      this.http.get(this.installmentFrequencyUrl).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  installmentType() {
    return new Promise((resolve, reject) => {
      this.http.get(this.installmentTypeUrl).subscribe(
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
