import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { SharedService } from '@app/shared/shared.service';
import { BrandService } from '@app/estore-brand/brand.service';

@Component({
  selector: 'app-estore-brand',
  templateUrl: './estore-brand.component.html',
  styleUrls: ['./estore-brand.component.scss']
})
export class EstoreBrandComponent implements OnInit, AfterViewInit {
  keyup: boolean = true;
  curClub: any;
  dataSource = new MatTableDataSource();
  displayedColumns: any = ['name', 'createdAt', 'Actions'];
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
    public dialog: MatDialog,
    private sharedService: SharedService,
    private brandService: BrandService
  ) {}

  ngOnInit() {
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
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

    if (this.curClub) {
      this.getAllBrands();
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
      let data;
      let valuewithout = value.split(' ').join('_');
      this.brandService
        .getFiltereBrand(this.curClub, '&searchBy=name&values=' + valuewithout)
        .then((res: any) => {
          const newres = res.data.map(prop => {
            return {
              ...prop,
              createdAt: prop.createdAt.split('T')[0]
            };
          });
          // this.tabledata = this.tabledata.concat(newres);
          this.tabledata = newres;

          // this.tabledata.length = res.pagination;
          // this.paginator.length = res.pagination;
          // this.tabledata = newres;
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

        this.getAllBrands();
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
    this.brandService
      .getSorteBrand(this.curClub, this.skip, this.limit, value)
      .then((res: any) => {
        const newres = res.data.map(prop => {
          return {
            ...prop,
            createdAt: prop.createdAt.split('T')[0]
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data['data'];
      });
  }
  getAllBrands() {
    this.sharedService.showLoader = true;
    let data;
    this.brandService
      .getBrands(this.curClub, this.skip, this.limit)
      .then((res: any) => {
        // this.dataSource.data = e.data.reverse();

        const newres = res.data.map(prop => {
          return {
            ...prop,
            createdAt: prop.createdAt.split('T')[0]
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
      .catch((err: any) => {});
  }

  editBrand(row: any) {
    this.router.navigate(['brand/edit/{{row._id}}'], {
      queryParams: { brandId: row._id }
    });
  }

  deleteBrand(rowData: any) {
    this.sharedService.showLoader = true;
    const temp = {
      clubId: this.curClub,
      active: false
    };
    this.brandService
      .deleteBrand(rowData, temp)
      .then((e: any) => {
        this.getAllBrands();
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('Brand deleted Successfully');
      })
      .catch((err: any) => {});
  }
}
