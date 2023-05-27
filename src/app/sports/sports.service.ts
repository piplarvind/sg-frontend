import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class SportsService {
  curSport: any = {};
  createSport = 'sports/';
  getSports = 'sports/';
  editSport = 'sports/';
  deleteSport = 'sports/';
  fetchOneSport = 'sports/';
  getCountries = 'lookup/country';
  getAllState = 'lookup/state?filter=';
  allregions = 'lookup/region';
  getDistrictsList = 'lookup/district';
  clubadminRoles = 'profiles/?club=5';
  getAllAthleteSportFees = 'sports/athleteclubfee/';
  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: localStorage.token
  // });

  constructor(public http: HttpClient) {}

  getOneSport(id: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOneSport + id).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  newSport(credentials: any) {
    return new Promise((resolve, reject) => {
      console.log(credentials);
      this.http.post(this.createSport, credentials).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getSportList1(skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.getSports + '?skip=' + skip + '&limit=' + limit)
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
  getSortedSport(url) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getSports + url).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getSportList() {
    return new Promise((resolve, reject) => {
      this.http.get(this.getSports).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getAllSportList(skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getSports + '?' + 'active=false&skip=' + skip + '&limit=' + limit
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

  transformRequest(j: any) {
    const formDataTemp = new FormData();
    for (const p in j) {
      if (p) {
        formDataTemp.append(p, j[p]);
      }
    }
    return formDataTemp;
  }

  updateSport(club, credentials: any) {
    const tempHeaders = {
      Authorization: localStorage.getItem('token')
    };
    const newFormData = this.transformRequest(credentials);
    return new Promise((resolve, reject) => {
      this.http
        .put(this.editSport + club, newFormData, {
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

  removeSport(credentials: any, obj: any) {
    console.log('obj', obj);
    return new Promise((resolve, reject) => {
      this.http.patch(this.deleteSport + credentials, obj).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  extraxtNo(e: any) {
    if (e !== '') {
      e = e.replace(/[^A-Z0-9]+/gi, '');
      return e;
    }
  }

  getAllCountries() {
    return this.http.get(this.getCountries);
  }
  getStates(countryId: any) {
    return this.http.get(this.getAllState + countryId);
  }

  getDistricts() {
    return this.http.get(this.getDistrictsList);
  }

  getRegions() {
    return this.http.get(this.allregions);
  }
  getClubadmin(club_id) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.clubadminRoles + club_id + '&type=Club_Admin', {})
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

  getfilterSport(value) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getSports + value).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getAthleteSportFeeList(athleteId:any, type: any) {
    return this.http.get(this.getAllAthleteSportFees + athleteId);
  }
}
