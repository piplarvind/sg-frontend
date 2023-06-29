import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '@app/users/users.service';
import { ReportsService } from '@app/reports/reports.service';
import { Router } from '@angular/router';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-unpaid',
  templateUrl: './unpaid.component.html',
  styleUrls: ['./unpaid.component.scss']
})
export class UnpaidComponent implements OnInit {
  keyup: boolean = false;
  dataSource = new MatTableDataSource();
  curclub: any;
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  displayedColumns: any = [
    'date',
    'amount',
    'athlete',
    'email',
    'contact_no_athlete',
    'payer',
    'payer_email',
    'contact_no_payer'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showAnswerIndex = 0;
  showAnswerCard = false;

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
    if (!this.curclub) {
      this.sharedService
        .loginDialog('Please select sport & club from header')
        .subscribe(() => this.router.navigateByUrl('/home'));
    }

    this.getUnpaid();
  }
  ngAfterViewInit() {}
  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      value = value.split(' ').join('_');
      let data;
      this.reportService
        .getDeclinedReportsfilter(
          this.curclub,
          '?searchBy=name&values=' + value
        )
        .subscribe((res: any) => {
          const newres = res.data.map(prop => {
            let name: any = {
              fname: '',
              lname: '',
              moblie: '',
              email: ''
            };

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
              if (prop.payer.profile_fields[i].field.name === 'email') {
                name.email = prop.payer.profile_fields[i].value;
              }
            }
            let Aname: any = {
              fname: '',
              lname: '',
              moblie: '',
              email: ''
            };
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
              if (prop.behalf.profile_fields[i].field.name === 'email') {
                Aname.email = prop.behalf.profile_fields[i].value;
              }
            }

            return {
              ...prop,
              date: new Date(prop.createdAt),
              amount: prop.total_amount_owing,
              athlete: Aname.fname + ' ' + Aname.lname,
              email: Aname.email,
              contact_no_athlete: Aname.moblie,
              payer: name.fname + ' ' + name.lname,
              payer_email: name.email,
              contact_no_payer: name.moblie
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
      .getSortedDeclinedReports(this.curclub, this.skip, this.limit, value)
      .subscribe((res: any) => {
        const newres = res.data.map(prop => {
          let name: any = {
            fname: '',
            lname: '',
            moblie: '',
            email: ''
          };

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
            if (prop.payer.profile_fields[i].field.name === 'email') {
              name.email = prop.payer.profile_fields[i].value;
            }
          }
          let Aname: any = {
            fname: '',
            lname: '',
            moblie: '',
            email: ''
          };
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
            if (prop.behalf.profile_fields[i].field.name === 'email') {
              Aname.email = prop.behalf.profile_fields[i].value;
            }
          }

          return {
            ...prop,
            date: new Date(prop.createdAt),
            amount: prop.total_amount_owing,
            athlete: Aname.fname + ' ' + Aname.lname,
            email: Aname.email,
            contact_no_athlete: Aname.moblie,
            payer: name.fname + ' ' + name.lname,
            payer_email: name.email,
            contact_no_payer: name.moblie
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

        this.getUnpaid();
      }
    }
  }

  getUnpaid() {
    let data;
    this.reportService
      .getUnpaidReports(this.curclub, this.skip, this.limit)
      .subscribe(
        (res: any) => {
          const newres = res.data.map(prop => {
            let nfname = '',
              nlname = '',
              nmoblie = '',
              nemail = '';

            for (let i = 0; i < prop.payer.profile_fields.length; i++) {
              if (prop.payer.profile_fields[i].field) {
                if (prop.payer.profile_fields[i].field.name === 'first_name') {
                  nfname = prop.payer.profile_fields[i].value;
                }

                if (prop.payer.profile_fields[i].field.name === 'last_name') {
                  nlname = prop.payer.profile_fields[i].value;
                }
                if (prop.payer.profile_fields[i].field.name === 'mobile_phone') {
                  nmoblie = prop.payer.profile_fields[i].value;
                }
                if (prop.payer.profile_fields[i].field.name === 'email') {
                  nemail = prop.payer.profile_fields[i].value;
                }
              }
            }
            let Afname = '',
              Alname = '',
              Amoblie = '',
              Aemail = '';
            for (let i = 0; i < prop.behalf.profile_fields.length; i++) {
              if (prop.behalf.profile_fields[i].field) {
                if (prop.behalf.profile_fields[i].field.name === 'first_name') {
                  Afname = prop.behalf.profile_fields[i].value;
                }
                if (prop.behalf.profile_fields[i].field.name === 'last_name') {
                  Alname = prop.behalf.profile_fields[i].value;
                }
                if (
                  prop.behalf.profile_fields[i].field.name === 'mobile_phone'
                ) {
                  Amoblie = prop.behalf.profile_fields[i].value;
                }
                if (prop.behalf.profile_fields[i].field.name === 'email') {
                  Aemail = prop.behalf.profile_fields[i].value;
                }
              }
            }

            return {
              ...prop,
              date: new Date(prop.createdAt),
              amount: prop.total_amount_owing,
              athlete: Afname + ' ' + Alname,
              email: Aemail,
              contact_no_athlete: Amoblie,
              payer: nfname + ' ' + nlname,
              payer_email: nemail,
              contact_no_payer: nmoblie
            };
          });
          this.tabledata = newres;

          res.data = this.tabledata;

          data = res;

          this.dataSource.data = data['data'];
          if (
            this.totalLength === 0 ||
            this.totalLength !== data['pagination']
          ) {
            this.totalLength = data['pagination'];
          }
        },
        (err: any) => {
          console.log('error occured', err);
        }
      );
  }

  openDialog() {}
}
