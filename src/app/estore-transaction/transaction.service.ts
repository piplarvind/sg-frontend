import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable()
export class TransactionService {
  clubId: any;
  createTransaction = 'products/purchase';
  fetchProd = 'eStoreUtils/club/';
  updateTransactn = 'products/purchase/';
  fetchTransactn = 'products/purchase/';

  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: localStorage.getItem('token')
  // });

  constructor(public http: HttpClient) {
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.clubId = localStorage.super_cur_clubId;
    } else {
      this.clubId = localStorage.club_id;
    }
  }

  addTransaction(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.createTransaction, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  filterProduct(data: any) {
    const credential = this.generateQueryString(
      this.fetchProd + this.clubId + '/filter',
      data
    );

    return new Promise((resolve, reject) => {
      this.http.get(credential).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  updateTransaction(id: any, data: any) {
    const url = `products/purchase/${id}`;
    return new Promise((resolve, reject) => {
      this.http.put(url, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getTransactions(clubId: any, skip, limit) {
    const url =
      `products/purchase?clubId=${clubId}&fetchActive=true+&skip=` +
      skip +
      '&limit=' +
      limit;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getSorteTransaction(clubId: any, skip, limit, sort) {
    const url =
      `products/purchase?clubId=${clubId}&fetchActive=true&skip=` +
      skip +
      '&limit=' +
      limit +
      '&sort=' +
      sort;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getFiltereTranscation(clubId: any, value) {
    const url = `products/purchase?clubId=${clubId}&fetchActive=true` + value;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  fetchTransaction(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchTransactn + id).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  generateQueryString(url: string, params: any = {}) {
    const noOfProperties = Object.keys(params).length;
    let arr = [];
    let qs = '';
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if (
          params[key] !== undefined &&
          params[key] !== '' &&
          params[key] !== 0
        ) {
          let pair;
          pair = `${key}=${params[key]}`;
          arr.push(pair);
        }
      }
    }
    if (arr.length > 0) {
      qs = '?';
      qs += arr.join('&');
    }
    return url + qs;
  }
}
