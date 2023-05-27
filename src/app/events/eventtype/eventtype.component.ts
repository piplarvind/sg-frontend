import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';
import { SharedService } from '@app/shared/shared.service';
@Component({
  selector: 'app-eventtype',
  templateUrl: './eventtype.component.html',
  styleUrls: ['./eventtype.component.scss']
})
export class EventtypeComponent implements OnInit {
  keyup: boolean = false;
  dataSource = new MatTableDataSource();
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  displayedColumns: any = ['event_type', 'created_by', 'created_at', 'Actions'];
  curclub: string;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private eventService: EventsService,
    private router: Router,
    public dialog: MatDialog,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.curclub = localStorage.super_cur_clubId;
    } else {
      this.curclub = localStorage.club_id;
    }
    if (this.curclub) {
      this.getEventType();
      // this.getAllEvents();
      // this.getSeasons();
    }
    if (!this.curclub) {
      this.sharedService
        .loginDialog('Select the club')
        .subscribe(() => this.router.navigateByUrl('/home'));
    }
  }

  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      value = value.split(' ').join('_');
      value = value.split(' ').join('_');
      let data;
      this.eventService
        .getSortFilterEventtype(
          this.curclub,
          '&searchBy=event_type&values=' + value
        )
        .then((res: any) => {
          const newres = res.data.map(prop => {
            let name: any = '';
            if (prop.created_by) {
              for (let i = 0; i < prop.created_by.profile_fields.length; i++) {
                if (prop.created_by.profile_fields[i].field) {
                  if (
                    prop.created_by.profile_fields[i].field.name === 'first_name'
                  ) {
                    name.fname = prop.created_by.profile_fields[i].value;
                  }
                  if (
                    prop.created_by.profile_fields[i].field.name === 'last_name'
                  ) {
                    name.lname = prop.created_by.profile_fields[i].value;
                  }
                }
              }
            }

            return {
              ...prop,
              created_by: name,
              created_at: prop.created_at,

              event_type: prop.event_type
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
    } else {
      this.keyup = true;
    }
  };
  namesort(event) {
    let data;
    let value;
    if (event.direction === 'desc') {
      value = '-' + event.active;
    } else {
      value = event.active;
    }
    this.eventService
      .getSortEventtype(this.curclub, this.skip, this.limit, value)
      .then((res: any) => {
        const newres = res.data.map(prop => {
          let name: any = '';
          if (prop.created_by) {
            for (let i = 0; i < prop.created_by.profile_fields.length; i++) {
              if (prop.created_by.profile_fields[i].field) {
                if (
                  prop.created_by.profile_fields[i].field.name === 'first_name'
                ) {
                  name.fname = prop.created_by.profile_fields[i].value;
                }
                if (
                  prop.created_by.profile_fields[i].field.name === 'last_name'
                ) {
                  name.lname = prop.created_by.profile_fields[i].value;
                }
              }
            }
          }

          return {
            ...prop,
            created_by: name,
            created_at: prop.created_at,

            event_type: prop.event_type
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
  getEventType() {
    let data;
    this.eventService
      .getAlleventType(this.curclub, this.skip, this.limit)
      .then((res: any) => {
        for (let i = 0; i < res.data.length; i++) {}

        const newres = res.data.map(prop => {
          let name: any = '';
          if (prop.created_by) {
            for (let i = 0; i < prop.created_by.profile_fields.length; i++) {
              if (prop.created_by.profile_fields[i].field) {
                if (
                  prop.created_by.profile_fields[i].field.name === 'first_name'
                ) {
                  name.fname = prop.created_by.profile_fields[i].value;
                }
                if (
                  prop.created_by.profile_fields[i].field.name === 'last_name'
                ) {
                  name.lname = prop.created_by.profile_fields[i].value;
                }
              }
            }
          }

          return {
            ...prop,
            created_by: name,
            created_at: prop.created_at,

            event_type: prop.event_type
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
  editEventType(row) {
    if (row.is_editable === true) {
      this.router.navigate(['event/eventtype/editeventtype/{{row._id}}'], {
        queryParams: { eventId: row._id }
      });
    } else {
      event.preventDefault();
    }
  }
}
