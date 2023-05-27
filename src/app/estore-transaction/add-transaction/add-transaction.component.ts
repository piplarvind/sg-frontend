import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@app/estore-products/products.service';
import { CategoryService } from '@app/estore-categories/category.service';
import { BrandService } from '@app/estore-brand/brand.service';
import { ColorService } from '@app/estore/color.service';
import { SharedService } from '@app/shared/shared.service';
import { TransactionService } from '@app/estore-transaction/transaction.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  curClub: any;
  isEdit: Boolean = false;
  productData: any = {};
  productList: Array<any>;
  productName: any;
  selectedProductName: any;
  selectedProductId: any;
  categoryList: Array<any>;
  categoryName: any;
  activeRouteSubscriber: any;
  selectedCategoryName: any;
  selectedCategoryId: any;
  brandList: Array<any>;
  brandName: any;
  selectedBrandName: any;
  selectedBrandId: any;
  transactionId: any;
  colorList: Array<any>;
  colorName: any;
  selectedColorName: any;
  selectedColorId: any;
  sizeList: Array<any>;
  size: any;
  selectedSizeName: any;
  selectedSizeId: any;
  transaction: any = {
    clubId: '',
    product_id: '',
    invoice: '',
    po_number: '',
    quantity: '',
    purchase_price: '',
    total_price: ''
  };
  filteredProductList: any = [];

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private colorService: ColorService,
    private brandService: BrandService,
    private router: Router,
    private sharedService: SharedService,
    private transactionService: TransactionService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.getAllBrands();
    // this.getAllColors();
    // this.getAllSizes();
    // this.getAllProducts();
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.curClub = localStorage.super_cur_clubId;
    } else {
      this.curClub = localStorage.club_id;
    }
    if (this.curClub) {
      this.getAllCategories();
    }

    if (this.router.url !== '/transaction/add') {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.transactionId = param.transactionId;
        }
      );
      this.fetchTransaction(this.transactionId);
    }
    // if (!this.router.url.includes('/transaction/add')) {
    //   this.isEdit = true;
    //   const id= JSON.parse(localStorage.getItem('curTransition'));

    // }
    // console.log(this.router.url.includes('/transaction/add'));
    // console.log(this.router.url);
  }
  fetchTransaction(id) {
    this.sharedService.showLoader = true;
    this.isEdit = true;
    this.transactionService
      .fetchTransaction(id)
      .then((res: any) => {
        const curr = res.data;
        console.log('curr', curr);
        this.transaction = {
          clubId: curr.clubId,
          product_id: curr.product_id,
          categoryId: curr.category._id,
          brandId: curr.brand._id,
          invoice: curr.invoice,
          po_number: curr.po_number,
          quantity: curr.quantity,
          purchase_price: curr.purchase_price,
          total_price: curr.total_price,
          colorId: curr.color._id,
          sizeId: curr.size._id,
          _id: curr._id
        };
        this.selectedSizeId = curr.size._id;
        this.selectedColorId = curr.color._id;
        this.selectedBrandId = curr.brand._id;
        this.selectedCategoryId = curr.category._id;

        this.checkProductDependencies('BRAND');
        this.checkProductDependencies('COLOR');
        this.checkProductDependencies('SIZE');
        this.checkProductDependencies('PRODUCT');

        console.log('Edit transaction ::', curr);
        console.log('Edit transaction ::', this.transaction);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  // getAllProducts() {
  //   this.productsService.getProducts()
  //     .then((res: any) => {
  //       this.productList = res.data;
  //     }).catch((err: any) => {
  //       console.log(err);
  //     });
  // }
  selectproduct(selProd: any) {
    this.selectedProductId = selProd.name;
    this.selectedProductName = selProd.name;
  }
  getAllCategories() {
    this.categoryService
      .getCategories(this.curClub, '', '')
      .then((res: any) => {
        this.categoryList = res.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  selectedCategory(selcategory: any) {
    this.selectedCategoryId = selcategory;
    this.checkProductDependencies('BRAND');
  }

  selCategory(category: any) {
    this.selectedCategoryId = category._id;
    this.checkProductDependencies('BRAND');
  }

  // getAllBrands() {
  //   this.brandService.getBrands(this.curClub)
  //     .then((res: any) => {
  //       this.brandList = res.data;
  //       console.log('this.brandList ---', this.brandList);
  //     }).catch((err: any) => {
  //       console.log(err);
  //     });
  // }
  selectedBrand(selBrand: any) {
    console.log('selected selBrand ::', selBrand);
    // this.selectedBrandName = selBrand.name;
    // this.selectedBrandId = selBrand._id;
    this.selectedBrandId = selBrand;
    this.checkProductDependencies('COLOR');
  }

  // getAllColors() {
  //   this.colorService.getColors(this.curClub)
  //     .then((res: any) => {
  //       this.colorList = res.data;
  //     }).catch((err: any) => {
  //       console.log(err);
  //     });
  // }
  selectedColor(selColor: any) {
    this.selectedColorId = selColor;
    this.checkProductDependencies('SIZE');
  }

  // getAllSizes() {
  //   const temp = {
  //     clubId: this.curClub,
  //   };
  //   this.categoryService.getSizeGroup()
  //     .then((res: any) => {
  //       this.sizeList = res.data;
  //     }).catch((err: any) => {
  //       console.log('err', err);
  //     });
  // }
  selectedSize(selSize: any) {
    this.selectedSizeId = selSize;
    this.checkProductDependencies('PRODUCT');
  }

  saveTransaction() {
    const temp = {
      clubId: this.curClub,
      product_id: this.transaction.product_id,
      invoice: this.transaction.invoice,
      po_number: this.transaction.po_number,
      quantity: this.transaction.quantity,
      purchase_price: this.transaction.purchase_price,
      total_price: this.transaction.total_price
    };
    this.transactionService
      .addTransaction(temp)
      .then((res: any) => {
        this.sharedService.showMessage('Transaction created Successfully ');
        this.router.navigateByUrl('/transaction');
      })
      .catch((err: any) => {});
  }

  filterProducts(params: any, type?: string) {
    this.transactionService.filterProduct(params).then(
      (res: any) => {
        // this.filteredProductList = res.data;
        if (type === 'BRAND') {
          this.brandList = res.data;
        } else if (type === 'COLOR') {
          this.colorList = res.data;
        } else if (type === 'SIZE') {
          this.sizeList = res.data;
        } else if (type === 'PRODUCT') {
          this.productList = res.data;
        }
      },
      (err: any) => {}
    );
  }

  checkProductDependencies(type: string) {
    let params = {};
    switch (type) {
      case 'PRODUCT':
        params['size'] = this.selectedSizeId;
        params['color'] = this.selectedColorId;
        params['brand'] = this.selectedBrandId;
        params['category'] = this.selectedCategoryId;
        break;
      case 'SIZE':
        params['color'] = this.selectedColorId;
        params['brand'] = this.selectedBrandId;
        params['category'] = this.selectedCategoryId;
        break;
      case 'COLOR':
        params['brand'] = this.selectedBrandId;
        params['category'] = this.selectedCategoryId;
        break;
      case 'BRAND':
        params['category'] = this.selectedCategoryId;
        break;
    }
    this.filterProducts(params, type);

    // if (this.selectedBrandId && this.selectedSizeId && this.selectedColorId && this.selectedCategoryId) {
    // }
  }

  updatetransaction() {
    const temp = {
      clubId: this.curClub,
      product_id: this.transaction.product_id,
      invoice: this.transaction.invoice,
      po_number: this.transaction.po_number,
      quantity: this.transaction.quantity,
      purchase_price: this.transaction.purchase_price,
      total_price: this.transaction.total_price
    };
    this.transactionService
      .updateTransaction(this.transaction._id, temp)
      .then((res: any) => {
        this.sharedService.showMessage('Transaction Updated Successfully ');
        this.router.navigateByUrl('/transaction');
      })
      .catch((err: any) => {});
  }

  cancelTransaction() {}

  submit() {
    this.sharedService
      .showDialog(
        'Fields cannot be empty, enter data in all the fields and then click on submit.'
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/transaction');
        }
      });
  }

  updateEdit() {
    this.sharedService
      .showDialog(
        `Fields cannot be empty,
    enter data in all the fields and then click on update.`
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/transaction');
        }
      });
  }

  cancel() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
      Confirm if you want to leave this page?`
      )
      .subscribe(response => {
        if (response === true) {
          this.router.navigate(['/transaction']);
        }
      });
  }
}
