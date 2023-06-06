import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PackagesService } from '@app/packages/packages.service';
import { Router } from '@angular/router';
import { SharedService } from '@app/shared/shared.service';
import { environment } from '../../../environments/environment';
import { EventsService } from '@app/events/events.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatTableModule
} from '@angular/material';
import * as moment from 'moment';
@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit, AfterViewInit {
  localStorage = localStorage;
  showForm = false;
  package_id: any;
  tempId: any;
  temp: any;
  getpackagedata: any;
  packageType: Array<any> = [];
  eventType: Array<any> = [];
  showInstallment: Boolean;
  package: any = {
    name: '',
    createdBy: '',
    package_amount: '',
    validity_from: '',
    validity_to: '',
    description: '',
    late_pay_fee: '',
    late_pay_day: '',
    installments: []
  };
  errMsg: Boolean;
  errPayment: Boolean;

  tempInstall = {
    installments_no: '',
    installment_amount: '',
    down_pay_amount: ''
  };
  title: any = 'Create Event with Associated Fees';
  curClubId: any;
  isEdit = false;
  displayedColumns: any = ['installments', 'downPay', 'emi', 'Actions'];
  dataSource: Array<any> = [];
  showSave = false;

  dates = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28
  ];

  constructor(
    private packageservice: PackagesService,
    private router: Router,
    public sharedService: SharedService,
    private eventService: EventsService,
  ) {}

  ngOnInit() {
    // this.dataSource = this.package.installments;
    this.getPlantypes();
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.temp = localStorage.super_cur_club;
      this.tempId = localStorage.super_cur_clubId;
    } else {
      this.temp = localStorage.dbName;
      this.tempId = localStorage.club_id;
    }
    this.getEventtypes();
    if (
      this.router.url === '/packages/edit' &&
      sessionStorage.selected_package
    ) {
      this.sharedService.showLoader = true;
      this.title = 'Edit Event with Associated Fees';

      this.getpackagedata = JSON.parse(sessionStorage.selected_package);
      this.package_id = this.getpackagedata._id;
      this.getOnePayment(this.package_id);
      //  console.log('this.package', this.package);
      //  this.getPackageType(this.package.package_type);
      //  this.dataSource = this.package.installments;
      // // this.isEdit = true;
      // this.showForm = true;
      // if (this.package.package_type._id) {
      //   this.package.package_type = this.package.package_type._id;
      // }
      this.sharedService.showLoader = false;
    }
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  getOnePayment(id: any) {
    this.sharedService.showLoader = true;
    this.packageservice.getOnePackage(id).then(
      (res: any) => {
        this.sharedService.showLoader = false;
        this.package = res.data;
        this.getPackageType(this.package.package_type);
        this.dataSource = this.package.installments;
        this.isEdit = true;
        this.showForm = true;
        if (this.package.package_type._id) {
          this.package.package_type = this.package.package_type._id;
        }
      },
      (err: any) => {
        console.log('error occured', err);
      }
    );
  }
  createPackage(credentials: any) {
    this.sharedService.showLoader = true;
    const obj = JSON.parse(localStorage.userDetails);

    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.package.club = localStorage.super_cur_clubId;
    } else {
      this.package.club = localStorage.club_id;
    }
    this.package.validity_from = moment(this.package.validity_from).format(
      'YYYY-MM-DD HH:mm'
    );
    this.package.validity_to = moment(this.package.validity_to).format(
      'YYYY-MM-DD HH:mm'
    );
    this.package.createdBy = obj._id;
    this.package.installments = this.dataSource;
    this.packageservice.newPlan(this.package).subscribe(
      (res: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('plan created  successfully');
        this.router.navigate(['/packages']);
      },
      (err: any) => {
        console.log('error occured', err);
      }
    );
  }

  cancelChange() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
      Confirm if you want to leave this page?`
      )
      .subscribe(response => {
        if (response === true) {
          this.router.navigate(['/packages']);
        }
      });
  }

  updateEdit() {
    this.sharedService
      .showDialog(
        `Fields cannot be empty,
    senter data in all the fields and then click on update.`
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/packages');
        }
      });
  }

  packageSubmit() {
    this.sharedService
      .showDialog(
        'Fields cannot be empty, enter data in all the fields and then click on submit.'
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/packages');
        }
      });
  }

  editPackage() {
    this.sharedService.showLoader = true;
    this.package.installments = this.dataSource;

    const temp = this.package;

    this.packageservice.updatingPlan(temp).subscribe(
      (res: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('Plan updated successfully');
        this.router.navigate(['/packages']);
      },
      (err: any) => {
        console.log('error occured', err);
      }
    );
  }

  checkInstallment() {
    if (this.tempInstall.installments_no < '1') {
      //   this.errMsg = true;
      // } else {
      //   this.errMsg = false;
      this.sharedService.loginDialog('Value cannot be less than 1');
    }
  }

  checkPayment() {
    if (this.tempInstall.down_pay_amount < '1') {
      //   this.errPayment = true;
      // } else {
      //   this.errPayment = false;
      this.sharedService.loginDialog('Value cannot be less than 1');
    }
  }
  validatevalidity(text) {
    var phoneNo = '';
    for (let i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (ch >= '0' && ch <= '9') {
        phoneNo += ch;
      }
    }
    setTimeout(() => {
      this.package.validity = phoneNo;
    }, 0);
  }
  validateamount(text) {
    var phoneNo = '';
    for (let i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (ch >= '0' && ch <= '9') {
        phoneNo += ch;
      }
    }
    setTimeout(() => {
      this.package.package_amount = phoneNo;
    }, 0);
  }
  validatelateFee(text) {
    var phoneNo = '';
    for (let i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (ch >= '0' && ch <= '9') {
        phoneNo += ch;
      }
    }

    setTimeout(() => {
      this.package.late_pay_fee = phoneNo;
    }, 0);
  }
  validatelateFeeDay(text) {
    var phoneNo = '';
    for (let i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (ch >= '0' && ch <= '9') {
        phoneNo += ch;
      }
    }
    setTimeout(() => {
      this.package.late_pay_days = phoneNo;
    }, 0);
  }

  addInstallment() {
    if (
      !this.tempInstall.installments_no &&
      !this.tempInstall.down_pay_amount
    ) {
      this.sharedService.loginDialog(
        'Enter value in fields to add Installments'
      );
    }
    if (!this.tempInstall.installments_no && this.tempInstall.down_pay_amount) {
      this.sharedService.loginDialog('Enter No. of Installments');
    }
    if (this.tempInstall.installments_no && !this.tempInstall.down_pay_amount) {
      this.sharedService.loginDialog('Enter Down Payment');
    }
    if (
      this.tempInstall.down_pay_amount !== '' &&
      this.tempInstall.down_pay_amount > '0' &&
      this.tempInstall.installments_no !== '' &&
      this.tempInstall.installments_no > '0' &&
      this.tempInstall.down_pay_amount < this.package.package_amount
    ) {
      const updatedArray = this.dataSource;
      this.dataSource = updatedArray.concat(this.tempInstall);
      this.tempInstall = {
        installments_no: '',
        down_pay_amount: '',
        installment_amount: ''
      };
    }
  }

  saveInstall(elem: any) {
    this.showSave = true;
  }

  getComputedAmount(number: any, amount: any, element: any) {
    /*element.installment_amount = Math.round(
      (this.package.package_amount - amount) / number
    );*/
    element.installment_amount = ((this.package.package_amount - amount) / number).toFixed(2)
    return element.installment_amount;
  }

  deleteInstallment(element: any) {
    this.dataSource = this.updateArray(this.dataSource, element);
    this.sharedService.showMessage('Installment Deleted Successfully');
  }

  updateArray(curArrray: any, element: any) {
    return curArrray.filter(ele => {
      return (
        ele.installments_no !== element.installments_no ||
        ele.down_pay_amount !== element.down_pay_amount
      );
    });
  }

  restrictMinus(event: any) {
    const pattern = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getPlantypes() {
    // const temp: any = {
    //   clubId: ''
    // };
    // if (localStorage.user_role === 'Super Admin' || localStorage.user_role === 'Platform Admin') {
    //   temp.clubId = localStorage.super_cur_clubId;
    // } else {
    //   temp.clubId = localStorage.club_id;
    // }
    this.packageservice.planTypes().subscribe(
      (res: any) => {
        this.packageType = res.data;
      },
      (err: any) => {
        console.log('error this');
      }
    );
  }

  getEventtypes() {
    this.eventService.getEventTypes(this.tempId).subscribe(
      (res: any) => {
        this.eventType = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getPackageType(packageType: any) {
    if (packageType.package_name === 'Club Package') {
      this.showInstallment = true;
    } else {
      this.showInstallment = false;
    }
  }
}
