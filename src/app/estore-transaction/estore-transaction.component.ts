import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '@app/estore-products/products.service';
import { SharedService } from '@app/shared/shared.service';
import { TransactionService } from '@app/estore-transaction/transaction.service';

@Component({
  selector: 'app-estore-transaction',
  templateUrl: './estore-transaction.component.html',
  styleUrls: ['./estore-transaction.component.scss']
})
export class EstoreTransactionComponent implements OnInit, AfterViewInit {
  keyup: boolean = false;
  curClub: any;
  dataSource = new MatTableDataSource();
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  displayedColumns: any = [
    'product',
    'invoice',
    'ponum',

    'category',
    'brand',
    'color',
    'size',
    'quantity',
    'price',
    'totalprice',
    'createdBy',
    'createdOn',
    'Actions'
  ];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private sharedService: SharedService
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
    this.getTransactions();
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
      this.transactionService
        .getFiltereTranscation(this.curClub, '&searchBy=name&values=' + value)
        .then((res: any) => {
          const newres = res.data.map(prop => {
            let h: any = {
              fname: '',
              lname: ''
            };
            if (prop.createdBy) {
              for (let i = 0; i < prop.createdBy.profile_fields.length; i++) {
                if (
                  prop.createdBy.profile_fields[i].field.name === 'first_name'
                ) {
                  h.fname = prop.createdBy.profile_fields[i].value;
                }
                if (
                  prop.createdBy.profile_fields[i].field.name === 'last_name'
                ) {
                  h.lname = prop.createdBy.profile_fields[i].value;
                }
              }
              h = h.fname + ' ' + h.lname;
            }

            return {
              ...prop,
              invoice: prop.invoice,
              ponum: prop.po_number,
              product: prop.name,
              category: prop.category.name,
              brand: prop.brand.name,
              color: prop.color.name,
              size: prop.size.size,
              quantity: prop.quantity,
              price: prop.purchase_price,
              totalprice: prop.total_price,
              createdBy: h,
              createdOn: prop.createdAt.split('T')[0]
            };
          });
          // this.tabledata = this.tabledata.concat(newres);
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

        this.getTransactions();
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
    this.transactionService
      .getSorteTransaction(this.curClub, this.skip, this.limit, value)
      .then((res: any) => {
        const newres = res.data.map(prop => {
          let h: any = {
            fname: '',
            lname: ''
          };
          if (prop.createdBy) {
            for (let i = 0; i < prop.createdBy.profile_fields.length; i++) {
              if (prop.createdBy.profile_fields[i].field.name === 'first_name') {
                h.fname = prop.createdBy.profile_fields[i].value;
              }
              if (prop.createdBy.profile_fields[i].field.name === 'last_name') {
                h.lname = prop.createdBy.profile_fields[i].value;
              }
            }
            h = h.fname + ' ' + h.lname;
          }

          return {
            ...prop,
            invoice: prop.invoice,
            ponum: prop.po_number,
            product: prop.name,
            category: prop.category.name,
            brand: prop.brand.name,
            color: prop.color.name,
            size: prop.size.size,
            quantity: prop.quantity,
            price: prop.purchase_price,
            totalprice: prop.total_price,
            createdBy: h,
            createdOn: prop.createdAt.split('T')[0]
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data['data'];
      });
  }
  getTransactions() {
    let data;
    this.transactionService
      .getTransactions(this.curClub, this.skip, this.limit)
      .then((res: any) => {
        // this.dataSource.data = res.data;

        const newres = res.data.map(prop => {
          let h: any = {
            fname: '',
            lname: ''
          };
          if (prop.createdBy) {
            for (let i = 0; i < prop.createdBy.profile_fields.length; i++) {
              if (prop.createdBy.profile_fields[i].field.name === 'first_name') {
                h.fname = prop.createdBy.profile_fields[i].value;
              }
              if (prop.createdBy.profile_fields[i].field.name === 'last_name') {
                h.lname = prop.createdBy.profile_fields[i].value;
              }
            }
            h = h.fname + ' ' + h.lname;
          }

          return {
            ...prop,
            invoice: prop.invoice,
            ponum: prop.po_number,
            product: prop.name,
            category: prop.category.name,
            brand: prop.brand.name,
            color: prop.color.name,
            size: prop.size.size,
            quantity: prop.quantity,
            price: prop.purchase_price,
            totalprice: prop.total_price,
            createdBy: h,
            createdOn: prop.createdAt.split('T')[0]
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data['data'];
        if (this.totalLength === 0) {
          this.totalLength = data['pagination'];
        }
      });
  }
  editTransaction(row: any) {
    // localStorage.curTransition = JSON.stringify(row);
    // this.router.navigate(['transaction/edit']);
    this.router.navigate(['transaction/edit/{{row._id}}'], {
      queryParams: { transactionId: row._id }
    });
  }
}
