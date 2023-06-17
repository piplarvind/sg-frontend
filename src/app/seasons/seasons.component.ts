import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewContainerRef
} from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { SeasonsService } from '@app/seasons/seasons.service';
import { SharedService } from '@app/shared/shared.service';
import * as moment from 'moment';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit, AfterViewInit {
  keyup: boolean = false;
  eventsList: Array<any>;
  hashedId: any = 'tg_wehsVbUNydLP';
  curClub: any;
  dataSource = new MatTableDataSource();
  displayedColumns: any = ['season_name', 'start_date', 'end_date', 'Actions'];
  seasonYetToStart: Boolean;
  seasonInProgress: Boolean;
  endOfSeason: Boolean;
  startD: any;
  currentSeason: any;
  currentSeasonId: any;
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
    public sharedService: SharedService,
    public dialog: MatDialog,
    vcr: ViewContainerRef,
    private seasonService: SeasonsService
  ) {}

  ngOnInit() {
    const temp = {
      hashedId: this.hashedId
    };
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.curClub = localStorage.super_cur_clubId;
    } else {
      this.curClub = localStorage.club_id;
    }
    if (!this.curClub) {
      this.sharedService
        .loginDialog('Select the club')
        .subscribe(() => this.router.navigateByUrl('/home'));
    }
    this.getSeasons();
  }
  ngAfterViewInit() {}
  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      value = value.split(' ').join('_');
      let data;
      this.seasonService
        .getfilterseason(this.curClub, '&searchBy=season_name&values=' + value)
        .then((e: any) => {
          const newres = e.data.map(prop => {
            if (prop.start_date) {
              // var date = prop.start_date.split('T')[0];
              prop.start_date = prop.start_date.split('T')[0];
              // prop.start_date = moment(date).format('MM/DD/YYYY');
            }
            if (prop.end_date) {
              prop.end_date = prop.end_date.split('T')[0];
              // var date = prop.end_date.split('T')[0];

              // prop.end_date = moment(date).format('MM/DD/YYYY');
            }
            // if (prop.start_date) {
            //   var date = prop.start_date.split('T')[0];

            //   prop.start_date = moment(date).format('MM/DD/YYYY');
            // }
            // if (prop.end_date) {
            //   var date = prop.end_date.split('T')[0];

            //   prop.end_date = moment(date).format('MM/DD/YYYY');
            // }
            return {
              ...prop,

              Actions: prop.status
            };
          });
          this.tabledata = newres;

          e.data = this.tabledata;

          data = e;

          this.dataSource.data = data['data'];

          for (let i = 0; i < e.data.length; i++) {
            this.currentSeason = e.data[i];
            if (e.data[i].status === 1) {
              this.currentSeasonId = e.data[i]._id;
              const date = e.data[i].start_date.split('T')[0];
              const date1 = date.split('-');
              const current_date = Date();
              console.log(current_date);
              localStorage.curRunningSeason = JSON.stringify(e.data[i]);
            }
          }
        });
    } else {
      this.keyup = true;
    }
  };
  namesort(event) {
    let value;
    if (event.direction === 'desc') {
      value = '-' + event.active;
    } else {
      value = event.active;
    }
    let data;
    this.seasonService
      .getSortedseason(this.curClub, this.skip, this.limit, value)
      .then((e: any) => {
        const newres = e.data.map(prop => {
          if (prop.start_date) {
            // var date = prop.start_date.split('T')[0];
            prop.start_date = prop.start_date.split('T')[0];
            // prop.start_date = moment(date).format('MM/DD/YYYY');
          }
          if (prop.end_date) {
            prop.end_date = prop.end_date.split('T')[0];
            // var date = prop.end_date.split('T')[0];

            // prop.end_date = moment(date).format('MM/DD/YYYY');
          }
          // if (prop.start_date) {
          //   var date = prop.start_date.split('T')[0];

          //   prop.start_date = moment(date).format('MM/DD/YYYY');
          // }
          // if (prop.end_date) {
          //   var date = prop.end_date.split('T')[0];

          //   prop.end_date = moment(date).format('MM/DD/YYYY');
          // }
          return {
            ...prop,
            // Name: prop.season_name,
            // startDate: prop.start_date,
            // endDate: prop.end_date,
            Actions: prop.status
          };
        });
        this.tabledata = newres;

        e.data = this.tabledata;

        data = e;

        this.dataSource.data = data['data'];

        for (let i = 0; i < e.data.length; i++) {
          this.currentSeason = e.data[i];
          if (e.data[i].status === 1) {
            this.currentSeasonId = e.data[i]._id;
            const date = e.data[i].start_date.split('T')[0];
            const date1 = date.split('-');
            const current_date = Date();
            localStorage.curRunningSeason = JSON.stringify(e.data[i]);
          }
        }
      });
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

        this.getSeasons();
      }
    }
  }
  getSeasons() {
    this.sharedService.showLoader = true;
    let data;
    this.seasonService
      .getSeasonList1(this.curClub, this.skip, this.limit)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        const newres = e.data.map(prop => {
          if (prop.start_date) {
            // var date = prop.start_date.split('T')[0];
            prop.start_date = prop.start_date.split('T')[0];
            // prop.start_date = moment(date).format('MM/DD/YYYY');
          }
          if (prop.end_date) {
            prop.end_date = prop.end_date.split('T')[0];
            // var date = prop.end_date.split('T')[0];

            // prop.end_date = moment(date).format('MM/DD/YYYY');
          }
          return {
            ...prop,

            Actions: prop.status
          };
        });
        this.tabledata = newres;

        e.data = this.tabledata;

        data = e;

        this.dataSource.data = data['data'];
        if (this.totalLength === 0 || this.totalLength !== data['pagination']) {
          this.totalLength = data['pagination'];
        }
        for (let i = 0; i < e.data.length; i++) {
          this.currentSeason = e.data[i];
          if (e.data[i].status === 1) {
            this.currentSeasonId = e.data[i]._id;
            const date = e.data[i].start_date.split('T')[0];
            const date1 = date.split('-');
            const current_date = Date();
            localStorage.curRunningSeason = JSON.stringify(e.data[i]);
          }
        }
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;
        console.log(err);
        // this.sharedService.loginDialog(err.error.message);
      });
  }

  deleteSeason(element) {
    this.sharedService
      .showDialog(
        'This action will delete the user permanently. Are you sure to continue?'
      )
      .subscribe(response => {
        if (response !== '') {
          this.sharedService.showLoader = true;
          this.seasonService
            .deleteSeason(element._id)
            .then((e: any) => {
              this.sharedService.showLoader = false;
              if (e.message) {
                this.sharedService.loginDialog(e.message + ' successfully');
              }
              this.getSeasons();
            })
            .catch((err: any) => {
              this.sharedService.showLoader = false;
              console.log(err);
              if (err.error.message) {
                this.sharedService.loginDialog(err.error.message);
              }
            });
        }
      });
  }
  endSeason() {}

  editEvent(row: any) {
    sessionStorage.curSeason = JSON.stringify(row);
    this.router.navigateByUrl('/seasons/edit');
  }

  deleteEvent(row: any) {
    // const temp = row;
    // temp.hashedId = 'tg_wehsVbUNydLP';
    // this.seasonService.removeEvent(temp)
    //   .then((e: any) => {
    //     console.log(e);
    //   }).catch((err: any) => {
    //     console.log(err);
    //   });
  }
}
