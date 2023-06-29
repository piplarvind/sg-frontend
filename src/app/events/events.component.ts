import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventsService } from '@app/events/events.service';
import { SharedService } from '@app/shared/shared.service';
import { SeasonsService } from '@app/seasons/seasons.service';

import * as moment from 'moment';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  keyup: boolean = false;
  eventsList: Array<any> = [];
  user_role: any;

  hashedId: any = 'tg_wehsVbUNydLP';
  curclub: String;
  eventLocation: string;
  dataSource = new MatTableDataSource();
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  displayedColumns: any = [
    'name',
    'event_type',
    'start_date',
    'location',
    'team',
    'Actions'
  ];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public sharedService: SharedService,
    private eventService: EventsService,
    public seasonService: SeasonsService
  ) {}

  ngOnInit() {
    this.user_role = localStorage.user_role;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.curclub = localStorage.super_cur_clubId;
    } else {
      this.curclub = localStorage.club_id;
    }
    if (this.curclub) {
      // this.getAllEvents();
      this.getSeasons();
    }
    if (!this.curclub) {
      this.sharedService
        .loginDialog('Please select sport & club from header')
        .subscribe(() => this.router.navigateByUrl('/home'));
    }
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
      this.eventService
        .getSortFilterEvent(this.curclub, '&searchBy=name&values=' + value)
        .then((res: any) => {
          // Date date2 = sdf.parse("2010-01-31");
          // this.dataSource.data = e.data.reverse();
          const newres = res.data.map(prop => {
            // if (prop.start_date) {
            //   prop.start_date = prop.start_date.split('T')[0];
            //   // var date = prop.start_date.split('T')[0];
            //   // prop.start_date = moment(date).format('MM/DD/YYYY');
            // }
            let location1;
            if (prop.location) {
              location1 = prop.location.address_line_1;
            }
            if (!prop.home_team) {
              return {
                ...prop,
                location: location1,
                event_type: prop.event_type.event_type
              };
            }
            return {
              ...prop,
              location: location1,

              team: prop.home_team.name + ' Vs ' + prop.opponent_team.name,
              event_type: prop.event_type.event_type
            };
          });
          // this.tabledata = this.tabledata.concat(newres);
          this.tabledata = newres;

          res.data = this.tabledata;

          data = res;
          // this.totalLength = res.pagination;
          // setTimeout(() => {
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

        this.getAllEvents();
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
    this.eventService
      .getSortEvent(this.curclub, this.skip, this.limit, value)
      .then((res: any) => {
        const newres = res.data.map(prop => {
          // if (prop.start_date) {
          //   prop.start_date = prop.start_date.split('T')[0];
          //   // var date = prop.start_date.split('T')[0];

          //   // prop.start_date = moment(date).format('MM/DD/YYYY');
          // }
          let location1;
          if (prop.location) {
            location1 = prop.location.address_line_1;
          }
          if (!prop.home_team) {
            return {
              ...prop,
              location: location1,
              event_type: prop.event_type.event_type
            };
          }
          return {
            ...prop,
            location: location1,

            team: prop.home_team.name + ' Vs ' + prop.opponent_team.name,
            event_type: prop.event_type.event_type
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data['data'];
      });
  }
  openDialog() {}
  getSeasons() {
    this.sharedService.showLoader = true;
    this.seasonService
      .getSeasonList(this.curclub)
      .then((e: any) => {
        if (!e.data.length) {
          this.sharedService
            .loginDialog('Please create a season before proceeding')
            .subscribe(() => this.router.navigateByUrl('/seasons'));
        }
        for (let i = 0; i < e.data.length; i++) {
          if (e.data[i].status === 1) {
            localStorage.curRunningSeason = JSON.stringify(e.data[i]);

            this.getAllEvents();
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

  checkDate(startDate: Date) {
    let d2 = new Date(startDate);
    let d1 = new Date();
    return d2 >= d1 ? false : true;
  }

  getAllEvents() {
    this.sharedService.showLoader = true;
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.curclub = localStorage.super_cur_clubId;
    } else {
      this.curclub = localStorage.club_id;
    }
    let data;
    this.eventService
      .getEventList(this.curclub, this.skip, this.limit)
      .then((res: any) => {
        const newres = res.data.map(prop => {
          // if (prop.start_date) {
          //   prop.start_date = prop.start_date.split('T')[0];
          //   // var date = prop.start_date.split('T')[0];

          //   // prop.start_date = moment(date).format('MM/DD/YYYY');
          // }
          let location1;
          if (prop.location) {
            location1 = prop.location.address_line_1;
          }
          if (!prop.home_team) {
            return {
              ...prop,
              location: location1,
              event_type: prop.event_type.event_type
            };
          }
          return {
            ...prop,
            location: location1,

            team: prop.home_team.name + ' Vs ' + prop.opponent_team.name,
            event_type: prop.event_type.event_type
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
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  editEvent(row: any) {
    this.router.navigate(['events/edit/{{row._id}}'], {
      queryParams: { eventId: row._id }
    });
  }

  deleteEvent(row: any) {
    this.sharedService
      .showDialog('Are you sure you want to delete this Event?')
      .subscribe(response => {
        if (response !== '') {
          this.sharedService.showLoader = true;
          const temp = row;
          temp.clubId = this.curclub;
          // temp.hashedId = 'tg_wehsVbUNydLP';
          this.eventService
            .removeEvent(temp)
            .then((e: any) => {
              this.sharedService.showLoader = false;
              this.sharedService.showMessage('Event deleted successfully ');
              this.getAllEvents();
            })
            .catch((err: any) => {
              this.router.navigate(['events']);
              this.sharedService.showLoader = false;
              this.sharedService.showMessage("Event can't be  deleted");
              console.log(err);
            });
        }
      });
  }

  currentEventData(updateStats: any, clubid: any) {
    updateStats.clubId = clubid;
    this.eventService.curEvent = updateStats;
    sessionStorage.curClub = JSON.stringify(updateStats);
    this.router.navigate(['events/stats']);
  }
}
