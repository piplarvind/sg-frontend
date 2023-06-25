import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ClubProfileService } from './club-profile.service';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-club-profile',
  templateUrl: './club-profile.component.html',
  styleUrls: ['./club-profile.component.scss'],
  providers:[ClubProfileService]
})
export class ClubProfileComponent implements OnInit {

  keyup: boolean = false;
  dataSource = new MatTableDataSource();

  displayedColumns: any = ['title', 'active', 'Actions'];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  buttontext: any;
  user_role: any;

  constructor(
    private router: Router,
    public clubProfileService: ClubProfileService,
    public sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.buttontext = 'Show Inactive';
    this.user_role = localStorage.user_role;
    this.getAllClubProfileTitle();
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  public doFilter = (event: Event) => {
    this.sharedService.showLoader = true;
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      value = value.split(' ').join('_');
      let data;
      this.clubProfileService.getClubProfileTitleList(
        '?searchBy=label&values=' + value
      ).then((res: any) => {
        this.sharedService.showLoader = false;
        this.tabledata = res.data;
        res.data = this.tabledata;
        data = res;
        this.dataSource.data = data['data'];
        if (this.totalLength === 0) {
          this.totalLength = data['pagination'];
        }
      });
    } else {
      this.sharedService.showLoader = false;
      this.keyup = true;
    }
  }

  getAllClubProfileTitle() {
    this.sharedService.showLoader = true;
    let data;
    this.clubProfileService.getClubProfileTitleList('?',this.skip, this.limit).then(
      (res: any) => {
        this.sharedService.showLoader = false;
        
        this.tabledata = res.data;
        res.data = this.tabledata;
        data = res;
        this.dataSource.data = data['data'];
        if (this.totalLength === 0) {
          this.totalLength = data['pagination'];
        }
      },
      (err: any) => {
        console.log('error', err);
      }
    );
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
    
  }

  editClubProfileTitle(row:any) {
    this.router.navigate(['club-profiles/edit/{{row._id}}'], {
      queryParams: { editSportId: row._id }
    });
  }
  chnageStatusClubTitle(row:any) {
    this.sharedService
      .showDialog('Are you sure you want to change this club profile title status?')
      .subscribe(response => {
        if (response !== '') {
          this.sharedService.showLoader = true;
          const reqObj = {
            active: !row.active
          };
          this.clubProfileService.chnageStatusClubTitle(row._id, reqObj).then((e: any) => {
            this.sharedService.showLoader = false;
            this.getAllClubProfileTitle();
            this.buttontext = 'Show Inactive';
            this.sharedService.showMessage(e.message);
          });
        }
      });
  }
  deleteClubTitle(row:any) {
    this.sharedService
      .showDialog('Are you sure you want to delete this club profile title, operation is not reversible?')
      .subscribe(response => {
        if (response !== '') {
          this.sharedService.showLoader = true;
          const reqObj = {
            active: !row.active
          };
          this.clubProfileService.removeClubTitle(row._id, reqObj).then((e: any) => {
            this.sharedService.showLoader = false;
            this.getAllClubProfileTitle();
            this.buttontext = 'Show Inactive';
            this.sharedService.showMessage(e.message);
          });
        }
      });
  }

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

      this.getInactiveClubProfileTitle();
    } else {
      this.getAllClubProfileTitle();
      this.buttontext = 'Show Inactive';
    }
  }

  getInactiveClubProfileTitle() {
    this.sharedService.showLoader = true;
    const hashedId = localStorage.dbName;

    this.clubProfileService
      .getInactiveClubProfileTitleList(this.skip, this.limit)
      .then((res: any) => {
        this.dataSource.data = res['data'];
        if (this.totalLength === 0 || this.totalLength !== res['pagination']) {
          this.totalLength = res['pagination'];
        }

        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {});
  }

  changeStatus(row: any) {
    this.sharedService
      .showDialog('Are you sure you want to change status?')
      .subscribe(response => {
        if (response !== '') {
          this.sharedService.showLoader = true;
          const reqObj = {
            active: !row.active
          };
          this.clubProfileService.chnageStatusClubTitle(row._id, reqObj).then((e: any) => {
            this.sharedService.showLoader = false;
            this.getAllClubProfileTitle();
            this.buttontext = 'Show Inactive';
            this.sharedService.showMessage(e.message);
          });
        }
      });
  }
}
