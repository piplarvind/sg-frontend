import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  AfterViewInit
} from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { SharedService } from '@app/shared/shared.service';
import { ResourceService } from '@app/resource/resource.service';
import { SeasonsService } from '@app/seasons/seasons.service';
@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit, AfterViewInit {
  keyup: boolean = false;
  dataSource = new MatTableDataSource();
  curclub: any;
  data: any;
  buttontext: any;
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  displayedColumns: any = [
    'resource_name',
    'type',
    'assignment_type',
    'created_on',
    'created_by',
    'Actions'
  ];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public sharedService: SharedService,

    public resourceService: ResourceService,
    public seasonService: SeasonsService
  ) {}

  ngOnInit() {
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
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
      this.getSeasons(this.curclub);
    }
  }
  namesort(event) {
    let value;
    if (event.direction === 'desc') {
      value = '-' + event.active;
    } else {
      value = event.active;
    }
    let data;
    this.resourceService
      .getSortedResources(this.curclub, this.skip, this.limit, value)
      .then((res: any) => {
        const newres = res.data.map(prop => {
          let fname = '',
            lname = '';
          if (prop.created_by) {
            for (let i = 0; i < prop.created_by.profile_fields.length; i++) {
              if (prop.created_by.profile_fields[i].field) {
                if (
                  prop.created_by.profile_fields[i].field.name === 'first_name'
                ) {
                  fname = prop.created_by.profile_fields[i].value;
                }
                if (
                  prop.created_by.profile_fields[i].field.name === 'last_name'
                ) {
                  lname = prop.created_by.profile_fields[i].value;
                }
              }
            }
          }
          return {
            ...prop,

            created_by: fname + ' ' + lname,
            resource_type: prop.assignment_type.AssignmentType
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data['data'];
      });
  }
  ngAfterViewInit() {}
  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      value = value.split(' ').join('_');
      let data;
      this.resourceService
        .getfilterResource(
          this.curclub,
          '&searchBy=resource_name&values=' + value
        )
        .then((res: any) => {
          const newres = res.data.map(prop => {
            let fname = '',
              lname = '';
            if (prop.created_by) {
              for (let i = 0; i < prop.created_by.profile_fields.length; i++) {
                if (prop.created_by.profile_fields[i].field) {
                  if (
                    prop.created_by.profile_fields[i].field.name === 'first_name'
                  ) {
                    fname = prop.created_by.profile_fields[i].value;
                  }
                  if (
                    prop.created_by.profile_fields[i].field.name === 'last_name'
                  ) {
                    lname = prop.created_by.profile_fields[i].value;
                  }
                }
              }
            }
            return {
              ...prop,

              created_by: fname + ' ' + lname,
              resource_type: prop.assignment_type.AssignmentType,
              created_on: prop.created_on.split('T')[0]
              // created_by: prop.created_by.first_name + ' ' + prop.created_by.last_name
            };
          });
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
        this.getResources();
        // if (this.buttontext === 'Show All') {

        // } else {
        //   this.getAllResources();
        // }
      }
    }
  }
  getAllResources() {
    this.sharedService.showLoader = true;
    // debugger;
    let data;
    this.resourceService.getAAllResources(true).subscribe((e: any) => {
      this.sharedService.showLoader = false;
      const newres = e.data.map(prop => {
        let h: any = {
          fname: '',
          lname: ''
        };
        if (prop.created_by) {
          for (let i = 0; i < prop.created_by.profile_fields.length; i++) {
            if (prop.created_by.profile_fields[i].field) {
              if (
                prop.created_by.profile_fields[i].field.name === 'first_name'
              ) {
                h.fname = prop.created_by.profile_fields[i].value;
              }
              if (prop.created_by.profile_fields[i].field.name === 'last_name') {
                h.lname = prop.created_by.profile_fields[i].value;
              }
            }
          }
          h = h.fname + ' ' + h.lname;
        }

        return {
          ...prop,

          resource_type: prop.assignment_type.AssignmentType,
          // created_on: prop.created_on,
          created_by: h
        };
      });
      this.tabledata = newres;

      this.data.data = this.tabledata;

      data = this.data;

      this.dataSource.data = data['data'];
      if (this.totalLength === 0 || this.totalLength !== data['pagination']) {
        this.totalLength = data['pagination'];
      }
    });
  }
  getSeasons(id) {
    this.sharedService.showLoader = true;

    this.seasonService
      .getSeasonList(id)
      .then((e: any) => {
        if (!e.data.length) {
          this.sharedService
            .loginDialog('Please create a season before proceeding')
            .subscribe(() => this.router.navigateByUrl('/seasons'));
        }
        for (let i = 0; i < e.data.length; i++) {
          if (e.data[i].status === 1) {
            localStorage.curRunningSeason = JSON.stringify(e.data[i]);

            this.getResources();
            this.buttontext = 'Show All';
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
  getResources() {
    this.sharedService.showLoader = true;
    // debugger;
    let data;
    this.resourceService
      .getAllResources(this.curclub, this.skip, this.limit)
      .subscribe(
        res => {
          // Handle result
          this.data = res;
          this.sharedService.showLoader = false;
        },
        error => {
          console.log('error', error);
          this.sharedService.showLoader = false;
        },
        () => {
          this.sharedService.showLoader = false;

          const newres = this.data.data.map(prop => {
            let fname = '',
              lname = '';
            if (prop.created_by) {
              for (let i = 0; i < prop.created_by.profile_fields.length; i++) {
                if (prop.created_by.profile_fields[i].field) {
                  if (
                    prop.created_by.profile_fields[i].field.name === 'first_name'
                  ) {
                    fname = prop.created_by.profile_fields[i].value;
                  }
                  if (
                    prop.created_by.profile_fields[i].field.name === 'last_name'
                  ) {
                    lname = prop.created_by.profile_fields[i].value;
                  }
                }
              }
            }
            return {
              ...prop,

              created_by: fname + ' ' + lname,
              resource_type: prop.assignment_type.AssignmentType
            };
          });
          this.tabledata = newres;

          this.data.data = this.tabledata;

          data = this.data;

          this.dataSource.data = data['data'];
          if (
            this.totalLength === 0 ||
            this.totalLength !== data['pagination']
          ) {
            this.totalLength = data['pagination'];
          }
        }
      );
  }

  editResource(row: any) {
    this.router.navigate(['resources/edit/{{row._id}}'], {
      queryParams: { editResId: row._id }
    });
  }

  deleteResource(row: any) {
    this.sharedService
      .showDialog('Are you sure you want to delete?')
      .subscribe(response => {
        if (response !== '') {
          this.sharedService.showLoader = true;
          this.resourceService.resourceDelete(row).subscribe((e: any) => {
            this.sharedService.showLoader = false;
            this.sharedService.showMessage('Resource Library deleted');
            this.getResources();
            this.buttontext = 'Show All';
          });
        }
      });
  }
  openDialog() {}

  ShowAll(event: any) {
    if (this.buttontext === 'Show All') {
      this.getAllResources();
      this.buttontext = 'Show Active';
    } else {
      this.buttontext = 'Show All';
      this.getResources();
    }
  }
}
