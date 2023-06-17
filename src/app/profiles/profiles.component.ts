import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfilesService } from './profiles.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange, MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { environment } from 'environments/environment';
import { SeasonsService } from '@app/seasons/seasons.service';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  keyup: boolean = false;
  dataSource = new MatTableDataSource();
  buttontext: any = 'Show Inactive';
  clubId: any;
  displayedColumns: any = [
    'created_on',
    'first_name',
    'last_name',
    'type',
    'username',

    'email',
    'mobile_phone',

    'platform',
    'app_version',
    'last_used',
    'active',

    'Actions'
  ];
  useDefault = false;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;


  tabledataloaded: boolean = false;
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  constructor(
    public ProfileService: ProfilesService,
    public sharedService: SharedService,
    private router: Router,
    public seasonService: SeasonsService
  ) {}

  ngOnInit() {
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.clubId = localStorage.super_cur_clubId;
    } else {
      this.clubId = localStorage.club_id;
    }
    this.tabledata = [];
    if (!this.clubId) {
      this.sharedService
        .loginDialog('Select the club')
        .subscribe(() => this.router.navigateByUrl('/home'));
    }

    if (this.clubId) {
      this.getSeasons(this.clubId);
    }
  }
  ngAfterViewInit() {}
  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      value = value.split(' ').join('_');
      let url = '&searchBy=first_name&values=';
      if (this.buttontext === 'Show Active') {
        url = '&active=false&searchBy=first_name&values=';
      }

      let data;
      this.ProfileService.getFilterProfiles(this.clubId, url + value).then(
        (res: any) => {
          const newres = res.data.map(prop => {
            let fname = '',
              lname = '',
              username = '',
              email = '',
              moblino: '',
              types: any = [];

            for (let i = 0; i < prop.profile_fields.length; i++) {
              if (prop.profile_fields[i].field) {
                if (prop.profile_fields[i].field.name === 'first_name') {
                  fname = prop.profile_fields[i].value;
                }
                if (prop.profile_fields[i].field.name === 'last_name') {
                  lname = prop.profile_fields[i].value;
                }

                if (prop.profile_fields[i].field.name === 'user_name') {
                  username = prop.profile_fields[i].value;
                }
                if (prop.profile_fields[i].field.name === 'email') {
                  email = prop.profile_fields[i].value;
                }
                if (prop.profile_fields[i].field.name === 'mobile_phone') {
                  moblino = prop.profile_fields[i].value;
                }
              }
            }

            for (let i = 0; i < prop.types.length; i++) {
              const ty = prop.types[i].name;
              types = types.concat(ty);
            }

            return {
              ...prop,
              first_name: fname,
              last_name: lname,
              type: types,
              username: username,
              phone: moblino,
              email: email,
              created_on: prop.created_on
            };
          });

          this.tabledata = newres;

          res.data = this.tabledata;

          data = res;

          this.dataSource.data = data['data'];

          this.tabledataloaded = true;
        }
      );
    } else {
      this.keyup = true;
    }
  };

  getSeasons(id) {
    this.sharedService.showLoader = true;

    this.seasonService
      .getSeasonList(id)
      .then((e: any) => {
        if (!e.data.length) {
          this.sharedService
            .loginDialog('Please create a season before proceeding')
            .subscribe(() => this.router.navigateByUrl('/seasons'));
        }
        let k = 0;
        let ses = false;
        for (let i = 0; i < e.data.length; i++) {
          if (e.data[i].status === 1) {
            localStorage.curRunningSeason = JSON.stringify(e.data[i]);

            this.getProfiles(id);
            this.buttontext = 'Show Inactive';
            if (
              !localStorage.curRunningSeason ||
              localStorage.curRunningSeason === 'undefined' ||
              localStorage.curRunningSeason === 'null'
            ) {
              ses = true;
              this.sharedService
                .loginDialog('Please create a season before proceeding')
                .subscribe(() => this.router.navigateByUrl('/seasons'));
            }
            break;
          } else {
            k++;
          }
        }
        if (k === e.data.length && ses === false) {
          this.sharedService
            .loginDialog('Please create a season before proceeding')
            .subscribe(() => this.router.navigateByUrl('/seasons'));
        }
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;
        console.log(err);
        if (err) {
          {
            this.sharedService
              .loginDialog('Please create a season before proceeding')
              .subscribe(() => this.router.navigateByUrl('/seasons'));
          }
        }
      });
  }
  editProfiles(row: any) {
    this.router.navigate(['profiles/edit/{{row._id}}'], {
      queryParams: { profileId: row._id, type: row.types[0]._id }
    });
  }

  getAllProfile(club) {
    this.sharedService.showLoader = true;
    let data;

    this.ProfileService.getAllProfiles(club, this.skip, this.limit).then(
      (res: any) => {
        const newres = res.data.map(prop => {
          let fname = '',
            lname = '',
            username = '',
            email = '',
            moblino: '',
            types: any = [];

          for (let i = 0; i < prop.profile_fields.length; i++) {
            if (prop.profile_fields[i].field) {
              if (prop.profile_fields[i].field.name === 'first_name') {
                fname = prop.profile_fields[i].value;
                // console.log('fname ', fname);
              }
              if (prop.profile_fields[i].field.name === 'last_name') {
                lname = prop.profile_fields[i].value;
                // console.log('lname', lname);
              }
              if (prop.profile_fields[i].field.name === 'user_name') {
                username = prop.profile_fields[i].value;
                // console.log('lname', lname);
              }
              if (prop.profile_fields[i].field.name === 'email') {
                email = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'mobile_phone') {
                moblino = prop.profile_fields[i].value;
              }
            }
          }

          for (let i = 0; i < prop.types.length; i++) {
            // console.log('prop.types[i].name', prop.types[i].name);
            const ty = prop.types[i].name;
            types = types.concat(ty);
          }

          return {
            ...prop,
            first_name: fname,
            last_name: lname,
            type: types,
            username: username,
            phone: moblino,
            email: email,
            created_on: prop.created_on
          };
        });

        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data['data'];

        this.tabledataloaded = true;

        if (this.totalLength === 0 || this.totalLength !== data['pagination']) {
          this.totalLength = data['pagination'];
        }
        // });

        // this.totalLength = data['pagination'];
        this.sharedService.showLoader = false;
      },
      (err: any) => {
        console.log('error', err);
      }
    );
  }

  deleteProfile(row) {
    this.sharedService
      .showDialog(
        'This action will delete the user permanently. Are you sure to continue?'
      )
      .subscribe(response => {
        if (response !== '') {
          let data = {
            active: false,
            hard_delete: true
          };
          this.sharedService.showLoader = true;

          this.ProfileService.Profiledelete(row._id, data).then((e: any) => {
            this.sharedService.showLoader = false;
            this.getProfiles(this.clubId);
            this.buttontext = 'Show Inactive';
            this.sharedService.showMessage("'Profile deleted successfully");
          });
        }
      });
  }

  InactiveUser(event: MatSlideToggleChange, row: any) {
    this.sharedService
    .showDialog(
      'This action will change the user status. Are you sure to continue?'
    )
    .subscribe(response => {
      if (response !== '') {
        this.useDefault = event.checked;
        this.sharedService.showLoader = true;
        let data = {
          active: !row.active
        };
        this.sharedService.showLoader = true;

        this.ProfileService.Profiledelete(row._id, data).then((e: any) => {
          this.sharedService.showLoader = false;
          this.buttontext = 'Show Inactive';
          this.getProfiles(this.clubId);
          this.sharedService.showMessage(e.message + ' successfully');
        });
      }
    });
  }
  getProfiles(Id) {
    this.sharedService.showLoader = true;
    let data;

    // this.tabledataloaded = false;
    this.ProfileService.getProfiles(Id, this.skip, this.limit).then(
      (res: any) => {
        const newres = res.data.map(prop => {
          let fname = '',
            lname = '',
            username = '',
            email = '',
            moblino: '',
            types: any = [];

          for (let i = 0; i < prop.profile_fields.length; i++) {
            if (prop.profile_fields[i].field) {
              if (prop.profile_fields[i].field.name === 'first_name') {
                fname = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'last_name') {
                lname = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'user_name') {
                username = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'email') {
                email = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'mobile_phone') {
                moblino = prop.profile_fields[i].value;
              }
            }
          }

          for (let i = 0; i < prop.types.length; i++) {
            const ty = prop.types[i].name;
            types = types.concat(ty);
          }

          return {
            ...prop,
            first_name: fname,
            last_name: lname,
            type: types,
            username: username,
            phone: moblino,
            email: email,
            created_on: prop.created_on
          };
        });

        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data['data'];

        this.tabledataloaded = true;

        if (this.totalLength === 0 || this.totalLength !== data['pagination']) {
          this.totalLength = data['pagination'];
        }

        this.sharedService.showLoader = false;
      },
      (err: any) => {
        console.log('error', err);
      }
    );
  }
  getStatus(status: boolean) {
    if (status) {
      return 'ACTIVE';
    } else {
      return 'INACTIVE';
    }
  }

  ShowAll(event: any) {
    if (this.buttontext === 'Show Inactive') {
      this.getAllProfile(this.clubId);
      this.buttontext = 'Show Active';
    } else {
      this.buttontext = 'Show Inactive';
      this.getProfiles(this.clubId);
    }
  }

  changePage(event) {
    if (
      this.totalLength > this.dataSource.data.length ||
      event.pageSize !== this.limit
    ) {
      if (this.pageIndex <= event.pageIndex) {
        // next page
        this.limit = event.pageSize;
        this.skip = event.pageIndex * this.limit;
        if (this.buttontext === 'Show Inactive') {
          this.getProfiles(this.clubId);
        } else {
          this.getAllProfile(this.clubId);
        }
      }
    }
  }
  namesort(event) {
    let value;
    if (event.direction === 'desc') {
      value = '-' + event.active;
    } else {
      value = event.active;
    }
    let data;
    let url =
      '?club=' +
      this.clubId +
      '&skip=' +
      this.skip +
      '&limit=' +
      this.limit +
      '&sort=' +
      value;
    if (this.buttontext === 'Show Active') {
      url =
        '?club=' +
        this.clubId +
        '&active=false&skip=' +
        this.skip +
        '&limit=' +
        this.limit +
        '&sort=' +
        value;
    }
    this.ProfileService.getSortedProfiles(url).then((res: any) => {
      const newres = res.data.map(prop => {
        let fname = '',
          lname = '',
          username = '',
          email = '',
          moblino: '',
          types: any = [];

        for (let i = 0; i < prop.profile_fields.length; i++) {
          if (prop.profile_fields[i].field) {
            if (prop.profile_fields[i].field.name === 'first_name') {
              fname = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'last_name') {
              lname = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'user_name') {
              username = prop.profile_fields[i].value;
              // console.log('lname', lname);
            }
            if (prop.profile_fields[i].field.name === 'email') {
              email = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'mobile_phone') {
              moblino = prop.profile_fields[i].value;
            }
          }
        }

        for (let i = 0; i < prop.types.length; i++) {
          const ty = prop.types[i].name;
          types = types.concat(ty);
        }

        return {
          ...prop,

          first_name: fname,
          last_name: lname,
          type: types,
          username: username,
          phone: moblino,
          email: email,
          created_on: prop.created_on
        };
      });

      this.tabledata = newres;

      res.data = this.tabledata;

      data = res;

      this.dataSource.data = data['data'];

      this.tabledataloaded = true;
    });
  }
  inputChanged(e: any) {
    let s = '';
    if (e.length <= 10 && e.length > 0) {
      const first = e.substring(0, 3);
      const mid = e.substring(3, 6);
      const last = e.substring(6, 10);
      s = '(' + first + ') ' + mid + '-' + last;
      return s;
    }
  }
}
