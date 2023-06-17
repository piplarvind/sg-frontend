import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ColorService } from '@app/estore/color.service';
import { environment } from 'environments/environment';
import { SharedService } from '@app/shared/shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-estore',
  templateUrl: './estore.component.html',
  styleUrls: ['./estore.component.scss']
})
export class EstoreComponent implements OnInit, AfterViewInit {
  keyup: boolean = false;
  curclub: any;
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
    private colorService: ColorService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.sharedService.showLoader = true;
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.curclub = localStorage.super_cur_clubId;
    } else {
      this.curclub = localStorage.club_id;
    }
    if (!this.curclub) {
      this.sharedService
        .loginDialog('Select the club')
        .subscribe(() => this.router.navigateByUrl('/home'));
    }

    if (this.curclub) {
      this.getAllColors();
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
      let valuewithout = value.split(' ').join('_');
      let data;
      this.colorService
        .getFiltereColor(this.curclub, '&searchBy=name&values=' + valuewithout)
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
        this.getAllColors();
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
    this.colorService
      .getSortecolor(this.curclub, this.skip, this.limit, value)
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
  getAllColors() {
    this.sharedService.showLoader = true;
    let data;
    this.colorService
      .getColors(this.curclub, this.skip, this.limit)
      .then((res: any) => {
        if (res.data) {
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
        }
        if (!res.data) {
          // const newres = res.data;
          // this.dataSource.data = newres.reverse();
          this.sharedService.showLoader = false;
        }
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;
      });
  }

  addColor() {
    this.router.navigateByUrl('/estore/add');
  }

  editColor(row: any) {
    this.router.navigate(['estore/edit/{{row._id}}'], {
      queryParams: { colorId: row._id }
    });

    // sessionStorage.curColor = JSON.stringify(rowData);
  }

  deleteColor(rowData: any) {
    this.sharedService.showLoader = true;
    const temp = {
      clubId: this.curclub,
      active: false
    };
    this.colorService
      .deleteColor(rowData, temp)
      .then((e: any) => {
        this.getAllColors();
        this.sharedService.showLoader = false;

        this.sharedService.showMessage('Color deleted Successfully');
      })
      .catch((err: any) => {});
  }
}
