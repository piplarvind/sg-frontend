import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewContainerRef
} from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { ClubsService } from '@app/clubs/clubs.service';
import { SharedService } from '@app/shared/shared.service';
@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent implements OnInit, AfterViewInit {
  keyup: boolean = false;
  editClubData: any = {};
  buttontext: any;
  active: any = false;
  fetchAll: Boolean;
  clubId: any;
  activeRouteSubscriber: any;
  // status: Boolean;
  tabledataloaded: boolean = false;
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  dataSource = new MatTableDataSource();
  displayedColumns: any = [
    'club_name',
    // 'mobile_phone',
    'sport',
    'website',
    'created_at',
    'createdBy',
    // 'validity',
    'active',
    'Actions'
  ];
  user_role: any;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    vcr: ViewContainerRef,
    public clubService: ClubsService,
    public sharedService: SharedService,
    public activateRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.buttontext = 'Show Inactive';
    this.user_role = localStorage.user_role;
    this.getActiveClubs();
    // this.getAllClubs();

    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.clubId = localStorage.super_cur_club;
      const season = localStorage.curRunningSeason;
    } else {
      this.clubId = localStorage.dbName;
    }
  }
  namesort(event) {
    let value;
    if (event.direction === 'desc') {
      value = '-' + event.active;
    } else {
      value = event.active;
    }

    let url = '?skip=' + this.skip + '&limit=' + this.limit + '&sort=' + value;
    if (this.buttontext === 'Show Active') {
      url =
        '?active=false&skip=' +
        this.skip +
        '&limit=' +
        this.limit +
        '&sort=' +
        value;
    }
    let data;
    this.clubService.getSortedClub(url).then((res: any) => {
      data = res;
      // this.totalLength = res.pagination;
      // setTimeout(() => {

      this.dataSource.data = data['data'];

      this.tabledataloaded = true;
    });
  }
  ngAfterViewInit() {}
  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      value = value.split(' ').join('_');
      let url = '?searchBy=club_name&values=';
      if (this.buttontext === 'Show Active') {
        url = '?active=false&searchBy=club_name&values=';
      }

      let data;
      this.clubService.getfilterClub(url + value).then((res: any) => {
        data = res;

        this.dataSource.data = data['data'];

        this.tabledataloaded = true;
      });
    } else {
      this.keyup = true;
    }
  };
  getActiveClubs() {
    this.sharedService.showLoader = true;
    const hashedId = localStorage.dbName;

    this.clubService
      .getClubList1(this.skip, this.limit)
      .then((res: any) => {
        this.dataSource.data = res['data'];
        if (this.totalLength === 0 || this.totalLength !== res['pagination']) {
          this.totalLength = res['pagination'];
        }

        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {});
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
        this.getAllClubs();        
      }
    }
  }
  getAllClubs() {
    this.sharedService.showLoader = true;
    const hashedId = localStorage.dbName;

    this.clubService
      .getAllClubList(this.skip, this.limit)
      .then((res: any) => {
        this.dataSource.data = res['data'];
        if (this.totalLength === 0 || this.totalLength !== res['pagination']) {
          this.totalLength = res['pagination'];
        }

        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {});
  }
  editClub(row: any) {
    this.router.navigate(['clubs/edit/{{row._id}}'], {
      queryParams: { editClubId: row._id }
    });
  }
  deleteClub(row: any) {
    this.sharedService
      .showDialog('Are you sure you want to delete this club?')
      .subscribe(response => {
        if (response !== '') {
          this.sharedService.showLoader = true;
          const reqObj = {
            active: !row.active
          };
          this.clubService.removeClub(row._id, reqObj).then((e: any) => {
            this.sharedService.showLoader = false;
            this.getAllClubs();
            this.buttontext = 'Show Inactive';
            this.sharedService.showMessage(e.message);
          });
        }
      });
  }

  openDialog() {}

  getStatus(status: boolean) {
    if (status) {
      return 'ACTIVE';
    } else {
      return 'INACTIVE';
    }
  }
  ShowAll(event: any) {
    if (this.buttontext === 'Show Inactive') {
      this.buttontext = 'Show Active';

      this.getAllClubs();
    } else {
      this.getActiveClubs();
      this.buttontext = 'Show Inactive';
    }
  }
}
