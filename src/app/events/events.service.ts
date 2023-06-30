import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable()
export class EventsService {
  curEvent: any = {};
  eventTypes = 'events/types/';
  createEvent = 'events/';
  getEvent = 'events/?club=';
  getEventType = 'events/types/?club=';
  editEvent = 'events/';
  deleteEvent = 'events/';
  allteams = 'api/generic/getTeams';
  updatestat = 'events/teamStat/';
  saveplayerstat = 'events/playerStat';
  updateplayerstat = 'events/playerStat/';
  fetchOneEvent = 'events/';
  getRegisteruser = 'events/registration/';
  posteventuser = 'events/eventUser/';
  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: localStorage.token
  // });

  constructor(public http: HttpClient) {}

  getOneEvent(eventID: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOneEvent + eventID).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getAlleventType(club, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.fetchOneEvent +
            'types/?club=' +
            club +
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
  createeventType(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.createEvent + 'types/', data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getOneeventType(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOneEvent + 'types/' + id).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  UpdateeeventType(id, data) {
    return new Promise((resolve, reject) => {
      const url = this.editEvent + data._id;
      this.http.put(this.editEvent + 'types/' + id, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  newEvent(data: any) {
    const tempHeaders = {
      Authorization: localStorage.getItem('token')
    };
    const newFormData = this.transformRequest(data);
    return new Promise((resolve, reject) => {
      this.http
        .post(this.createEvent, newFormData, { headers: tempHeaders })
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
  newStandardEvent(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.createEvent, data).subscribe(
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

  getEventList(clubId: any, skip, limit) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.getEvent + clubId + '&skip=' + skip + '&limit=' + limit)
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
  getSortEvent(clubId, skip, limit, sort) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getEvent +
            clubId +
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
  getSortFilterEvent(clubId, value) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getEvent + clubId + value).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  updateEvent(data: any) {
    const tempHeaders = {
      Authorization: localStorage.getItem('token')
    };
    const newFormData = this.transformRequest(data);
    return new Promise((resolve, reject) => {
      const url = this.editEvent + data._id;
      this.http.put(url, newFormData, { headers: tempHeaders }).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  updateStandardEvent(event_id, data: any) {
    console.log('daat', data);
    return new Promise((resolve, reject) => {
      this.http.put(this.editEvent + event_id, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  updateEventStatus(id:any, data: any) {
    const tempHeaders = {
      Authorization: localStorage.getItem('token')
    };
  
    return new Promise((resolve, reject) => {
      const url = this.editEvent + id;
      this.http.put(url, data, { headers: tempHeaders }).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  
  removeEvent(credentials: any) {
    return new Promise((resolve, reject) => {
      const objBody = {
        active: false
      };
      const url = this.deleteEvent + credentials._id;
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

  getAllTeams(credentials: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.allteams, credentials).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getEventTypes(club) {
    return this.http.get(this.eventTypes + '?club=' + club);
  }

  updateStats(data: any, eventid: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.updatestat + eventid, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  savePlayerStats(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.saveplayerstat, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  updatePlayerStats(data: any, setId: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.updateplayerstat + setId, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getSortFilterEventtype(clubId, value) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getEventType + clubId + value).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getSortEventtype(clubId, skip, limit, sort) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.getEventType +
            clubId +
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
  getDownloadscvs(event_id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fetchOneEvent + event_id + '/getCsv').subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getRegisterUser(RegisterUser_id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getRegisteruser + RegisterUser_id).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  updateREgisterUser(RegisterUser_id, data) {
    return new Promise((resolve, reject) => {
      this.http.put(this.getRegisteruser + RegisterUser_id, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  Athleteaddtoteam(RegisterUser_id, data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.posteventuser + RegisterUser_id + '/AddToTeam', data)
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
  Useraddtoteam(RegisterUser_id, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.posteventuser + RegisterUser_id, data).subscribe(
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
