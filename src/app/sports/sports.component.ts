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
import { MatPaginatorModule } from '@angular/material/paginator';
import { take } from 'rxjs/operators';
import { SportsService } from '@app/sports/sports.service';
import { SharedService } from '@app/shared/shared.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent implements OnInit, AfterViewInit {
  keyup: boolean = false;
  editSportData: any = {};
  buttontext: any;
  active: any = false;
  fetchAll: Boolean;
  sportId: any;
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
    'sport_name',
    'order',
    'created_at',
    'createdBy',
    'active',
    'Actions'
  ];
  user_role: any;
  @ViewChild(MatPaginatorModule)
  paginator: MatPaginatorModule;
  @ViewChild(MatSort)
  sort: MatSort;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    vcr: ViewContainerRef,
    public sportService: SportsService,
    public sharedService: SharedService,
    public activateRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.buttontext = 'Show Inactive';
    this.user_role = localStorage.user_role;
    this.getActiveSports();
    // this.getAllSports();

    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.sportId = localStorage.super_cur_sport;
      const season = localStorage.curRunningSeason;
    } else {
      this.sportId = localStorage.dbName;
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
    this.sportService.getSortedSport(url).then((res: any) => {
      data = res;
      this.dataSource.data = data['data'];
      this.tabledataloaded = true;
    });
  }

  ngAfterViewInit() { }
  
  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      value = value.split(' ').join('_');
      let url = '?searchBy=sport_name&values=';
      if (this.buttontext === 'Show Active') {
        url = '?active=false&searchBy=sport_name&values=';
      }

      let data;
      this.sportService.getfilterSport(url + value).then((res: any) => {
        data = res;

        this.dataSource.data = data['data'];

        this.tabledataloaded = true;
      });
    } else {
      this.keyup = true;
    }
  };
  
  getActiveSports() {
    this.sharedService.showLoader = true;
    const hashedId = localStorage.dbName;

    this.sportService
      .getSportList1(this.skip, this.limit)
      .then((res: any) => {
        this.dataSource.data = res['data'];
        if (this.totalLength === 0 || this.totalLength !== res['pagination']) {
          this.totalLength = res['pagination'];
        }
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {});
  }

  changePage(event:any) {
    if (
      this.totalLength > this.dataSource.data.length ||
      event.pageSize !== this.limit
    ) {
      if (this.pageIndex <= event.pageIndex) {
        // next page
        this.limit = event.pageSize;
        this.skip = event.pageIndex * this.limit;

        if (this.buttontext === 'Show Inactive') {
          this.getActiveSports();
        } else {
          this.getAllSports();
        }
      }
    }
  }
  getAllSports() {
    this.sharedService.showLoader = true;
    const hashedId = localStorage.dbName;

    this.sportService
      .getAllSportList(this.skip, this.limit)
      .then((res: any) => {
        this.dataSource.data = res['data'];
        if (this.totalLength === 0 || this.totalLength !== res['pagination']) {
          this.totalLength = res['pagination'];
        }

        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {});
  }
  editSport(row: any) {
    this.router.navigate(['sports/edit/{{row._id}}'], {
      queryParams: { editSportId: row._id }
    });
  }
  
  chnageSportStatus(event: MatSlideToggleChange, row: any) {
    const originalValue = row.active;
    this.sharedService
      .showDialog('Are you sure you want to change this sport status?')
      .subscribe(response => {
        if (response !== '') {
          this.sharedService.showLoader = true;
          // const reqObj = {
          //   active: !row.active
          // };
          let reqObj = {
            active: row.active
          };
          this.sportService.updateSport(row._id, reqObj).then((e: any) => {
            this.sharedService.showLoader = false;
            // if (row.active) {
            //   this.getAllSports();
            //   this.buttontext = 'Show Inactive';
            // } else {
            //   this.getActiveSports();
            //   this.buttontext = 'Show Active';
            // }
            this.sharedService.showMessage(e.message);
          });
        }
      });
  }

  deleteSport(row: any) {
    this.sharedService
      .showDialog('Are you sure you want to delete this sport?')
      .subscribe(response => {
        if (response !== '') {
          this.sharedService.showLoader = true;
          const reqObj = {
            active: !row.active
          };
          this.sportService.removeSport(row._id, reqObj).then((e: any) => {
            this.sharedService.showLoader = false;
            this.getAllSports();
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
      this.getAllSports();
    } else {
      this.getActiveSports();
      this.buttontext = 'Show Inactive';
    }
  }
}
