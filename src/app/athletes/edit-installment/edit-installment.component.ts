import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '@app/shared/shared.service';
import { environment } from '../../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { OfflinePaymentService } from '@app/offline-payment/offline-payment.service';
import { ProfilesService } from '@app/profiles/profiles.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import * as moment from 'moment';
import { AthletesService } from '@app/athletes/athletes.service';


@Component({
  selector: 'app-edit-installment',
  templateUrl: './edit-installment.component.html',
  styleUrls: ['./edit-installment.component.scss']
})
export class EditInstallmentComponent implements OnInit, AfterViewInit {
  title = "Edit Installment";

  today: Date = new Date();
  payerList: Array<any> = [];
  athleteList: Array<any> = [];
  packageList: any = [];
  paymentTypeList: any = [];

  offline: any = {
    payer: '',
    behalf: '',
    planId: '',
    payments: []
  };

  plan_detail: any = {
    validity_from: '',
    validity_till: '',
    total_amount_paid: null,
    disableno: false,
    installment: '',
    amount_paid: null,
    bal_amount: 0,
    finalamount_paid: null,
    name: '',
    due_date: null,
    package_amount: null,
    late_pay_days: '',
    late_pay_fee: '',
    monthly_due_date: '',
    installments_no: null,
    installments_amount: null,
    installments: [],
    //trans_mode:[],
    assigned: null,
    downpayment: ''
  };

  balAmount: any;

  isEdit: Boolean;

  curClub: any;

  activeRouteSubscriber: any;

  displayedColumns: any = [
    'installmenttypedo',
    'Due_date',
    //'payedOn',
    //'type',
    'due',
    'amount',
    'status',
    // 'comments',
    'edit'
  ];
  dataSource = new MatTableDataSource();
  roleCoach: any;
  _isEdit = false;
  action: any;


  athleteId: any;
  type: any;
  paymentId: any;
  installmentId: any;
  installmentData: any = {
    status: '',
    active: '',
    balance: 0,
    failedTransaction: [],
    club: '',
    payer: '',
    behalf: '',
    plan: '',
    installments:
    {
      grace_period: '',
      installments_no: '',
      installment_amount: '',
      club: '',
      plan: '',
      installments_type: '',
      installment_frequency: '',
      installments_date: ''
    },
    payedOn: '',
    transactionDetails:
    {
      cvvCode: '',
      cvvMsg: '',
      responseCode: '',
      responseMsg: null,
      statusCode: '',
      statusMsg: '',
      transactionId: '',
      authcode: '',
      is_estore_transaction: false,
      is_event_transaction: false,
      is_offline: true,
      clubId: '',
      payer: '',
      behalf: '',
      ccnum: '',
      amount: '',
      type: '',
      created_on: '',
    }
  }
  paymentData: any;
  installment: any = {
    _id: '',
    grace_period: '',
    installments_no: '',
    installment_amount: '',
    club: '',
    plan: '',
    installments_type: '',
    installment_frequency: '',
    installments_date: Date()
  };

  installmentFrequency: any;
  installmentsType: any;

  constructor(
    private router: Router,
    public sharedService: SharedService,
    public activatedRoute: ActivatedRoute,
    public offlinePaymentService: OfflinePaymentService,
    public ProfilesService: ProfilesService,
    private cdRef: ChangeDetectorRef,
    public athletesService: AthletesService
  ) { }

  ngOnInit() {
    this.today = new Date();
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.curClub = localStorage.super_cur_clubId;
    } else {
      this.curClub = localStorage.club_id;
    }

    this.getPaymentTypeList();
    this.getInstallmentFrequency();
    this.getInstallmentType();

