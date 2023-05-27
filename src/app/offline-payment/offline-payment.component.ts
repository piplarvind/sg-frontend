import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { SharedService } from '@app/shared/shared.service';
import { OfflinePaymentService } from '@app/offline-payment/offline-payment.service';
import { SeasonsService } from '@app/seasons/seasons.service';
import * as moment from 'moment';
@Component({
  selector: 'app-offline-payment',
  templateUrl: './offline-payment.component.html',
  styleUrls: ['./offline-payment.component.scss']
})
export class OfflinePaymentComponent implements OnInit, AfterViewInit {
  keyup: boolean = false;
  dataSource = new MatTableDataSource();
  curClub: any;
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  displayedColumns: any = [
    'payedOn',
    'payer',
    'behalf',
    'total_amount_paid',
    'isOffline',
    'type',
    //'inputBy',

    'comments',
    // 'createdBy',
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
    public offlinePaymentService: OfflinePaymentService,
    public seasonService: SeasonsService
  ) {}

  ngOnInit() {
    if (localStorage.user_role === 'Club Admin') {
      this.curClub = localStorage.club_id;
    } else if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      // this.isSuperAdmin = true;
      this.curClub = localStorage.super_cur_clubId;
      if (!this.curClub) {
        this.sharedService
          .loginDialog('Select the club')
          .subscribe(() => this.router.navigateByUrl('/home'));
      }
    }
    if (this.curClub) {
      this.getSeasons();
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
      this.offlinePaymentService
        .getfilteroffPayment(
          this.curClub,
          '?searchBy=first_name&values=' + value
        )
        .then((res: any) => {
          data = res;
          let newres: any = res.data.map(prop => {
            // if (prop.validity_from) {
            //   var date = prop.validity_from.split('T')[0];
            //   prop.createdAt = moment(date).format('MM/DD/YYYY');
            // }
            let na: any = {
                fname: '',
                lname: ''
              },
              total_amount_paid = null,
              date = '',
              pfname = '',
              plname = '',
              comments = '',
              type = '';
            if (prop.behalf) {
              if (prop.behalf.profile_fields)
                for (let i = 0; i < prop.behalf.profile_fields.length; i++) {
                  if (prop.behalf.profile_fields[i].field) {
                    if (
                      prop.behalf.profile_fields[i].field.name === 'first_name'
                    ) {
                      na.fname = prop.behalf.profile_fields[i].value;
                    }
                    if (
                      prop.behalf.profile_fields[i].field.name === 'last_name'
                    ) {
                      na.lname = prop.behalf.profile_fields[i].value;
                    }
                  }
                }
            }
            if (prop.payer) {
              if (prop.payer.profile_fields) {
                for (let i = 0; i < prop.payer.profile_fields.length; i++) {
                  if (prop.payer.profile_fields[i].field) {
                    if (
                      prop.payer.profile_fields[i].field.name === 'first_name'
                    ) {
                      pfname = prop.payer.profile_fields[i].value;
                    }
                    if (
                      prop.payer.profile_fields[i].field.name === 'last_name'
                    ) {
                      plname = prop.payer.profile_fields[i].value;
                    }
                  }
                }
              }
            }
            if (prop.payments) {
              for (let i = 0; i < prop.payments.length; i++) {
                if (prop.payments[i].status === 1) {
                  total_amount_paid =
                    total_amount_paid +
                    prop.payments[i].installments.installment_amount;
                  date = prop.payments[i].payedOn;
                  comments = prop.payments[i].comments;

                  if (prop.payments[i].transactionDetails) {
                    type = prop.payments[i].transactionDetails.type.label;
                  }
                }
              }
            }

            return {
              ...prop,

              behalf: na.fname + ' ' + na.lname,
              payer: pfname + ' ' + plname,
              createdAt: date,
              total_amount_paid: total_amount_paid,
              comments: comments,
              type: type
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
    this.offlinePaymentService
      .getSortedOffPayment(this.curClub, this.skip, this.limit, value)
      .then((res: any) => {
        let newres: any = res.data.map(prop => {
          // if (prop.validity_from) {
          //   var date = prop.validity_from.split('T')[0];
          //   prop.createdAt = moment(date).format('MM/DD/YYYY');
          // }
          let na: any = {
              fname: '',
              lname: ''
            },
            total_amount_paid = null,
            date = '',
            pfname = '',
            plname = '',
            comments = '',
            type = '';
          if (prop.behalf) {
            if (prop.behalf.profile_fields)
              for (let i = 0; i < prop.behalf.profile_fields.length; i++) {
                if (prop.behalf.profile_fields[i].field) {
                  if (
                    prop.behalf.profile_fields[i].field.name === 'first_name'
                  ) {
                    na.fname = prop.behalf.profile_fields[i].value;
                  }
                  if (prop.behalf.profile_fields[i].field.name === 'last_name') {
                    na.lname = prop.behalf.profile_fields[i].value;
                  }
                }
              }
          }
          if (prop.payer) {
            if (prop.payer.profile_fields) {
              for (let i = 0; i < prop.payer.profile_fields.length; i++) {
                if (prop.payer.profile_fields[i].field) {
                  if (prop.payer.profile_fields[i].field.name === 'first_name') {
                    pfname = prop.payer.profile_fields[i].value;
                  }
                  if (prop.payer.profile_fields[i].field.name === 'last_name') {
                    plname = prop.payer.profile_fields[i].value;
                  }
                }
              }
            }
          }
          if (prop.payments) {
            for (let i = 0; i < prop.payments.length; i++) {
              if (prop.payments[i].status === 1) {
                total_amount_paid =
                  total_amount_paid +
                  prop.payments[i].installments.installment_amount;
                date = prop.payments[i].payedOn;
                comments = prop.payments[i].comments;

                if (prop.payments[i].transactionDetails) {
                  type = prop.payments[i].transactionDetails.type.label;
                }
              }
            }
          }

          return {
            ...prop,

            behalf: na.fname + ' ' + na.lname,
            payer: pfname + ' ' + plname,
            createdAt: date,
            total_amount_paid: total_amount_paid,
            comments: comments,
            type: type
          };
        });

        this.tabledata = newres;

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

        this.getAllPayments();
      }
    }
  }
  getAllPayments() {
    this.sharedService.showLoader = true;
    let data;
    this.offlinePaymentService
      .getAllPayments(this.curClub, this.skip, this.limit)
      .then((e: any) => {
        let newres: any = e.data.map(prop => {
          // if (prop.validity_from) {
          //   var date = prop.validity_from.split('T')[0];
          //   prop.createdAt = moment(date).format('MM/DD/YYYY');
          // }
          let na: any = {
              fname: '',
              lname: ''
            },
            total_amount_paid = null,
            date = '',
            pfname = '',
            plname = '',
            comments = '',
            type = '';
          if (prop.behalf) {
            if (prop.behalf.profile_fields)
              for (let i = 0; i < prop.behalf.profile_fields.length; i++) {
                if (prop.behalf.profile_fields[i].field) {
                  if (
                    prop.behalf.profile_fields[i].field.name === 'first_name'
                  ) {
                    na.fname = prop.behalf.profile_fields[i].value;
                  }
                  if (prop.behalf.profile_fields[i].field.name === 'last_name') {
                    na.lname = prop.behalf.profile_fields[i].value;
                  }
                }
              }
          }
          if (prop.payer) {
            if (prop.payer.profile_fields) {
              for (let i = 0; i < prop.payer.profile_fields.length; i++) {
                if (prop.payer.profile_fields[i].field) {
                  if (prop.payer.profile_fields[i].field.name === 'first_name') {
                    pfname = prop.payer.profile_fields[i].value;
                  }
                  if (prop.payer.profile_fields[i].field.name === 'last_name') {
                    plname = prop.payer.profile_fields[i].value;
                  }
                }
              }
            }
          }
          if (prop.payments) {
            for (let i = 0; i < prop.payments.length; i++) {
              if (prop.payments[i].status === 1) {
                total_amount_paid =
                  total_amount_paid +
                  prop.payments[i].installments.installment_amount;
                date = prop.payments[i].payedOn;
                comments = prop.payments[i].comments;

                if (prop.payments[i].transactionDetails) {
                  if (prop.payments[i].transactionDetails.type) {
                    type = prop.payments[i].transactionDetails.type.label;
                  }
                }
              } else if (prop.payments[i].status === 2) {
                total_amount_paid =
                  total_amount_paid +
                  prop.payments[i].installments.installment_amount -
                  prop.payments[i].balance;
                date = prop.payments[i].payedOn;
                comments = prop.payments[i].comments;

                if (prop.payments[i].transactionDetails) {
                  if (prop.payments[i].transactionDetails.type) {
                    type = prop.payments[i].transactionDetails.type.label;
                  }
                }
              }
            }
          }

          return {
            ...prop,

            behalf: na.fname + ' ' + na.lname,
            payer: pfname + ' ' + plname,
            createdAt: date,
            total_amount_paid: total_amount_paid,
            comments: comments,
            type: type
          };
        });

        this.tabledata = newres;
        e.data = this.tabledata;

        data = e;

        this.dataSource.data = data['data'];
        if (this.totalLength === 0 || this.totalLength !== data['pagination']) {
          this.totalLength = data['pagination'];
        }
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  getSeasons() {
    this.sharedService.showLoader = true;
    this.seasonService
      .getSeasonList(this.curClub)
      .then((e: any) => {
        if (!e.data.length) {
          this.sharedService
            .loginDialog('Please create a season before proceeding')
            .subscribe(() => this.router.navigateByUrl('/seasons'));
        }
        for (let i = 0; i < e.data.length; i++) {
          if (e.data[i].status === 1) {
            localStorage.curRunningSeason = JSON.stringify(e.data[i]);

            this.getAllPayments();
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
  editOfflinePayment(rowData: any) {
    this.router.navigate(['offlinePayment/edit/{{rowData._id}}'], {
      queryParams: { offlinePayId: rowData._id }
    });
  }

  deleteOfflinePayment(rowData: any) {
    this.sharedService.showLoader = true;
    this.offlinePaymentService
      .removePayment(rowData)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('Offline Payment deleted Successfully');
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
