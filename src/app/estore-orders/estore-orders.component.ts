import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from '@app/estore-orders/orders.service';
import { SharedService } from '@app/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estore-orders',
  templateUrl: './estore-orders.component.html',
  styleUrls: ['./estore-orders.component.scss']
})
export class EstoreOrdersComponent implements OnInit {
  keyup: boolean = false;
  curClub: any;
  dataSource = new MatTableDataSource();
  dataFromService = '';
  displayedColumns: any = [
    'name',
    'orderdate',
    'orderid',
    'transactionid',

    'product',
    'color',
    'size',
    'quantity',
    'price',
    'address',
    'Actions'
  ];
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  rowId: any;
  isEdit: Boolean;
  updateStatus: Array<any> = [];
  order = {
    location: '',
    status: ''
  };
  orderStatusDate: any;
  orderStatus: any = {};
  orderlocation: string;
  captureDate: Boolean;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  status = [
    { value: '0', viewValue: 'Update' },
    { value: '1', viewValue: 'Shipped' },
    { value: '2', viewValue: 'Delivered' },
    { value: '3', viewValue: 'Cancelled' }
  ];

  constructor(
    private sharedService: SharedService,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit() {
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.curClub = localStorage.super_cur_clubId;
    } else {
      this.curClub = localStorage.club_id;
    }
    if (!this.curClub) {
      this.sharedService
        .loginDialog('Please select sport & club from header')
        .subscribe(() => this.router.navigateByUrl('/home'));
    }
    if (this.curClub) {
      this.getAllOrders();
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
      this.ordersService
        .getFiltereOrder(this.curClub, '?searchBy=name&values=' + value)
        .then((res: any) => {
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
        this.getAllOrders();
      }
    }
  }
  namesort(event) {
    let data;
    let value;
    if (event.direction === 'desc') {
      value = '-' + event.active;
    } else {
      value = event.active;
    }
    this.ordersService
      .getSorteOrder(this.curClub, this.skip, this.limit, value)
      .then((res: any) => {
        data = res;

        this.dataSource.data = data['data'];
      });
  }
  getAllOrders() {
    this.sharedService.showLoader = true;
    let data;
    this.ordersService
      .getOrders(this.curClub, this.skip, this.limit)
      .then((res: any) => {
        this.sharedService.showLoader = false;

        data = res;

        this.dataSource.data = data['data'];
        if (this.totalLength === 0) {
          this.totalLength = data['pagination'];
        }
      })
      .catch((err: any) => {});
  }

  updateOrder(rowData: any, data: any) {
    // this.sharedService.dateDialog;
    this.sharedService.showLoader = true;
    const reqObj = {
      status: data
    };
    this.ordersService.updateOrder(rowData._id, reqObj).then((e: any) => {
      this.sharedService.showLoader = false;
      // this.getAllOrders();
      this.sharedService.dateDialog().subscribe((res: any) => {
        const data1 = `${new Date(res)}`;
        const arr = data1.split(' ');
        this.orderStatusDate = arr[1] + ' ' + arr[2] + ' ' + arr[3];
      });

      this.captureDate = true;
    });
  }

  getLocation(rowData: any) {
    this.order.location =
      rowData.location.address_line_1 +
      ' ' +
      rowData.location.address_line_2 +
      ' ' +
      rowData.location.city +
      ' ' +
      rowData.location.State +
      ' ' +
      rowData.location.zip;
  }
}