    this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
      param => {
        this.paymentId = param.paymentId;
        this.installmentId = param.installementId;
        this.athleteId = param.athleteId;
        this.type = param.type;
      }
    );
    this.getInstallment(this.paymentId, this.installmentId);
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getpaymentTypeList() {
    this.offlinePaymentService
      .getTransactionList()
      .then((res: any) => {
        this.paymentTypeList = res.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }


  cancelPayments() {
    if (!this.isEdit) {
      this.sharedService
        .showDialog(
          `Unsaved data, if any will be lost if you cancel this action.
  Confirm if you want to leave this page?`
        )
        .subscribe(
          response => {
            if (response) {
              this.router.navigateByUrl('/offlinePayment');
            }
          },
          err => {
            console.log(err);
          }
        );
    }
    if (this.isEdit) {
      this.router.navigateByUrl('/offlinePayment');
    }
  }



  getStatus(status) {
    if (status === 0) {
      return 'Pending';
    } else if (status === 1) {
      return 'Paid';
    } else if (status === 2) {
      return 'Partial';
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  getcomment(value, i) {
    this.offline.payments[i].comments = value;
  }
  getpaymenttype(value, i) {
    this.offline.payments[i].type = value;
  }

  getInstallment(paymentId: any, installmentId: any) {
    this.sharedService.showLoader = true;
    this.athletesService.fetchPaymentById(paymentId, installmentId)
      .then((data: any) => {
        
        if (data.status === 'Success') {
          this.installmentData = data.data[0];
          this.installmentData.installments.installments_date = new Date(data.data[0].installments.installments_date);
          if (this.installmentData.transactionDetails === undefined) {
            this.installmentData.transactionDetails = {
              cvvCode: '',
              cvvMsg: '',
              responseCode: '',
              responseMsg: null,
              statusCode: '',
              statusMsg: '',
              transactionId: '',
              authcode: '',
              is_estore_transaction: false,
              is_event_transaction: false,
              is_offline: true,
              clubId: '',
              payer: '',
              behalf: '',
              ccnum: '',
              amount: '',
              type: '',
              created_on: ''
            }
          }
          console.log('this.installmentData:: ', this.installmentData);
        }
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {
        console.log('err in getting installment', err);
      });

    /*this.athletesService.fetchInstallmentById(installmentId)
    .then((data: any) => {
      if (data.status === 'Success') {
        this.installmentData = data.data[0];    
        // var d = new Date(data.data[0].installments_date);
        // d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );
        // this.installmentData.installments_date = d; 
        console.log('this.installmentData: ', this.installmentData.installments_date);   
      } else {
        console.log('Invalid installment id');
      }
    })
    .catch((err: any) => {
      console.log('err in getting installment', err);
    });*/
  }

  editInstallment(installementId: any) {
    this.sharedService.showLoader = true;
    this.installment = this.installmentData;
    let temp = this.installment;
    temp.paymentId = this.paymentId;
    temp.installments.installments_date = new Date(this.installment.installments.installments_date);
    this.athletesService.updatingInstallment(temp).subscribe(
      (res: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('Installment updated successfully');
        //this.router.navigate(['/athletes']);
        this.router.navigate(['athletes/edit/{{row._id}}'], {
          queryParams: { athleteId: this.athleteId, type: this.type }
        });
      },
      (err: any) => {
        console.log('error occured', err);
      }
    );

  }

  getInstallmentFrequency() {
    this.offlinePaymentService
      .installmentFrequency()
      .then((res: any) => {
        this.installmentFrequency = res.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  getInstallmentType() {
    this.offlinePaymentService
      .installmentType()
      .then((res: any) => {
        this.installmentsType = res.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  getPaymentTypeList() {
    this.offlinePaymentService
      .getTransactionList()
      .then((res: any) => {
        this.paymentTypeList = res.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  cancelChange() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
      Confirm if you want to leave this page?`
      )
      .subscribe(response => {
        if (response === true) {
          //this.router.navigate(['/athletes']);
          this.router.navigate(['athletes/edit/{{row._id}}'], {
            queryParams: { athleteId: this.athleteId, type: this.type }
          });
        }
      });
  }
}
