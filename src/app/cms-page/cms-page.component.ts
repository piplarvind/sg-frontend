import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsPageService } from './cms-page.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { SeasonsService } from '@app/seasons/seasons.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss']
})
export class CmsPageComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: any = [
    'page_title',
    'active',
    'Actions'
  ];
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  buttontext:any;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private cmsPageService: CmsPageService,
    private router: Router,
    public dialog: MatDialog,
    private sharedService: SharedService,
    public seasonService: SeasonsService
  ) { }

  ngOnInit(): void {
    this.buttontext = 'Show Inactive';
    this.getAllCMSPages();
  }

  getAllCMSPages() {
    this.sharedService.showLoader = true;
    let data;
    this.cmsPageService.allPCMSPages(this.skip, this.limit).subscribe(
      (result: any) => {
        this.sharedService.showLoader = false;
        console.log('result', result);
        const newres = result.data.map(prop => {
          let created = {
              fname: '',
              lname: ''
            },
            subscriptions_name: any = '';

          if (prop.createdBy) {
            if (prop.createdBy.profile_fields) {
              for (let i = 0; i < prop.createdBy.profile_fields.length; i++) {
                if (prop.createdBy.profile_fields[i].field) {
                  if (
                    prop.createdBy.profile_fields[i].field.name === 'first_name'
                  ) {
                    created.fname = prop.createdBy.profile_fields[i].value;
                  }
                  if (
                    prop.createdBy.profile_fields[i].field.name === 'last_name'
                  ) {
                    created.lname = prop.createdBy.profile_fields[i].value;
                  }
                }
              }
            }
          }
          
          return {
            ...prop,
            name: prop.name,
            createdBy: created.fname + ' ' + created.lname
          };
        });
        this.tabledata = newres;

        result.data = this.tabledata;

        data = result;

        this.dataSource.data = data['data'];
        if (this.totalLength === 0 || this.totalLength !== data['pagination']) {
          this.totalLength = data['pagination'];
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
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

      this.getInactiveCMSPages();
    } else {
      this.getAllCMSPages();
      this.buttontext = 'Show Inactive';
    }
  }

  getInactiveCMSPages() {
    this.sharedService.showLoader = true;
    const hashedId = localStorage.dbName;

    this.cmsPageService
      .getInactiveCMSPageList(this.skip, this.limit)
      .then((res: any) => {
        this.dataSource.data = res['data'];
        if (this.totalLength === 0 || this.totalLength !== res['pagination']) {
          this.totalLength = res['pagination'];
        }

        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {});
  }

  titleSort(event) {
    let value;
    if (event.direction === 'desc') {
      value = '-' + event.active;
    } else {
      value = event.active;
    }
    let data;
    this.cmsPageService
      .getSortedCMSPage(this.skip, this.limit, value)
      .subscribe((res: any) => {
        const newres = res.data.map(prop => {
          let created = {
              fname: '',
              lname: ''
            },
            subscriptions_name: any = '';
          if (prop.createdBy) {
            if (prop.createdBy.profile_fields) {
              for (let i = 0; i < prop.createdBy.profile_fields.length; i++) {
                if (prop.createdBy.profile_fields[i].field) {
                  if (
                    prop.createdBy.profile_fields[i].field.name === 'first_name'
                  ) {
                    created.fname = prop.createdBy.profile_fields[i].value;
                  }
                  if (
                    prop.createdBy.profile_fields[i].field.name === 'last_name'
                  ) {
                    created.lname = prop.createdBy.profile_fields[i].value;
                  }
                }
              }
            }
          }
    
          return {
            ...prop,
            name: prop.name,
            createdBy: created.fname + ' ' + created.lname
          };
        });
        this.tabledata = newres;

        // this.tabledata.length = res.pagination;
        // this.paginator.length = res.pagination;
        // this.tabledata = newres;
        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data['data'];
      });
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

        this.getAllCMSPages();
      }
    }
  }

  editCMSPage(element: any) {
    sessionStorage.selected_cms_page = JSON.stringify(element);
    this.router.navigate(['/cms-pages/edit']);
  }

  changeStatus(row:any) {
    this.sharedService
      .showDialog('Are you sure you want to change this status?')
      .subscribe(response => {
        if (response !== '') {
          this.sharedService.showLoader = true;
          const reqObj = {
            active: !row.active
          };
          this.cmsPageService.chnageStatusCMSPage(row._id, reqObj).then((e: any) => {
            this.sharedService.showLoader = false;
            this.getAllCMSPages();
            this.buttontext = 'Show Inactive';
            this.sharedService.showMessage(e.message);
          });
        }
      });
  }
}
