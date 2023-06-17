import { Component, OnInit } from '@angular/core';

import { OfflinePaymentService } from '@app/offline-payment/offline-payment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '@app/shared/shared.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProfilesService } from '@app/profiles/profiles.service';
import { environment } from '../../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-add-offline-payment',
  templateUrl: './add-offline-payment.component.html',
  styleUrls: ['./add-offline-payment.component.scss']
})
export class AddOfflinePaymentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  title = 'Add Payments Detail';

  today: Date = new Date();

  plan: any;
  payer: any;
  behalf: any;
  athleteId: any;
  type: any;
  curClub: any;
  paymentTypeList: any = [];
  activeRouteSubscriber: any;
  installmentData: any = {
    status: '',
    active: true,
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

  isEdit: Boolean;
  _isEdit = false;
  action: any;
  installmentFrequency: any;
  installmentsType: any;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public sharedService: SharedService,
    public offlinePaymentService: OfflinePaymentService,
    public ProfilesService: ProfilesService,
    private cdRef: ChangeDetectorRef
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

    this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
      param => {
        this.athleteId = param.athleteId;
        this.type = param.type;
        this.payer = param.payer;
        this.plan = param.plan;
        this.behalf = param.athleteId;
      }
    );
    this.installmentData.payer = this.payer;
    this.installmentData.behalf = this.behalf;
    this.installmentData.plan = this.plan;
    this.installmentData.club = this.curClub;
    this.installmentData.installments.club = this.curClub;
    this.installmentData.installments.plan = this.plan;
    this.installmentData.transactionDetails.clubId = this.curClub;
    this.installmentData.behalf = this.athleteId;
    this.installmentData.transactionDetails.behalf = this.athleteId;
    this.installmentData.transactionDetails.payer = this.payer;
    this.getPaymentTypeList();
    this.getInstallmentFrequency();
    this.getInstallmentType();
    //console.log('this.installmentData:',this.installmentData);
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

  addOfflinePayment() {
    //console.log('installmentData:', this.installmentData);
    const temp = this.installmentData;
    this.offlinePaymentService
      .saveOfflinePayment(temp)
      .then((res: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('Payment added successfully');
        this.router.navigate(['athletes/edit/{{row._id}}'], {
          queryParams: { athleteId: this.athleteId, type: this.type }
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }


  cancelPayments() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action. Confirm if you want to leave this page?`
      )
      .subscribe(
        response => {
          if (response) {
            this.router.navigate(['athletes/edit/{{row._id}}'], {
              queryParams: { athleteId: this.athleteId, type: this.type }
            });
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

}
