import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
// import { Croppie } from 'croppie/croppie';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatSelect
} from '@angular/material';
import { take, takeUntil } from 'rxjs/operators';
// import { CroppieDirective } from 'angular-croppie-module';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ReportsService } from '@app/reports/reports.service';
import { UsersService } from '@app/users/users.service';
import { SharedService } from '@app/shared/shared.service';

// interface Bank {
//   id: string;
//   name: string;
// }

@Component({
  selector: 'app-ageing',
  templateUrl: './ageing.component.html',
  styleUrls: ['./ageing.component.scss']
})
export class AgeingComponent implements OnInit {
  keyup: boolean = true;
  public bankCtrl: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();
  dataSource = new MatTableDataSource();
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  displayedColumns: any = [
    'due_date',
    'athlete',
    'contact_no_athlete',
    'payer',
    'contact_no_payer',
    'fifteendays',
    'thirtydays',
    'sixtydays'
  ];
  @ViewChild('croppie')
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;
  showAnswerIndex = 0;
  showAnswerCard = false;
  private curclub: any;
  croppedImage: any;
  imageSelected: Boolean = false;
  count = [
    { question_no: 0, value: 'How much time will you take for cycling?' }
  ];
  constructor(
    public userService: UsersService,
    public reportService: ReportsService,
    private router: Router,
    public sharedService: SharedService
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
    this.getAgeing();
    if (!this.curclub) {
      this.sharedService
        .loginDialog('Select the club')
        .subscribe(() => this.router.navigateByUrl('/home'));
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
      value = value.split(' ').join('_');
      let data;
      this.reportService
        .getfilterage(this.curclub, '?searchBy=name&values=' + value)
        .subscribe((res: any) => {
          data = res;
          const newres = res.data.map(prop => {
            let name: any = {
              fname: '',
              lname: '',
              moblie: ''
            };
            if (prop.payer) {
              for (let i = 0; i < prop.payer.profile_fields.length; i++) {
                if (prop.payer.profile_fields[i].field.name === 'first_name') {
                  name.fname = prop.payer.profile_fields[i].value;
                }
                if (prop.payer.profile_fields[i].field.name === 'last_name') {
                  name.lname = prop.payer.profile_fields[i].value;
                }
                if (prop.payer.profile_fields[i].field.name === 'mobile_phone') {
                  name.moblie = prop.payer.profile_fields[i].value;
                }
              }
            }
            let Aname: any = {
              fname: '',
              lname: '',
              moblie: ''
            };
            if (prop.behalf) {
              for (let i = 0; i < prop.behalf.profile_fields.length; i++) {
                if (prop.behalf.profile_fields[i].field.name === 'first_name') {
                  Aname.fname = prop.behalf.profile_fields[i].value;
                }
                if (prop.behalf.profile_fields[i].field.name === 'last_name') {
                  Aname.lname = prop.behalf.profile_fields[i].value;
                }
                if (
                  prop.behalf.profile_fields[i].field.name === 'mobile_phone'
                ) {
                  Aname.moblie = prop.behalf.profile_fields[i].value;
                }
              }
            }
            return {
              ...prop,
              athlete: Aname.fname + ' ' + Aname.lname,
              contact_no_athlete: Aname.moblie,
              payer: name.fname + ' ' + name.lname,
              contact_no_payer: name.moblie,
              fifteendays: prop.lf,
              thirtydays: prop.lt,
              sixtydays: prop.ls
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
  namesort(event) {
    let value;
    if (event.direction === 'desc') {
      value = '-' + event.active;
    } else {
      value = event.active;
    }
    let data;
    this.reportService
      .getSortedage(this.curclub, this.skip, this.limit, value)
      .subscribe((res: any) => {
        const newres = res.data.map(prop => {
          let name: any = {
            fname: '',
            lname: '',
            moblie: ''
          };
          if (prop.payer) {
            for (let i = 0; i < prop.payer.profile_fields.length; i++) {
              if (prop.payer.profile_fields[i].field.name === 'first_name') {
                name.fname = prop.payer.profile_fields[i].value;
              }
              if (prop.payer.profile_fields[i].field.name === 'last_name') {
                name.lname = prop.payer.profile_fields[i].value;
              }
              if (prop.payer.profile_fields[i].field.name === 'mobile_phone') {
                name.moblie = prop.payer.profile_fields[i].value;
              }
            }
          }
          let Aname: any = {
            fname: '',
            lname: '',
            moblie: ''
          };
          if (prop.behalf) {
            for (let i = 0; i < prop.behalf.profile_fields.length; i++) {
              if (prop.behalf.profile_fields[i].field.name === 'first_name') {
                Aname.fname = prop.behalf.profile_fields[i].value;
              }
              if (prop.behalf.profile_fields[i].field.name === 'last_name') {
                Aname.lname = prop.behalf.profile_fields[i].value;
              }
              if (prop.behalf.profile_fields[i].field.name === 'mobile_phone') {
                Aname.moblie = prop.behalf.profile_fields[i].value;
              }
            }
          }

          return {
            ...prop,
            athlete: Aname.fname + ' ' + Aname.lname,
            contact_no_athlete: Aname.moblie,
            payer: name.fname + ' ' + name.lname,
            contact_no_payer: name.moblie,
            fifteendays: prop.lf,
            thirtydays: prop.lt,
            sixtydays: prop.ls
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

        this.getAgeing();
      }
    }
  }

  getAgeing() {
    this.sharedService.showLoader = true;
    let data;
    this.reportService
      .getAgeingReports(this.curclub, this.skip, this.limit)
      .subscribe(
        (response: any) => {
          const newres = response.data.map(prop => {
            let name: any = {
              fname: '',
              lname: '',
              moblie: ''
            };
            if (prop.payer) {
              for (let i = 0; i < prop.payer.profile_fields.length; i++) {
                if (prop.payer.profile_fields[i].field.name === 'first_name') {
                  name.fname = prop.payer.profile_fields[i].value;
                }
                if (prop.payer.profile_fields[i].field.name === 'last_name') {
                  name.lname = prop.payer.profile_fields[i].value;
                }
                if (prop.payer.profile_fields[i].field.name === 'mobile_phone') {
                  name.moblie = prop.payer.profile_fields[i].value;
                }
              }
            }
            let Aname: any = {
              fname: '',
              lname: '',
              moblie: ''
            };
            if (prop.behalf) {
              for (let i = 0; i < prop.behalf.profile_fields.length; i++) {
                if (prop.behalf.profile_fields[i].field.name === 'first_name') {
                  Aname.fname = prop.behalf.profile_fields[i].value;
                }
                if (prop.behalf.profile_fields[i].field.name === 'last_name') {
                  Aname.lname = prop.behalf.profile_fields[i].value;
                }
                if (
                  prop.behalf.profile_fields[i].field.name === 'mobile_phone'
                ) {
                  Aname.moblie = prop.behalf.profile_fields[i].value;
                }
              }
            }

            return {
              ...prop,
              athlete: Aname.fname + ' ' + Aname.lname,
              contact_no_athlete: Aname.moblie,
              payer: name.fname + ' ' + name.lname,
              contact_no_payer: name.moblie,
              fifteendays: prop.lf,
              thirtydays: prop.lt,
              sixtydays: prop.ls
            };
          });
          this.tabledata = newres;

          response.data = this.tabledata;

          data = response;

          this.dataSource.data = data['data'];
          if (
            this.totalLength === 0 ||
            this.totalLength !== data['pagination']
          ) {
            this.totalLength = data['pagination'];
          }
          this.sharedService.showLoader = false;
        },
        (err: any) => {
          this.sharedService.showLoader = false;
        }
      );
  }

  openDialog() {}
}
