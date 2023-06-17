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
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  title = 'Offline Payment Details';

  today: Date = new Date();
  // isEditrecord: boolean = false;
  payerList: Array<any> = [];
  athleteList: Array<any> = [];
  packageList: any = [];
  paymenttypeList: any = [];
  // showInstallment: boolean = false;

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
    bal_amount:0,
    finalamount_paid:null,
    name: '',
    due_date: null,
    package_amount: null,
    late_pay_days: '',
    late_pay_fee: '',
    monthly_due_date: '',
    installments_no: null,
    installments_amount:null,
    installments: [],
    //trans_mode:[],
    assigned:null,
    downpayment:''
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

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public sharedService: SharedService,
    public offlinePaymentService: OfflinePaymentService,
    public ProfilesService: ProfilesService,
    private cdRef: ChangeDetectorRef
  ) {}

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
    this.getAllParent();
    this.getpaymenttypeList();
    if (this.router.url !== '/offlinePayment/addPayment') {
      this.isEdit = true;
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.offline._id = param.offlinePayId;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getOnePayment(id: any) {
    this.plan_detail.total_amount_paid = 0;
    this.balAmount = 0;
    this.sharedService.showLoader = true;
    this.offlinePaymentService
      .getOnePayment(id)
      .then((res: any) => {
        this.sharedService.showLoader = false;

        this.offline.payer = res.data.payer._id;
        
        this.offline.behalf = res.data.behalf._id;
        this.offline.planId = res.data.planId._id;
        this.plan_detail = res.data.planId;
        if (this.plan_detail.installments.length) {
          this.plan_detail.installment = true;
          this.plan_detail.downpayment = true;
          
        } else {
          this.plan_detail.installment = false;
        }

        res.data.payments.sort((a, b) => {
          return (
            <any>new Date(b.installments.installments_date) -
            <any>new Date(a.installments.installments_date)
          );
        });
        this.plan_detail.total_amount_paid = 0;
        if (res.data.payments.length) {
          this.plan_detail.installment_amount =
            res.data.payments[0].installments.installment_amount;
            
          this.plan_detail.installments_no =
            res.data.payments[0].installments.installments_no;

            this.plan_detail.down_pay_amount = res.data.payments[0].installments.down_pay_amount;
        }
        this.plan_detail.currenttotal_transaction = 0;
        let newres = res.data.payments.map(prop => {
          let comments = '',
            action = '',
            toassign: any = '';
          if (prop.status === 1) {
            
            this.plan_detail.total_amount_paid =
              this.plan_detail.total_amount_paid +
              prop.installments.installment_amount;
            this.balAmount =
              this.plan_detail.package_amount -
              this.plan_detail.total_amount_paid;
            action = 'Unassign';

            toassign = prop.installments.installment_amount;
          } else if (prop.status === 2) {
            this.plan_detail.total_amount_paid =
              this.plan_detail.total_amount_paid +
              prop.installments.installment_amount -
              prop.balance;

            this.balAmount =
              this.plan_detail.package_amount -
              this.plan_detail.total_amount_paid;
            action = 'Unassign';

            toassign = prop.installments.installment_amount - prop.balance;
          } else {
            action = 'Assign';
          }

          if (!prop.comments) {
            prop.comments = '';
          }
          return {
            ...prop,
            action: action,
            installments_date: prop.installments.installments_date,
            payedOn: prop.payedOn,
            installment_amount: prop.installments.installment_amount,
            toassign: toassign,

            type: prop.transactionDetails
              ? prop.transactionDetails.type._id
              : null,
            isEditrecord: false
          };
        });
        this.offline.payments = newres.reverse();
        this.title = 'Edit Payment Details';
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

  getAllParent() {
    this.sharedService.showLoader = true;

    this.ProfilesService.getRoleListAlluser(this.curClub, 'Parent').then(
      (res: any) => {
        this.sharedService.showLoader = false;

        const newres = res.data.map(prop => {
          let name: any = {
            fname: '',
            lname: ''
          };
          for (let i = 0; i < prop.profile_fields.length; i++) {
            if (prop.profile_fields[i].field) {
              if (prop.profile_fields[i].field.name === 'first_name') {
                name.fname = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'last_name') {
                name.lname = prop.profile_fields[i].value;
              }
            }
          }
          return {
            ...prop,
            name: name.fname + ' ' + name.lname
          };
        });

        this.payerList = newres;
        if (this.isEdit && this.payerList) {
          this.getOnePayment(this.offline._id);
        }
      }
    );
  }
  ParentSelected(event: any) {
    if (event && event.value) {
      this.offline.payer = event.value;

      let selected_parent_childlist = this.payerList.filter(
        t => t._id === event.value
      )[0].child;

      this.athleteList = selected_parent_childlist.map(prop => {
        let name: any = {
          fname: '',
          lname: ''
        };
        if (prop.profile_fields) {
          for (let i = 0; i < prop.profile_fields.length; i++) {
            if (prop.profile_fields[i].field) {
              if (prop.profile_fields[i].field.name === 'first_name') {
                name.fname = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'last_name') {
                name.lname = prop.profile_fields[i].value;
              }
            }
          }
        }
        return {
          ...prop,
          name: name.fname + ' ' + name.lname
        };
      });
    }
  }

  getpaymenttypeList() {
    this.offlinePaymentService
      .getTransactionList()
      .then((res: any) => {
        this.paymenttypeList = res.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  athleteSelected(event: any) {
    if (event && event.value) {
      this.offline.behalf = event.value;
      if (!this.isEdit) {
        this.getAllPackage(event.value);
      }
    }
  }
  getAllPackage(athlete_id) {
    this.offlinePaymentService
      .getSpecPackage(this.curClub, athlete_id)
      .then((res: any) => {
        this.packageList = res.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  selectedPackage(plan: any) {
    if (plan && !this.isEdit) {
      this.plan_detail = plan;

      if (this.plan_detail.installments.length) {
        // this.plan_detail.installment = true;
      } else {
        this.plan_detail.installment = false;
        this.plan_detail.disableno = true;
        this.getactivitypacakge();
      }
    }
  }
  getactivitypacakge() {
    this.offlinePaymentService
      .getActivityPackageInstallment(this.plan_detail._id)
      .then((res: any) => {
        this.offline.payments = res.data.map(prop => {
          return {
            ...prop,
            installments: prop._id,
            payedOn: null,
            status: 0,
            action: 'Assign',
            comments: ''
          };
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  getinstalmentList(event, id,installments_amount) {
    console.log("installments_amount @ getinstalmentList",installments_amount)
    this.offlinePaymentService
      .getInstallment(this.plan_detail._id, event,installments_amount)
      .then((res: any) => {
        this.offline.payments = res.data.map(prop => {
          return {
            ...prop,
            installments: prop._id,
            installments_amount:null,
            payedOn: null,
            status: 0,
            action: 'Assign',
            comments: ''
          };
        });
        this.offline.payments.sort((a, b) => {
          return (
            <any>new Date(b.installments_date) -
            <any>new Date(a.installments_date)
          );
        });

        this.offline.payments.reverse();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  selectedInstallment(event: any) {
    if (event) {
      console.log("selectedInstallment: ",event.installment_amount)
      this.getinstalmentList(event.installments_no, event._id,event.installment_amount);
      this.plan_detail.installment_number = event.installments_no;
      this.plan_detail.installment_id = event._id;
      this.plan_detail.total_amount_paid = 0;
      this.plan_detail.installments_amount = event.installment_amount;
      this.balAmount = this.plan_detail.package_amount;
      this.plan_detail.down_pay_amount = event.down_pay_amount;
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
  updateForm() {
    this.sharedService
      .showDialog(
        `Fields cannot be empty,
  enter data in all the fields and then click on update.`
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/offlinePayment');
        }
      });
  }

  validateSubmit() {
    this.sharedService
      .showDialog(
        'Fields cannot be empty, enter data in all the fields and then click on submit.'
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/offlinePayment');
        }
      });
  }
  submitPayment() {
    this.sharedService.showLoader = true;
    const temp = this.offline;
    console.log('offline=>',temp);
    let paiddata: boolean = true;
    temp.clubId = this.curClub;
    if (this.offline.payments.length) {
      temp.payments = this.offline.payments.map(prop => {
        if (prop.status === 1) {
          if (prop.payedOn) {
            prop.payedOn = moment(prop.payedOn).utc();
          }
          // if (prop.payedOn === null || prop.type === null) {
          //   paiddata = false;
          //   this.sharedService.showDialog(
          //     'PaidOn or type cannot be empty, enter data in all the data and then click on Save.'
          //   );
          // } else if (prop.payedOn && prop.type) {
          //   paiddata = true;
          //   prop.payedOn = moment(prop.payedOn).utc();
          // }
        }

        if (prop.status === 2) {
          if (prop.payedOn) {
            prop.payedOn = moment(prop.payedOn).utc();
          }
          // if (prop.payedOn === null || prop.type === null) {
          //   paiddata = false;
          //   this.sharedService.showDialog(
          //     'PaidOn or type cannot be empty, enter data in all the data and then click on Save.'
          //   );
          // } else if (prop.payedOn && prop.type) {
          //   paiddata = true;
          //   prop.payedOn = moment(prop.payedOn).utc();
          // }
        } else {
          prop.payedOn = null;
        }

        return {
          ...prop
        };
      });
    }

    if (paiddata) {
      this.offlinePaymentService
        .savePayment(temp)
        .then((res: any) => {
          this.sharedService.showLoader = false;
          this.sharedService.showMessage('Payment  Submitted Successfully');
          this.router.navigateByUrl('/offlinePayment');
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }

  updatePayment() {
    this.sharedService.showLoader = true;
    const temp = this.offline;
    let paiddata: boolean = false;
    temp.clubId = this.curClub;
    if (this.offline.payments.length) {
      temp.payments = this.offline.payments.map(prop => {
        if (prop.transactionDetails) {
          prop.transactionDetails = prop.transactionDetails._id;
        } else {
          delete prop.transactionDetails;
        }
        if (prop.status === 1 || prop.status === 2) {
          if (prop.payedOn) {
            prop.payedOn = moment(prop.payedOn).utc();
          }
        } else {
          prop.payedOn = null;
        }
        prop.installments = prop.installments._id;
        return {
          ...prop
        };
      });
    }

    this.offlinePaymentService
      .updateOfflinePayment(temp)
      .then((res: any) => {
        this.sharedService.showMessage('Payment  Updated Successfully');
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  //here is assign n unassign amount work 
  updateactionPayment(value, i) {
    if (value === 'Unassign') {
      this.offline.payments[i].action = 'Assign';
      this.offline.payments[i].status = 0;

      this.plan_detail.currenttotal_transaction =
        this.plan_detail.currenttotal_transaction +
        this.offline.payments[i].toassign;

    } else if (value === 'Assign') {
      if (
        this.offline.payments[i].installment_amount <=
        this.plan_detail.currenttotal_transaction
        
        //this.plan_detail.amount_paid=this.plan_detail.amount_paid-this.offline.payments[i].installment_amount
      ) {
        this.offline.payments[i].action = 'Unassign';
        this.offline.payments[i].status = 1;
        this.plan_detail.currenttotal_transaction =
          this.plan_detail.currenttotal_transaction -
          this.offline.payments[i].installment_amount;
        this.offline.payments[i].toassign = this.offline.payments[i].installment_amount;

        //this.plan_detail.finalamount_paid
        //this.plan_detail.amount_paid=this.plan_detail.amount_paid-this.offline.payments[i].installment_amount
        //this.plan_detail.bal_amount = this.plan_detail.amount_paid;
        
        //this.plan_detail.bal_amount = this.plan_detail.amount_paid-this.offline.payments[i].installment_amount;
        
        //this.plan_detail.amount_paid = this.plan_detail.amount_paid-this.offline.payments[i].installment_amount;
        
        //this.plan_detail.assigned =  this.plan_detail.currenttotal_transaction -this.plan_detail.bal_amount;
        //if(this.plan_detail.installment_amount) {
          //console.log(this.plan_detail.installment_amount);
        //}
      //   if (this.offline.payments[i].status === 'Partial')
      //       this.plan_detail.bal_amount = 0;
       } else if (
        this.offline.payments[i].installment_amount >
          this.plan_detail.currenttotal_transaction &&
        this.plan_detail.currenttotal_transaction !== 0
      ) {
        this.offline.payments[i].action = 'Unassign';
        this.offline.payments[i].status = 2;
        this.offline.payments[i].balance =
          this.offline.payments[i].installment_amount -
          this.plan_detail.currenttotal_transaction;
        this.plan_detail.assigned =
          this.offline.payments[i].installment_amount -
          this.plan_detail.currenttotal_transaction;
        this.offline.payments[
          i
        ].toassign = this.plan_detail.currenttotal_transaction;
        this.plan_detail.currenttotal_transaction = 0;
        this.offline.payments[i].balance = 0;
      } else {
        console.log("aEJASJKKSDNCK");
      }
    }
    
  }
  savePayments() {
      this.getStatus(status);
      //this.updateactionPayment(value , i);
      if (status !== 'pending') {
        
        //this.action.value = 'me';
        console.log("heloo");
      }
      console.log(this.getStatus(status));
  }

  EditRecord(element, i) {
    this.offline.payments[i].isEditrecord = true;
  }
  //here is the current transaction details
  TotalamountChange(amount) {
    if (amount) {
      this.plan_detail.currenttotal_transaction = this.plan_detail.amount_paid;
      if (this.isEdit) {
        this.balAmount =
          this.plan_detail.total_amount_paid - this.plan_detail.amount_paid;
        this.plan_detail.total_amount_paid =
          this.plan_detail.total_amount_paid +
          parseInt(this.plan_detail.amount_paid);
      }

      if (!this.isEdit) {
        this.balAmount =
          this.plan_detail.package_amount - this.plan_detail.amount_paid;
        this.plan_detail.total_amount_paid = parseInt(
          this.plan_detail.amount_paid
        );
        this.getinstalmentList(
          this.plan_detail.installment_number,
          this.plan_detail.installments_amount,
          this.plan_detail.installment_id
        );
      }
    }
  }
  installmentOption(value: any) {
    if (value === 0) {
      this.plan_detail.installment = true;
      this.plan_detail.downpayment = true;
      //console.log(this.plan_detail.installment.value);
      //console.log(this.plan_detail.downpayment.value);
    } else if (value === 1) {
      this.plan_detail.installment = false;

      this.getactivitypacakge();
    }
  }
}
