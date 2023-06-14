import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { environment } from 'environments/environment';
import { AthletesService } from '@app/athletes/athletes.service';
import { take } from 'rxjs/operators';
import { UsersService } from '@app/users/users.service';
import { ProfilesService } from '@app/profiles/profiles.service';
import { ClubsService } from '@app/clubs/clubs.service';
import { SharedService } from '@app/shared/shared.service';
import { SeasonsService } from '@app/seasons/seasons.service';

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.scss']
})
export class AthletesComponent implements OnInit, AfterViewInit {
  keyup: boolean = false;
  athleteList: Array<any>;
  isSuperAdmin: Boolean = false;
  clubsList: Array<any>;

  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  ageList;
  any;
  teams: Array<any>;
  curSelectClub: any;
  roleAthlete: any;
  resultsLength: any;
  mobile_no: Number;
  dataSource = new MatTableDataSource();
  displayedColumns: any = [
    'first_name',
    'user_name',
    'mobile_phone',
    'email',
    'team',
    'age',
    'created_on',
    'parentof',
    'Actions'
  ];
  hashedId: any = localStorage.dbName;
  @ViewChild(MatPaginator) topPaginator: MatPaginator;
  @ViewChild(MatPaginator) bottomPaginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    vcr: ViewContainerRef,
    private userService: UsersService,
    private ProfilesService: ProfilesService,
    public sharedService: SharedService,
    public clubService: ClubsService,
    public AthletesService: AthletesService,
    private changeDetector: ChangeDetectorRef,
    public seasonService: SeasonsService
  ) {}
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.changeDetector.detectChanges();
    this.getAllAge();

    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.curSelectClub = localStorage.super_cur_clubId;
    } else {
      this.curSelectClub = localStorage.club_id;
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
      this.getSeasons();
    }
  }
  getAllAge() {
    this.ProfilesService.getAgeAllList().then((res: any) => {
      this.ageList = [...res.data];
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

            this.getAllAthletes();
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
  ngAfterViewInit() {}
  //  sreach function
  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      value = value.split(' ').join('_');
      let sdata:any;
      this.ProfilesService.getFilterProfilesRole(
        this.curSelectClub,
        `${environment.Athlete}`,
        '&searchBy=first_name&values=' + value
      ).then((res: any) => {
        // modifing list or response
        const newres = res.data.map(prop => {
          const arr = [];
          if (prop.teams.length) {
            for (let i = 0; i < prop.teams.length; i++) {
              let Teamname = '';

              Teamname = prop.teams[i].name;
              arr.push(Teamname);
            }
          }
          let fname = '',
            lname = '',
            moblino = '',
            email = '',
            team,
            age,
            user_name = '',
            parentof = [];
          for (let i = 0; i < prop.profile_fields.length; i++) {
            if (prop.profile_fields[i].field) {
              if (prop.profile_fields[i].field.name === 'first_name') {
                fname = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'last_name') {
                lname = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'user_name') {
                user_name = prop.profile_fields[i].value;
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
                
                if (prop.profile_fields[i].value) {
                  let Selectedage = this.ageList.filter(
                    t => t._id === prop.profile_fields[i].value
                  );
                  if (Selectedage[0]) {
                    age = Selectedage[0].label;
                  }
                }
              }
            }
          }
          if (prop.parents)
            for (let i = 0; i < prop.parents.length; i++) {
              let pfname = '',
                plname = '';
              for (let k = 0; k < prop.parents[i].profile_fields.length; k++) {
                if (prop.parents[i].profile_fields[k].field) {
                  if (
                    prop.parents[i].profile_fields[k].field.name === 'first_name'
                  ) {
                    pfname = prop.parents[i].profile_fields[k].value;
                  }
                  if (
                    prop.parents[i].profile_fields[k].field.name === 'last_name'
                  ) {
                    plname = prop.parents[i].profile_fields[k].value;
                  }
                }
              }
              parentof.push(pfname + ' ' + plname);
            }
          return {
            ...prop,
            first_name: fname + ' ' + lname,
            mobile_phone: moblino,
            email: email,
            user_name: user_name,
            team: arr,
            parent: parentof,
            age: age
            // createdAt: prop.created_on
          };
        });

        // this.tabledata = newres;

        // console.log(' this.tabledata:::', this.tabledata);

        res.data = newres;

        sdata = res;
        this.dataSource.data = sdata['data'];
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
        this.limit = event.pageSize;
        this.skip = event.pageIndex * this.limit;
        this.getAllAthletes();
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
      `${environment.Athlete}`,
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
        let fname = '',
          lname = '',
          moblino = '',
          email = '',
          team,
          age,
          user_name = '',
          parentof = [];
        for (let i = 0; i < prop.profile_fields.length; i++) {
          if (prop.profile_fields[i].field) {
            if (prop.profile_fields[i].field.name === 'first_name') {
              fname = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'last_name') {
              lname = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'user_name') {
              user_name = prop.profile_fields[i].value;
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
              if (prop.profile_fields[i].value) {
                let Selectedage = this.ageList.filter(
                  t => t._id === prop.profile_fields[i].value
                );
                if (Selectedage[0]) {
                  age = Selectedage[0].label;
                }
              }
            }
          }
        }
        if (prop.parents)
          for (let i = 0; i < prop.parents.length; i++) {
            let pfname = '',
              plname = '';
            for (let k = 0; k < prop.parents[i].profile_fields.length; k++) {
              if (prop.parents[i].profile_fields[k].field) {
                if (
                  prop.parents[i].profile_fields[k].field.name === 'first_name'
                ) {
                  pfname = prop.parents[i].profile_fields[k].value;
                }
                if (
                  prop.parents[i].profile_fields[k].field.name === 'last_name'
                ) {
                  plname = prop.parents[i].profile_fields[k].value;
                }
              }
            }
            parentof.push(pfname + ' ' + plname);
          }
        return {
          ...prop,
          first_name: fname + ' ' + lname,
          mobile_phone: moblino,
          email: email,
          user_name: user_name,
          team: arr,
          parent: parentof,
          age: age
          // createdAt: prop.created_on
        };
      });

      this.tabledata = newres;

      res.data = this.tabledata;

      data = res;

      this.dataSource.data = data['data'];
    });
  }

  getAllAthletes() {
    this.sharedService.showLoader = true;
    let data:any;
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
      `${environment.Athlete}`,
      this.skip,
      this.limit
    ).then((res: any) => {
      this.athleteList = res.data;

      const newres = res.data.map(prop => {
        const arr = [];
        if (prop.teams.length) {
          for (let i = 0; i < prop.teams.length; i++) {
            let Teamname = '';

            Teamname = prop.teams[i].name;
            arr.push(Teamname);
          }
        }
        let fname = '',
          lname = '',
          moblino = '',
          email = '',
          team,
          age,
          user_name = '',
          parentof = [];
        for (let i = 0; i < prop.profile_fields.length; i++) {
          if (prop.profile_fields[i].field) {
            if (prop.profile_fields[i].field.name === 'first_name') {
              fname = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'last_name') {
              lname = prop.profile_fields[i].value;
            }
            if (prop.profile_fields[i].field.name === 'user_name') {
              user_name = prop.profile_fields[i].value;
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
              if (prop.profile_fields[i].value) {
                let Selectedage = this.ageList.filter(
                  t => t._id === prop.profile_fields[i].value
                );
                
                if (Selectedage[0]) {
                  age = Selectedage[0].label;
                }
              }
            }
          }
        }
        if (prop.parents)
          for (let i = 0; i < prop.parents.length; i++) {
            let pfname = '',
              plname = '';
            for (let k = 0; k < prop.parents[i].profile_fields.length; k++) {
              if (prop.parents[i].profile_fields[k].field) {
                if (
                  prop.parents[i].profile_fields[k].field.name === 'first_name'
                ) {
                  pfname = prop.parents[i].profile_fields[k].value;
                }
                if (
                  prop.parents[i].profile_fields[k].field.name === 'last_name'
                ) {
                  plname = prop.parents[i].profile_fields[k].value;
                }
              }
            }
            parentof.push(pfname + ' ' + plname);
          }
        return {
          ...prop,
          first_name: fname + ' ' + lname,
          mobile_phone: moblino,
          email: email,
          user_name: user_name,
          team: arr,
          parent: parentof,
          age: age
          // createdAt: prop.created_on
        };
      });
      this.tabledata = newres;

      res.data = this.tabledata;

      data = res;

      this.dataSource.data = data['data'];

      if (this.totalLength === 0) {
        this.totalLength = data['pagination'];
      }

      this.sharedService.showLoader = false;
    });
  }
  editAthlete(row: any) {
    this.router.navigate(['athletes/edit/{{row._id}}'], {
      queryParams: { athleteId: row._id, type: row.types[0]._id }
    });
  }

  deleteAthlete(row: any) {
    this.sharedService.showLoader = true;
    const temp = row;
    temp.hashedId = this.hashedId;
    this.userService
      .athletedelete(temp)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.getAllAthletes();
        this.sharedService.showMessage(e.message);
      })
      .catch((err: any) => {});
  }
  openDialog() {}
  dropdownChange(e: any) {
    localStorage.super_cur_club = e.value;
    this.getAllAthletes();
  }
}
