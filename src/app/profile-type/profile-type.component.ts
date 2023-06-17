import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProfileTypeService } from './profile-type.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-profile-type',
  templateUrl: './profile-type.component.html',
  styleUrls: ['./profile-type.component.scss']
})
export class ProfileTypeComponent implements OnInit {
  keyup: boolean = false;
  dataSource = new MatTableDataSource();

  displayedColumns: any = [
    'name',
    'description',
    'order',
    'priority',
    'abbr',
    'Actions'
  ];
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
    public ProfileTypeService: ProfileTypeService,
    public sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllProfile();
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
      this.ProfileTypeService.getFilterProfileType(
        '?searchBy=name&values=' + value
      ).then((res: any) => {
        // this.tabledata = this.tabledata.concat(newres);
        // this.tabledata = newres;
        // console.log('this.table============++++', this.tabledata);
        // // this.tabledata.length = res.pagination;
        // // this.paginator.length = res.pagination;
        // // this.tabledata = newres;
        // res.data = this.tabledata;

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

        this.getAllProfile();
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
    this.ProfileTypeService.getSortedProfileType(
      this.skip,
      this.limit,
      value
    ).then((res: any) => {
      data = res;

      this.dataSource.data = data['data'];
    });
  }

  editProfiles(row: any) {
    this.router.navigate(['profile_type/edit/{{row._id}}'], {
      queryParams: { profileId: row._id }
    });
  }
  getAllProfile() {
    this.sharedService.showLoader = true;

    this.ProfileTypeService.getTypes(this.skip, this.limit).then(
      (res: any) => {
        this.dataSource.data = res['data'];
        if (this.totalLength === 0) {
          this.totalLength = res['pagination'];
        }

        this.sharedService.showLoader = false;
      },
      (err: any) => {
        console.log('error', err);
      }
    );
  }
}
