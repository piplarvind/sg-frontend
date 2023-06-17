import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '@app/estore-products/products.service';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-estore-products',
  templateUrl: './estore-products.component.html',
  styleUrls: ['./estore-products.component.scss']
})
export class EstoreProductsComponent implements OnInit, AfterViewInit {
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
    'name',
    'category',
    'brand',
    'color',
    'size',
    'quantity',
    'price',
    'createdBy',
    'createdOn',
    'Actions'
  ];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private productsService: ProductsService,
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
        .loginDialog('Select the club')
        .subscribe(() => this.router.navigateByUrl('/home'));
    }
    if (this.curClub) {
      this.getAllProducts();
    }
  }

  ngAfterViewInit() {}
  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      value = value.split(' ').join('_');
      let data;
      this.productsService
        .getFiltereProduct(this.curClub, '&searchBy=name&values=' + value)
        .then((res: any) => {
          const newres = res.data.map(prop => {
            let fname = '',
              lname = '';
            if (prop.createdBy) {
              for (let i = 0; i < prop.createdBy.profile_fields.length; i++) {
                if (prop.createdBy.profile_fields[i].field) {
                  if (
                    prop.createdBy.profile_fields[i].field.name === 'first_name'
                  ) {
                    fname = prop.createdBy.profile_fields[i].value;
                  }
                  if (
                    prop.createdBy.profile_fields[i].field.name === 'last_name'
                  ) {
                    lname = prop.createdBy.profile_fields[i].value;
                  }
                }
              }
            }

            return {
              ...prop,
              name: prop.name,
              category: prop.category ? prop.category.name : '',
              brand: prop.brand ? prop.brand.name : '',
              color: prop.color ? prop.color.name : '',
              size: prop.size ? prop.size.size : '',
              quantity: prop.quantity,
              createdBy: fname + ' ' + lname,
              price: prop.selling_price,
              createdOn: prop.createdAt.split('T')[0]
            };
          });

          this.tabledata = newres;

          res.data = this.tabledata;

          data = res;

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
        this.getAllProducts();
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
    this.productsService
      .getSorteProduct(this.curClub, this.skip, this.limit, value)
      .then((res: any) => {
        const newres = res.data.map(prop => {
          let fname = '',
            lname = '';
          if (prop.createdBy) {
            for (let i = 0; i < prop.createdBy.profile_fields.length; i++) {
              if (prop.createdBy.profile_fields[i].field) {
                if (
                  prop.createdBy.profile_fields[i].field.name === 'first_name'
                ) {
                  fname = prop.createdBy.profile_fields[i].value;
                }
                if (
                  prop.createdBy.profile_fields[i].field.name === 'last_name'
                ) {
                  lname = prop.createdBy.profile_fields[i].value;
                }
              }
            }
          }

          return {
            ...prop,
            name: prop.name,
            category: prop.category ? prop.category.name : '',
            brand: prop.brand ? prop.brand.name : '',
            color: prop.color ? prop.color.name : '',
            size: prop.size ? prop.size.size : '',
            quantity: prop.quantity,
            createdBy: fname + ' ' + lname,
            price: prop.selling_price,
            createdOn: prop.createdAt.split('T')[0]
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data['data'];
      });
  }
  getAllProducts() {
    let data;
    this.productsService
      .getProducts(this.curClub, this.skip, this.limit)
      .then((res: any) => {
        // this.dataSource.data = res.data.reverse();
        const newres = res.data.map(prop => {
          let fname = '',
            lname = '';
          if (prop.createdBy) {
            for (let i = 0; i < prop.createdBy.profile_fields.length; i++) {
              if (prop.createdBy.profile_fields[i].field) {
                if (
                  prop.createdBy.profile_fields[i].field.name === 'first_name'
                ) {
                  fname = prop.createdBy.profile_fields[i].value;
                }
                if (
                  prop.createdBy.profile_fields[i].field.name === 'last_name'
                ) {
                  lname = prop.createdBy.profile_fields[i].value;
                }
              }
            }
          }

          return {
            ...prop,
            name: prop.name,
            category: prop.category ? prop.category.name : '',
            brand: prop.brand ? prop.brand.name : '',
            color: prop.color ? prop.color.name : '',
            size: prop.size ? prop.size.size : '',
            quantity: prop.quantity,
            createdBy: fname + ' ' + lname,
            price: prop.selling_price,
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
      })
      .catch((err: any) => {
        console.log('error', err);
      });
  }
  editProduct(rowData: any) {
    this.router.navigate(['products/edit/{{row._id}}'], {
      queryParams: { editProId: rowData._id }
    });
  }
  deleteProduct(rowData: any) {
    const temp = {
      clubId: this.curClub,
      active: false
    };
    this.productsService
      .deleteProduct(rowData._id, temp)
      .then((e: any) => {
        this.getAllProducts();
        this.sharedService.showMessage('Product deleted Successfully');
      })
      .catch((err: any) => {});
  }
}
