import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PackagesService } from './packages.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { SeasonsService } from '@app/seasons/seasons.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { environment } from 'environments/environment';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit, AfterViewInit {
  keyup: boolean = false;
  dataSource = new MatTableDataSource();
  displayedColumns: any = [
    'name',
    'package_type',
    'package_amount',
    'validity_from',
    'late_pay_fee',
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
  updatedToken: any;
  curSelectClub: any;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  constructor(
    private packageService: PackagesService,
    private router: Router,
    public dialog: MatDialog,
    private sharedService: SharedService,
    public seasonService: SeasonsService
  ) {}

  ngOnInit() {
    const credentials: any = {
      clubId: ''
    };
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.curSelectClub = localStorage.super_cur_clubId;
    } else {
      this.curSelectClub = localStorage.club_id;
    }

    if (!this.curSelectClub) {
      this.sharedService
        .loginDialog('Please select sport & club from header')
        .subscribe(() => this.router.navigateByUrl('/home'));
    }
    if (this.curSelectClub) {
      // this.getAllEvents();
      this.getSeasons();
    }
  }
  getSeasons() {
    this.sharedService.showLoader = true;
    this.seasonService
      .getSeasonList(this.curSelectClub)
      .then((e: any) => {
        if (!e.data.length) {
          this.sharedService
            .loginDialog('Please create a season before proceeding')
            .subscribe(() => this.router.navigateByUrl('/seasons'));
        }
        for (let i = 0; i < e.data.length; i++) {
          if (e.data[i].status === 1) {
            localStorage.curRunningSeason = JSON.stringify(e.data[i]);
            this.getAllPlans(this.curSelectClub);
            if (
              !localStorage.curRunningSeason ||
              localStorage.curRunningSeason === 'undefined' ||
              localStorage.curRunningSeason === 'null'
            ) {
              this.sharedService
                .loginDialog('Please create a season before proceeding')
                .subscribe(() => this.router.navigateByUrl('/seasons'));
            }
          }
        }
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;
        console.log(err);
        if (err) {
          {
            this.sharedService
              .loginDialog('Please create a season before proceeding')
              .subscribe(() => this.router.navigateByUrl('/seasons'));
          }
        }
      });
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
      this.packageService
        .getfilterPackage(this.curSelectClub, '&searchBy=name&values=' + value)
        .subscribe((res: any) => {
          const newres = res.data.map(prop => {
            let created = {
                fname: '',
                lname: ''
              },
              packages_name: any = '';
            if (prop.createdBy) {
              if (prop.createdBy.profile_fields) {
                for (let i = 0; i < prop.createdBy.profile_fields.length; i++) {
                  if (prop.createdBy.profile_fields[i].field) {
                    if (
                      prop.createdBy.profile_fields[i].field.name ===                      'first_name'
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
            if (prop.package_type) {
              packages_name = prop.package_type.package_name;
            }

            return {
              ...prop,
              name: prop.name,
              package_type: packages_name,
              // package_amount: prop.package_amount,
              // validity: prop.validity,
              // lateFee: prop.late_pay_fee,
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
    } else {
      this.keyup = true;
    }
  };
  namesort(event) {
    let value;
    if (event.direction === 'desc') {
      value = '-' + event.active;
    } else {
      value = event.active;
    }
    let data;
    this.packageService
      .getSortedPackage(this.curSelectClub, this.skip, this.limit, value)
      .subscribe((res: any) => {
        const newres = res.data.map(prop => {
          let created = {
              fname: '',
              lname: ''
            },
            packages_name: any = '';
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
          if (prop.package_type) {
            packages_name = prop.package_type.package_name;
          }

          return {
            ...prop,
            name: prop.name,
            package_type: packages_name,
            package_amount: prop.package_amount,

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

  changePage(event) {
    if (
      this.totalLength > this.dataSource.data.length ||
      event.pageSize !== this.limit
    ) {
      if (this.pageIndex <= event.pageIndex) {
        // next page
        this.limit = event.pageSize;
        this.skip = event.pageIndex * this.limit;

        this.getAllPlans(this.curSelectClub);
      }
    }
  }
  getAllPlans(credentials: any) {
    this.sharedService.showLoader = true;
    let data;
    this.packageService.allPlans(credentials, this.skip, this.limit).subscribe(
      (result: any) => {
        this.sharedService.showLoader = false;

        const newres = result.data.map(prop => {
          let created = {
              fname: '',
              lname: ''
            },
            packages_name: any = '';

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
          if (prop.package_type) {
            packages_name = prop.package_type.package_name;
          }
          return {
            ...prop,
            name: prop.name,
            package_type: packages_name,

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

  editPackage(element: any) {
    sessionStorage.selected_package = JSON.stringify(element);
    this.router.navigate(['/packages/edit']);
  }

  deletePackage(element: any) {
    this.sharedService
      .showDialog('Are you sure you want to delete this Package?')
      .subscribe(response => {
        if (response !== '') {
          this.sharedService.showLoader = true;
          this.packageService.deletingPlan(element).subscribe(
            (res: any) => {
              this.sharedService.showMessage('Package deleted successfully');
              this.sharedService.showLoader = false;
              this.ngOnInit();
            },
            (err: any) => {
              console.log('error', err);
            }
          );
        }
      });
  }
}
