import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewContainerRef
} from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@app/users/users.service';
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { ClubsService } from '@app/clubs/clubs.service';
import { SharedService } from '@app/shared/shared.service';
import { ProfilesService } from '@app/profiles/profiles.service';
import { environment } from 'environments/environment';
import { SeasonsService } from '@app/seasons/seasons.service';
// import { anyTypeAnnotation } from 'babel-types';
@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.scss']
})
export class RecruiterComponent implements OnInit {
  keyup: boolean = false;
  dataSource = new MatTableDataSource();
  isSuperAdmin = false;
  clubsList: Array<any>;
  athleteList: any = [];
  curSelectClub: any;
  displayedColumns: any = [
    'first_name',
    'title',
    'school',
    'athleteofintrest',
    'email',
    'mobile_phone',
    // 'team_name',
    // 'age',
    'created_on',
    'createdBy',
    // 'club_name',
    'Actions'
  ];
  roleRecruiter: any;

  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
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
    if (
      localStorage.user_role === `${environment.Club_Admin}` ||
      localStorage.user_role === `${environment.Coach}`
    ) {
      this.curSelectClub = localStorage.club_id;
    } else if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.isSuperAdmin = true;
      this.curSelectClub = localStorage.super_cur_clubId;
    }
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      if (!this.curSelectClub) {
        this.sharedService
          .loginDialog('Select the club')
          .subscribe(() => this.router.navigateByUrl('/home'));
      }
    }
    if (this.curSelectClub) {
      // this.getAllEvents();
      this.getAllathleteList();
      this.getSeasons();
    }
  }
  getAllathleteList() {
    this.ProfilesService.getRoleListAlluser(this.curSelectClub, 'Athlete').then(
      (res: any) => {
        this.sharedService.showLoader = false;

        this.athleteList = res.data.map((prop:any) => {
          let name: any = {
            fname: '',
            lname: ''
          };

          for (let i = 0; i < prop.profile_fields.length; i++) {
            if (prop.profile_fields[i].field) {
              if (prop.profile_fields[i].field.name === 'first_name') {
                name.fname = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'last_name') {
                name.lname = prop.profile_fields[i].value;
              }
            }
          }
          return {
            _id: prop._id,
            name: name.fname + ' ' + name.lname
          };
        });
      }
    );
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
            if (this.athleteList) {
              this.getAllRecruiter();
            }
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
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      value = value.split(' ').join('_');
      let data;
      this.ProfilesService.getFilterProfilesRole(
        this.curSelectClub,
        `${environment.Recruiter}`,
        '&searchBy=first_name&values=' + value
      ).then((res: any) => {
        const newres = res.data.map(prop => {
          let name: any = {
              fname: '',
              lname: ''
            },
            moblino,
            email,
            school = '',
            title = '',
            athlete: any = [],
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
              if (prop.profile_fields[i].field.name === 'recruiter_title') {
                title = prop.profile_fields[i].value;
              }
              if (
                prop.profile_fields[i].field.name === 'athlete_of_interest' &&
                prop.profile_fields[i].value.length > 4
              ) {
                let filterathlete: any = {
                    name: ''
                  },
                  arr = prop.profile_fields[i].value.split(',');
                for (let i = 0; i < arr.length; i++) {
                  filterathlete = this.athleteList.filter(
                    t => t._id === arr[i]
                  )[0];
                  if (filterathlete) {
                    athlete = athlete.concat(filterathlete.name);
                  }
                }
              }
              if (prop.profile_fields[i].field.name === 'school_name') {
                school = prop.profile_fields[i].value;
              }
            }
          }
          return {
            ...prop,
            first_name: name.fname + ' ' + name.lname,
            mobile_phone: moblino,
            email: email,
            school: school,
            athleteofintrest: athlete,
            title: title,
            team: team,

            age: age,
            created_on: prop.created_on
          };
        });
        // this.tabledata = this.tabledata.concat(newres);
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;
        this.dataSource.data = data['data'];
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
        this.getAllRecruiter();
      }
    }
  }
  namesort(event) {
    if (event.active !== 'createdBy') {
      let data;
      let value;
      if (event.direction === 'desc') {
        value = '-' + event.active;
      } else {
        value = event.active;
      }

      this.ProfilesService.getSortedProfilesbyRole(
        this.curSelectClub,
        `${environment.Recruiter}`,
        this.skip,
        this.limit,
        value
      ).then((res: any) => {
        const newres = res.data.map(prop => {
          let name: any = {
              fname: '',
              lname: ''
            },
            moblino,
            email,
            team,
            school = '',
            title = '',
            athlete: any = [],
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
              if (prop.profile_fields[i].field.name === 'recruiter_title') {
                title = prop.profile_fields[i].value;
              }
              if (
                prop.profile_fields[i].field.name === 'athlete_of_interest' &&
                prop.profile_fields[i].value.length > 4
              ) {
                let filterathlete: any = {
                    name: ''
                  },
                  arr = prop.profile_fields[i].value.split(',');
                for (let i = 0; i < arr.length; i++) {
                  filterathlete = this.athleteList.filter(
                    t => t._id === arr[i]
                  )[0];
                  if (filterathlete) {
                    athlete = athlete.concat(filterathlete.name);
                  }
                }
              }
              if (prop.profile_fields[i].field.name === 'school_name') {
                school = prop.profile_fields[i].value;
              }
            }
          }
          return {
            ...prop,
            first_name: name.fname + ' ' + name.lname,
            mobile_phone: moblino,
            email: email,
            school: school,
            athleteofintrest: athlete,
            title: title,
            team: team,

            age: age,
            created_on: prop.created_on
          };
        });

        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;
        // this.totalLength = res.pagination;
        // setTimeout(() => {
        this.dataSource.data = data['data'];
      });
    }
  }
  getAllRecruiter() {
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
      `${environment.Recruiter}`,
      this.skip,
      this.limit
    ).then((res: any) => {
      const newres = res.data.map(prop => {
        let name: any = {
            fname: '',
            lname: ''
          },
          moblino,
          email,
          team,
          school = '',
          title = '',
          athlete: any = [],
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
            if (prop.profile_fields[i].field.name === 'recruiter_title') {
              title = prop.profile_fields[i].value;
            }
            if (
              prop.profile_fields[i].field.name === 'athlete_of_interest' &&
              prop.profile_fields[i].value.length > 4
            ) {
              let filterathlete: any = {
                  name: ''
                },
                arr = prop.profile_fields[i].value.split(',');
              for (let i = 0; i < arr.length; i++) {
                filterathlete = this.athleteList.filter(
                  t => t._id === arr[i]
                )[0];
                if (filterathlete) {
                  athlete = athlete.concat(filterathlete.name);
                }
              }
            }
            if (prop.profile_fields[i].field.name === 'school_name') {
              school = prop.profile_fields[i].value;
            }
          }
        }
        return {
          ...prop,
          first_name: name.fname + ' ' + name.lname,
          mobile_phone: moblino,
          email: email,
          school: school,
          athleteofintrest: athlete,
          title: title,
          team: team,

          age: age,
          created_on: prop.created_on
        };
      });
      this.tabledata = newres;

      res.data = this.tabledata;

      // this.totalLength = res.pagination;
      // setTimeout(() => {
      this.dataSource.data = res['data'];
      if (this.totalLength === 0) {
        this.totalLength = res['pagination'];
      }
      this.sharedService.showLoader = false;
    });
  }
  editRecruiter(ele: any) {
    this.router.navigate(['recruiter/edit/{{ele._id}}'], {
      queryParams: { recruiterId: ele._id, type: ele.types[0]._id }
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
