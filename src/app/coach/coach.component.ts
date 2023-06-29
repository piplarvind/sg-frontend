import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewContainerRef
} from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@app/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClubsService } from '@app/clubs/clubs.service';
import { SharedService } from '@app/shared/shared.service';
import { ProfilesService } from '@app/profiles/profiles.service';
import { environment } from 'environments/environment';
import { SeasonsService } from '@app/seasons/seasons.service';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit, AfterViewInit {
  keyup: boolean = false;
  dataSource = new MatTableDataSource();
  isSuperAdmin = false;
  clubsList: Array<any>;
  curSelectClub: any;
  tabledataloaded: boolean = false;
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  displayedColumns: any = [
    'first_name',
    'mobile_phone',
    'email',
    'team_name',

    'created_on',
    'createdBy',
    // 'club_name',
    'Actions'
  ];
  roleCoach: any;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    vcr: ViewContainerRef,
    private userService: UsersService,
    private clubService: ClubsService,
    private sharedService: SharedService,
    private ProfilesService: ProfilesService,
    public seasonService: SeasonsService
  ) {}

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.curSelectClub = localStorage.super_cur_clubId;
    } else {
      this.curSelectClub = localStorage.club_id;
    }
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      if (!this.curSelectClub) {
        this.sharedService
          .loginDialog('Please select sport & club from header')
          .subscribe(() => this.router.navigateByUrl('/home'));
      }
    }
    if (this.curSelectClub) {
      this.getSeasons();
    }
  }
  getSeasons() {
    this.sharedService.showLoader = true;
    this.seasonService
      .getSeasonList(this.curSelectClub)
      .then((e: any) => {
        if (!e.data.length) {
          this.sharedService
            .loginDialog('Please create a season before proceeding')
            .subscribe(() => this.router.navigateByUrl('/seasons'));
        }
        for (let i = 0; i < e.data.length; i++) {
          if (e.data[i].status === 1) {
            localStorage.curRunningSeason = JSON.stringify(e.data[i]);

            this.getAllCoach();
            if (
              !localStorage.curRunningSeason ||
              localStorage.curRunningSeason === 'undefined' ||
              localStorage.curRunningSeason === 'null'
            ) {
              this.sharedService
                .loginDialog('Please create a season before proceeding')
                .subscribe(() => this.router.navigateByUrl('/seasons'));
            }
          }
        }
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;

        if (err) {
          {
            this.sharedService
              .loginDialog('Please create a season before proceeding')
              .subscribe(() => this.router.navigateByUrl('/seasons'));
          }
        }
      });
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      let data;
      value = value.split(' ').join('_');
      this.ProfilesService.getFilterProfilesRole(
        this.curSelectClub,
        `${environment.Coach}`,
        '&searchBy=first_name&values=' + value
      ).then((res: any) => {
        const newres = res.data.map(prop => {
          const arr = [];
          if (prop.teams.length) {
            for (let i = 0; i < prop.teams.length; i++) {
              let Teamname = '';

              Teamname = prop.teams[i].name;
              arr.push(Teamname);
            }
          }
          let name: any = {
              fname: '',
              lname: ''
            },
            moblino,
            email,
            team,
            age;
          for (let i = 0; i < prop.profile_fields.length; i++) {
            if (prop.profile_fields[i].field) {
              if (prop.profile_fields[i].field.name === 'first_name') {
                name.fname = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'last_name') {
                name.lname = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'email') {
                email = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'mobile_phone') {
                moblino = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'team') {
                team = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'age') {
                age = prop.profile_fields[i].value;
              }
            }
          }
          return {
            ...prop,
            first_name: name.fname + ' ' + name.lname,
            mobile_phone: moblino,
            email: email,

            team: arr,

            age: age
          };
        });

        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data['data'];

        this.tabledataloaded = true;
      });
    } else {
      this.keyup = true;
    }
  };

  changePage(event) {
    if (
      this.totalLength > this.dataSource.data.length ||
      event.pageSize !== this.limit
    ) {
      if (this.pageIndex <= event.pageIndex) {
        // next page
        this.limit = event.pageSize;
        this.skip = event.pageIndex * this.limit;
      }
    }
  }
  namesort(event) {
    let data;
    let value;
    if (event.direction === 'desc') {
      value = '-' + event.active;
    } else {
      value = event.active;
    }
    this.ProfilesService.getSortedProfilesbyRole(
      this.curSelectClub,
      `${environment.Coach}`,
      this.skip,
      this.limit,
      value
    ).then((res: any) => {
      const newres = res.data.map(prop => {
        const arr = [];
        if (prop.teams.length) {
          for (let i = 0; i < prop.teams.length; i++) {
            let Teamname = '';

            Teamname = prop.teams[i].name;
            arr.push(Teamname);
          }
        }
        let name: any = {
            fname: '',
            lname: ''
          },
          moblino,
          email,
          team,
          age;
        for (let i = 0; i < prop.profile_fields.length; i++) {
          if (prop.profile_fields[i].field) {
            if (prop.profile_fields[i].field.name === 'first_name') {
              name.fname = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'last_name') {
              name.lname = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'email') {
              email = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'mobile_phone') {
              moblino = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'team') {
              team = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'age') {
              age = prop.profile_fields[i].value;
            }
          }
        }
        return {
          ...prop,
          first_name: name.fname + ' ' + name.lname,
          mobile_phone: moblino,
          email: email,

          team: arr,

          age: age
        };
      });

      this.tabledata = newres;

      res.data = this.tabledata;

      data = res;

      this.dataSource.data = data['data'];

      this.tabledataloaded = true;
    });
  }

  getAllCoach() {
    this.sharedService.showLoader = true;
    let tempValue: any;
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      tempValue = localStorage.super_cur_clubId;
    } else {
      tempValue = localStorage.club_id;
    }
    this.ProfilesService.getRoleList(
      tempValue,
      `${environment.Coach}`,
      this.skip,
      this.limit
    ).then((res: any) => {
      const newres = res.data.map(prop => {
        const arr = [];
        if (prop.teams.length) {
          for (let i = 0; i < prop.teams.length; i++) {
            let Teamname = '';

            Teamname = prop.teams[i].name;
            arr.push(Teamname);
          }
        }
        let name: any = {
            fname: '',
            lname: ''
          },
          moblino,
          email,
          team,
          age;

        for (let i = 0; i < prop.profile_fields.length; i++) {
          if (prop.profile_fields[i].field) {
            if (prop.profile_fields[i].field.name === 'first_name') {
              name.fname = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'last_name') {
              name.lname = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'email') {
              email = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'mobile_phone') {
              moblino = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'team') {
              team = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'age') {
              age = prop.profile_fields[i].value;
            }
          }
        }
        return {
          ...prop,
          first_name: name.fname + ' ' + name.lname,
          mobile_phone: moblino,
          email: email,

          team: arr,

          age: age,
          createdAt: prop.created_on
        };
      });
      this.tabledata = newres;

      res.data = this.tabledata;

      this.dataSource.data = res['data'];
      if (this.totalLength === 0) {
        this.totalLength = res['pagination'];
      }
      this.sharedService.showLoader = false;
    });
  }

  editCoach(row: any) {
    for (let i = 0; i < row.types.length; i++) {
      if (row.types[i].name === 'Coach') {
        this.router.navigate(['coach/edit/{{row._id}}'], {
          queryParams: { coachId: row._id, type: row.types[i]._id }
        });
      }
    }
  }

  deleteCoach(row: any) {
    this.sharedService.showLoader = true;
    const temp = row;
    temp.hashedId = localStorage.dbName;
    this.userService
      .athletedelete(temp)
      .then((e: any) => {
        this.getAllCoach();
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {});
  }

  openDialog() {}

  dropdownChange(e: any) {
    this.getAllCoach();
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
