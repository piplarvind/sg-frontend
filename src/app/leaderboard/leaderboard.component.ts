import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewContainerRef
} from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { take } from 'rxjs/operators';
import { EventsService } from '@app/events/events.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  eventsList: Array<any>;

  hashedId: any = 'tg_wehsVbUNydLP';
  dataSource = new MatTableDataSource();
  displayedColumns: any = [
    'eventName',
    'eventDate',
    'location',
    'totalteams',
    'eventTime',
    'Actions'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    vcr: ViewContainerRef,
    private eventService: EventsService
  ) {}

  ngOnInit() {
    const temp = {
      hashedId: this.hashedId
    };
    this.eventService
      .getEventList(temp, '', '')
      .then((e: any) => {
        this.dataSource.data = e.obj.reverse();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
  editEvent(row: any) {
    // this.eventService.curEvent = row;
    // this.router.navigateByUrl('/events/edit');
  }
  openDialog() {}
  deleteEvent(row: any) {
    // const temp = row;
    // temp.hashedId = 'tg_wehsVbUNydLP';
    // this.eventService.removeEvent(temp)
    //   .then((e: any) => {
    //     console.log(e);
    //   }).catch((err: any) => {
    //     console.log(err);
    //   });
  }
}
