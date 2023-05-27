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
import { CategoryService } from '@app/estore-categories/category.service';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-estore-categories',
  templateUrl: './estore-categories.component.html',
  styleUrls: ['./estore-categories.component.scss']
})
export class EstoreCategoriesComponent implements OnInit, AfterViewInit {
  keyup: boolean = false;
  curClub: any;
  dataSource = new MatTableDataSource();
  displayedColumns: any = [
    'name',
    'size_group',
    'createdAt',
    'createdBy',
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
    private router: Router,
    public dialog: MatDialog,
    private categoryService: CategoryService,
    private sharedService: SharedService
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
      this.getAllCategories();
    }
  }

  ngAfterViewInit() {}
  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      value = value.split(' ').join('_');
      let data;
      this.categoryService
        .getFilterecategory(this.curClub, '&searchBy=name&values=' + value)
        .then((res: any) => {
          const newres = res.data.map(prop => {
            let fname = '',
              lname = '';

            if (prop.createdBy) {
              for (let i = 0; i < prop.createdBy.profile_fields.length; i++) {
                if (prop.createdBy.profile_fields[i].field) {
                  if (
                    prop.createdBy.profile_fields[i].field.name === 'first_name'
                  ) {
                    fname = prop.createdBy.profile_fields[i].value;
                  }
                  if (
                    prop.createdBy.profile_fields[i].field.name === 'last_name'
                  ) {
                    lname = prop.createdBy.profile_fields[i].value;
                  }
                }
              }
            }

            return {
              ...prop,
              size_group: prop.size_group ? prop.size_group.group_name : '',
              createdAt: prop.createdAt.split('T')[0],
              createdBy: fname + ' ' + lname
            };
          });

          this.tabledata = newres;

          res.data = this.tabledata;

          data = res;

          console.log(" data['data']", data['data']);
          this.dataSource.data = data['data'];
        });
    } else {
      this.keyup = false;
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

        this.getAllCategories();
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
    this.categoryService
      .getSorteCategory(this.curClub, this.skip, this.limit, value)
      .then((res: any) => {
        const newres = res.data.map(prop => {
          let fname = '',
            lname = '';

          if (prop.createdBy) {
            for (let i = 0; i < prop.createdBy.profile_fields.length; i++) {
              if (prop.createdBy.profile_fields[i].field) {
                if (
                  prop.createdBy.profile_fields[i].field.name === 'first_name'
                ) {
                  fname = prop.createdBy.profile_fields[i].value;
                }
                if (
                  prop.createdBy.profile_fields[i].field.name === 'last_name'
                ) {
                  lname = prop.createdBy.profile_fields[i].value;
                }
              }
            }
          }

          return {
            ...prop,
            size_group: prop.size_group ? prop.size_group.group_name : '',
            createdAt: prop.createdAt.split('T')[0],
            createdBy: fname + ' ' + lname
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data['data'];
      });
  }
  getAllCategories() {
    this.sharedService.showLoader = true;
    let data;
    this.categoryService
      .getCategories(this.curClub, this.skip, this.limit)
      .then((res: any) => {
        // this.dataSource.data = res.data.reverse();
        const newres = res.data.map(prop => {
          let fname = '',
            lname = '';

          if (prop.createdBy) {
            for (let i = 0; i < prop.createdBy.profile_fields.length; i++) {
              if (prop.createdBy.profile_fields[i].field) {
                if (
                  prop.createdBy.profile_fields[i].field.name === 'first_name'
                ) {
                  fname = prop.createdBy.profile_fields[i].value;
                }
                if (
                  prop.createdBy.profile_fields[i].field.name === 'last_name'
                ) {
                  lname = prop.createdBy.profile_fields[i].value;
                }
              }
            }
          }

          return {
            ...prop,
            size_group: prop.size_group ? prop.size_group.group_name : '',
            createdAt: prop.createdAt.split('T')[0],
            createdBy: fname + ' ' + lname
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

  editCategory(row: any) {
    this.router.navigate(['category/edit/{{row._id}}'], {
      queryParams: { categoryId: row._id }
    });
  }

  deleteCategory(rowdata: any) {
    this.sharedService.showLoader = true;
    const temp = {
      clubId: this.curClub,
      active: false
    };
    this.categoryService
      .deleteCategory(rowdata, temp)
      .then((e: any) => {
        this.getAllCategories();
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('Category deleted successfully');
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
