import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ClubsService {
  curClub: any = {};
  createClub = "clubs/";
  getClubs = "clubs/";
  getClubSeasons = "seasons/";
  editClub = "clubs/";
  deleteClub = "clubs/";
  fetchOneClub = "clubs/";
  getCountries = "lookup/country";
  getAllState = "lookup/state?filter=";
  allregions = "lookup/region";
  getDistrictsList = "lookup/district";
  getSportsList = "sports/active";
  clubadminRoles = "profiles/?club=5";
  getAllAthleteClubFees = "clubs/athleteclubfee/";
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.token
  });

  constructor(public http: HttpClient) {}

  getOneClub(id: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOneClub + id).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  newClub(credentials: any) {
    return new Promise((resolve, reject) => {
      console.log(credentials);
      this.http.post(this.createClub, credentials).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getClubList1(skip, limit) {
    //console.log('this.headers', this.headers);
    return new Promise((resolve, reject) => {
      this.http
        .get(this.getClubs + "?skip=" + skip + "&limit=" + limit, {headers:this.headers})
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
  getSortedClub(url) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getClubs + url).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getClubList(sport=null) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getClubs + "?sport=" + sport).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getClubSeasonList(club=null) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getClubSeasons + "?club=" + club+"&yts=0").subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getAllClubList(skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getClubs + "?" + "skip=" + skip + "&limit=" + limit
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

  transformRequest(j: any) {
    const formDataTemp = new FormData();
    for (const p in j) {
      if (p) {
        formDataTemp.append(p, j[p]);
      }
    }
    return formDataTemp;
  }

  updateClub(club, credentials: any) {
    const tempHeaders = {
      Authorization: localStorage.getItem("token"),
    };
    const newFormData = this.transformRequest(credentials);
    return new Promise((resolve, reject) => {
      this.http
        .put(this.editClub + club, newFormData, {
          headers: tempHeaders,
        })
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

  removeClub(credentials: any, obj: any) {
    //console.log("obj", obj);
    return new Promise((resolve, reject) => {
      this.http.patch(this.deleteClub + credentials, obj).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  extraxtNo(e: any) {
    if (e !== "") {
      e = e.replace(/[^A-Z0-9]+/gi, "");
      return e;
    }
  }
  getSports() {
    return this.http.get(this.getSportsList);
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
        .post(this.clubadminRoles + club_id + "&type=Club_Admin", {})
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

  getfilterClub(value) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getClubs + value).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getAthleteClubFeeList(athleteId: any, type: any) {
    return this.http.get(this.getAllAthleteClubFees + athleteId);
  }
}
