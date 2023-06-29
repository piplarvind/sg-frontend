import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewContainerRef
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeamsService } from '@app/teams/teams.service';
import { ClubsService } from '@app/clubs/clubs.service';
import { SharedService } from '@app/shared/shared.service';
import { SeasonsService } from '@app/seasons/seasons.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit, AfterViewInit {
  keyup: boolean = false;
  dataSource = new MatTableDataSource();
  isSuperAdmin = false;
  curSelectClub: any;
  buttontext: any;
  active: any = false;
  temp: any;
  clubsList: Array<any> = [];
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  displayedColumns: any = [
    'name',
    'age',
    'order',
    'head_coach',
    'assistant_coach',
    'team_rep',
    'createdAt',
    'active',
    'Actions'
  ];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private teamsService: TeamsService,
    public sharedService: SharedService,
    public clubService: ClubsService,
    public seasonService: SeasonsService
  ) {}

  ngOnInit() {
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.curSelectClub = localStorage.super_cur_clubId;
    } else {
      this.curSelectClub = localStorage.club_id;
    }
    if (!this.curSelectClub) {
      this.sharedService
        .loginDialog('Please select sport & club from header')
        .subscribe(() => this.router.navigateByUrl('/home'));
    }
    if (this.curSelectClub) {
      this.getSeasons(this.curSelectClub);
    }
  }
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
        for (let i = 0; i < e.data.length; i++) {
          if (e.data[i].status === 1) {
            localStorage.curRunningSeason = JSON.stringify(e.data[i]);

            this.getTeams();
            this.buttontext = 'Show Inactive';
            if (
              !localStorage.curRunningSeason ||
              localStorage.curRunningSeason === 'undefined' ||
              localStorage.curRunningSeason === 'null'
            ) {
              this.sharedService
                .loginDialog('Please create a season before proceeding')
                .subscribe(() => this.router.navigateByUrl('/seasons'));
            }
          } else {
            k++;
          }
        }
        if (k === e.data.length) {
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
      let url = '&searchBy=name&values=';
      if (this.buttontext === 'Show Active') {
        url = '&active=false&searchBy=name&values=';
      }
      this.teamsService
        .getTeamListfilter(
          this.curSelectClub,

          url + value
        )
        .then((res: any) => {
          const newres = res.data.map(prop => {
            let t: any = { fname: '', lname: '' };
            if (prop.team_rep) {
              for (let i = 0; i < prop.team_rep.profile_fields.length; i++) {
                if (prop.team_rep.profile_fields[i].field) {
                  if (
                    prop.team_rep.profile_fields[i].field.name === 'first_name'
                  ) {
                    t.fname = prop.team_rep.profile_fields[i].value;
                  }
                  if (
                    prop.team_rep.profile_fields[i].field.name === 'last_name'
                  ) {
                    t.lname = prop.team_rep.profile_fields[i].value;
                  }
                }
              }
              t = t.fname + ' ' + t.lname;
            } else if (!prop.team_rep) {
              t = '';
            }
            let a: any = {
              fname: '',
              lname: ''
            };
            if (prop.assistant_coach) {
              for (
                let i = 0;
                i < prop.assistant_coach.profile_fields.length;
                i++
              ) {
                if (prop.assistant_coach.profile_fields[i].field) {
                  if (
                    prop.assistant_coach.profile_fields[i].field.name === 'first_name'
                  ) {
                    a.fname = prop.assistant_coach.profile_fields[i].value;
                  }
                  if (
                    prop.assistant_coach.profile_fields[i].field.name === 'last_name'
                  ) {
                    a.lname = prop.assistant_coach.profile_fields[i].value;
                  }
                }
              }
              a = a.fname + ' ' + a.lname;
            } else if (!prop.assistant_coach) {
              a = '';
            }
            let hfname = '',
              hlname = '';
            if (prop.head_coach) {
              for (let i = 0; i < prop.head_coach.profile_fields.length; i++) {
                if (prop.head_coach.profile_fields[i].field) {
                  if (
                    prop.head_coach.profile_fields[i].field.name === 'first_name'
                  ) {
                    hfname = prop.head_coach.profile_fields[i].value;
                  }
                  if (
                    prop.head_coach.profile_fields[i].field.name === 'last_name'
                  ) {
                    hlname = prop.head_coach.profile_fields[i].value;
                  }
                }
              }
            }

            let status1;
            if (prop.active) {
              status1 = 'ACTIVE';
            } else {
              status1 = 'INACTIVE';
            }

            return {
              ...prop,
              status: status1,
              head_coach: hfname + ' ' + hlname,
              team_rep: t,

              assistant_coach: a
            };
          });

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

        if (this.buttontext === 'Show Inactive') {
          this.getTeams();
        } else {
          this.getAllTeams();
        }
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
    let url =
      this.curSelectClub +
      '&skip=' +
      this.skip +
      '&limit=' +
      this.limit +
      '&sort=' +
      value;
    if (this.buttontext === 'Show Active') {
      url =
        this.curSelectClub +
        '&active=false&skip=' +
        this.skip +
        '&limit=' +
        this.limit +
        '&sort=' +
        value;
    }
    this.teamsService.getTeamListSort(url).then((res: any) => {
      const newres = res.data.map(prop => {
        let t: any = { fname: '', lname: '' };
        if (prop.team_rep) {
          for (let i = 0; i < prop.team_rep.profile_fields.length; i++) {
            if (prop.team_rep.profile_fields[i].field) {
              if (prop.team_rep.profile_fields[i].field.name === 'first_name') {
                t.fname = prop.team_rep.profile_fields[i].value;
              }
              if (prop.team_rep.profile_fields[i].field.name === 'last_name') {
                t.lname = prop.team_rep.profile_fields[i].value;
              }
            }
          }
          t = t.fname + ' ' + t.lname;
        } else if (!prop.team_rep) {
          t = '';
        }
        let a: any = {
          fname: '',
          lname: ''
        };
        if (prop.assistant_coach) {
          for (let i = 0; i < prop.assistant_coach.profile_fields.length; i++) {
            if (prop.assistant_coach.profile_fields[i].field) {
              if (
                prop.assistant_coach.profile_fields[i].field.name ===                'first_name'
              ) {
                a.fname = prop.assistant_coach.profile_fields[i].value;
              }
              if (
                prop.assistant_coach.profile_fields[i].field.name === 'last_name'
              ) {
                a.lname = prop.assistant_coach.profile_fields[i].value;
              }
            }
          }
          a = a.fname + ' ' + a.lname;
        } else if (!prop.assistant_coach) {
          a = '';
        }
        let hfname = '',
          hlname = '';

        if (prop.head_coach) {
          for (let i = 0; i < prop.head_coach.profile_fields.length; i++) {
            if (prop.head_coach.profile_fields[i].field) {
              if (
                prop.head_coach.profile_fields[i].field.name === 'first_name'
              ) {
                hfname = prop.head_coach.profile_fields[i].value;
              }
              if (prop.head_coach.profile_fields[i].field.name === 'last_name') {
                hlname = prop.head_coach.profile_fields[i].value;
              }
            }
          }
        }

        let status1;
        if (prop.active) {
          status1 = 'ACTIVE';
        } else {
          status1 = 'INACTIVE';
        }

        return {
          ...prop,
          status: status1,
          head_coach: hfname + ' ' + hlname,
          team_rep: t,

          assistant_coach: a
        };
      });

      this.tabledata = newres;

      res.data = this.tabledata;

      data = res;

      this.dataSource.data = data['data'];
    });
  }

  getAllTeams() {
    this.sharedService.showLoader = true;
    let credentials;
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      credentials = localStorage.super_cur_clubId;
    } else {
      credentials = localStorage.club_id;
    }
    let data;

    this.teamsService
      .getAllTeamList(credentials,  this.skip, this.limit)
      .then((res: any) => {
        const newres = res.data.map(prop => {
          let t: any = { fname: '', lname: '' };
          if (prop.team_rep) {
            for (let i = 0; i < prop.team_rep.profile_fields.length; i++) {
              if (prop.team_rep.profile_fields[i].field) {
                if (
                  prop.team_rep.profile_fields[i].field.name === 'first_name'
                ) {
                  t.fname = prop.team_rep.profile_fields[i].value;
                }
                if (prop.team_rep.profile_fields[i].field.name === 'last_name') {
                  t.lname = prop.team_rep.profile_fields[i].value;
                }
              }
            }
            t = t.fname + ' ' + t.lname;
          } else if (!prop.team_rep) {
            t = '';
          }
          let a: any = {
            fname: '',
            lname: ''
          };
          if (prop.assistant_coach) {
            for (
              let i = 0;
              i < prop.assistant_coach.profile_fields.length;
              i++
            ) {
              if (prop.assistant_coach.profile_fields[i].field) {
                if (
                  prop.assistant_coach.profile_fields[i].field.name ===                  'first_name'
                ) {
                  a.fname = prop.assistant_coach.profile_fields[i].value;
                }
                if (
                  prop.assistant_coach.profile_fields[i].field.name ===                  'last_name'
                ) {
                  a.lname = prop.assistant_coach.profile_fields[i].value;
                }
              }
            }
            a = a.fname + ' ' + a.lname;
          } else if (!prop.assistant_coach) {
            a = '';
          }
          let hfname = '',
            hlname = '';

          if (prop.head_coach) {
            for (let i = 0; i < prop.head_coach.profile_fields.length; i++) {
              if (prop.head_coach.profile_fields[i].field) {
                if (
                  prop.head_coach.profile_fields[i].field.name === 'first_name'
                ) {
                  hfname = prop.head_coach.profile_fields[i].value;
                }
                if (
                  prop.head_coach.profile_fields[i].field.name === 'last_name'
                ) {
                  hlname = prop.head_coach.profile_fields[i].value;
                }
              }
            }
          }

          let status1;
          if (prop.active) {
            status1 = 'ACTIVE';
          } else {
            status1 = 'INACTIVE';
          }

          return {
            ...prop,
            status: status1,
            head_coach: hfname + ' ' + hlname,
            team_rep: t,

            assistant_coach: a
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;
        this.dataSource.data = data['data'];
        if (this.totalLength === 0 || this.totalLength !== res['pagination']) {
          this.totalLength = data['pagination'];
        }

        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  getTeams() {
    this.sharedService.showLoader = true;
    let credentials;
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      credentials = localStorage.super_cur_clubId;
    } else {
      credentials = localStorage.club_id;
    }
    let data;
    this.teamsService
      .getTeamList(credentials, this.skip, this.limit)
      .then((res: any) => {
        const newres = res.data.map(prop => {
          let t: any = { fname: '', lname: '' };
          if (prop.team_rep) {
            for (let i = 0; i < prop.team_rep.profile_fields.length; i++) {
              if (prop.team_rep.profile_fields[i].field) {
                if (
                  prop.team_rep.profile_fields[i].field.name === 'first_name'
                ) {
                  t.fname = prop.team_rep.profile_fields[i].value;
                }
                if (prop.team_rep.profile_fields[i].field.name === 'last_name') {
                  t.lname = prop.team_rep.profile_fields[i].value;
                }
              }
            }
            t = t.fname + ' ' + t.lname;
          } else if (!prop.team_rep) {
            t = '';
          }
          let a: any = {
            fname: '',
            lname: ''
          };
          if (prop.assistant_coach) {
            for (
              let i = 0;
              i < prop.assistant_coach.profile_fields.length;
              i++
            ) {
              if (prop.assistant_coach.profile_fields[i].field) {
                if (
                  prop.assistant_coach.profile_fields[i].field.name ===                  'first_name'
                ) {
                  a.fname = prop.assistant_coach.profile_fields[i].value;
                }
                if (
                  prop.assistant_coach.profile_fields[i].field.name ===                  'last_name'
                ) {
                  a.lname = prop.assistant_coach.profile_fields[i].value;
                }
              }
            }
            a = a.fname + ' ' + a.lname;
          } else if (!prop.assistant_coach) {
            a = '';
          }
          let hfname = '',
            hlname = '';

          if (prop.head_coach) {
            for (let i = 0; i < prop.head_coach.profile_fields.length; i++) {
              if (prop.head_coach.profile_fields[i].field) {
                if (
                  prop.head_coach.profile_fields[i].field.name === 'first_name'
                ) {
                  hfname = prop.head_coach.profile_fields[i].value;
                }
                if (
                  prop.head_coach.profile_fields[i].field.name === 'last_name'
                ) {
                  hlname = prop.head_coach.profile_fields[i].value;
                }
              }
            }
          }
          let status1;
          if (prop.active === true) {
            status1 = 'ACTIVE';
          } else {
            status1 = 'INACTIVE';
          }

          return {
            ...prop,
            status: status1,
            head_coach: hfname + ' ' + hlname,
            team_rep: t,

            assistant_coach: a
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;
        this.dataSource.data = data['data'];
        if (this.totalLength === 0 || this.totalLength !== res['pagination']) {
          this.totalLength = data['pagination'];
        }

        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  editTeam(row: any) {
    this.router.navigate(['teams/edit/{{row._id}}'], {
      queryParams: { teamId: row._id }
    });
  }

  deleteTeam(row: any) {
    this.sharedService.showLoader = true;
    let a: any = {
      active: !row.active
    };
    this.teamsService.removeTeam(row._id, a).then((e: any) => {
      this.sharedService.showLoader = false;
      this.getTeams();
      this.buttontext = 'Show Inactive';
      this.sharedService.showMessage('Team deleted successfully');
    });
  }
  getStatus(status: boolean) {
    if (status) {
      return 'ACTIVE';
    } else {
      return 'INACTIVE';
    }
  }
  openDialog() {}

  dropdownChange(e: any) {
    localStorage.super_cur_club = e.value;
    this.getTeams();
  }
  ShowAll(event: any) {
    if (this.buttontext === 'Show Inactive') {
      this.getAllTeams();
      this.buttontext = 'Show Active';
    } else {
      this.buttontext = 'Show Inactive';
      this.getTeams();
    }
  }
}
