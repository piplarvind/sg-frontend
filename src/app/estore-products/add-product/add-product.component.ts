import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@app/estore-products/products.service';
import { CategoryService } from '@app/estore-categories/category.service';
import { BrandService } from '@app/estore-brand/brand.service';
import { ColorService } from '@app/estore/color.service';
import { SharedService } from '@app/shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResourceService } from '@app/resource/resource.service';
import { Logger } from '@app/core';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  curClub: any;
  tempFile: any;
  isEdit: Boolean = false;
  imgUpload: any;
  selectedImg: any = '';
  sizeId: any;
  brandId: any;
  categoryGroupId: any;
  categoryId: any;
  productId: any;
  categorySizeList: Array<any>;
  product: any = {
    name: '',
    selling_price: '',
    shipping_price: '',
    tax: '',
    description: '',
    logo: '',
    stock: '0',
    estimated_delivery_date_min: '',
    estimated_delivery_date_max: ''
  };
  categoryList: Array<any>;
  genderList: Array<any>;
  genderName: any;
  genderId: any;
  editProductId: any;
  categoryName: any;
  selectedCategoryName: any;
  selectedCategoryId: any;
  activeRouteSubscriber: any;
  colorId: any;
  brandList: Array<any>;
  brandName: any;
  selectedBrandName: any;
  selectedBrandId: any;
  colorList: Array<any>;
  colorName: any;
  selectedColorName: any;
  selectedColorId: any;
  sizeList: Array<any>;
  size: any;
  selectedSizeName: any;
  selectedSizeId: any;

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private colorService: ColorService,
    private brandService: BrandService,
    public resourceService: ResourceService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
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
    this.getAllCategories();
    this.getAllBrands();
    this.getAllColors();
    this.getAllSizes();
    this.getGender();
    if (this.router.url !== '/products/add') {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.editProductId = param.editProId;
        }
      );
      this.fetchProduct(this.editProductId);
    }
  }

  fetchProduct(id: any) {
    this.sharedService.showLoader = true;
    this.isEdit = true;
    this.productsService
      .fetchProduct(id)
      .then((curr: any) => {
        this.productId = curr.data._id;
        this.product = curr.data;
        this.sharedService.showLoader = false;
        this.categoryId = this.product.category._id;
        this.genderId = this.product.gender[0]._id;
        this.brandId = this.product.brand._id;
        this.colorId = this.product.color._id;
        this.sizeId = this.product.size._id;
        this.product.stock = '0';
        if (this.product.image) {
          this.selectedImg = this.product.image;
        }
        if (this.product.category._id) {
          this.getAllCategories();

          const size = this.categoryList.filter(
            s => s._id === this.product.category._id
          )[0];
          this.selectCategory(size);
        }
      })
      .catch((err: any) => {});
  }

  getGender() {
    this.productsService
      .getGender()
      .then((e: any) => {
        this.genderList = e.data.filter(gender => gender.gender !== 'others');
      })
      .catch((err: any) => {});
  }

  selectedGender(data: any) {
    const selectGender = this.genderList.filter(f => f._id === data)[0];
    this.genderId = selectGender._id;
  }
  selGender(gender: any) {
    this.genderId = gender._id;
  }
  getAllCategories() {
    this.categoryService
      .getCategories(this.curClub, '', '')
      .then((res: any) => {
        this.categoryList = res.data;
      })
      .catch((err: any) => {});
  }
  selectedCategory(selcategory: any) {
    const groupSize = this.categoryList.filter(l => l._id === selcategory)[0];
    this.categoryGroupId = groupSize.size_group._id;
    if (this.categoryGroupId) {
      this.categoryService
        .getSizeList(this.categoryGroupId)
        .then((res: any) => {
          this.categorySizeList = res.data;
        })
        .catch((err: any) => {});
    }
    this.selectedCategoryId = selcategory;
  }

  selectCategory(category: any) {
    this.categoryGroupId = category.size_group._id;
    if (this.categoryGroupId) {
      this.categoryService
        .getSizeList(this.categoryGroupId)
        .then((res: any) => {
          this.categorySizeList = res.data;
        })
        .catch((err: any) => {});
    }
    this.selectedCategoryId = category._id;
  }

  getList() {}
  getAllBrands() {
    this.brandService
      .getBrands(this.curClub, '', '')
      .then((res: any) => {
        this.brandList = res.data;
      })
      .catch((err: any) => {});
  }
  selectedBrand(selBrand: any) {
    this.selectedBrandId = selBrand;
  }

  getAllColors() {
    this.colorService
      .getColors(this.curClub, '', '')
      .then((res: any) => {
        this.colorList = res.data;
      })
      .catch((err: any) => {});
  }
  selectedColor(selColor: any) {
    this.selectedColorId = selColor;
  }
  selColor(color: any) {
    this.selectedColorId = color._id;
  }

  getAllSizes() {
    const temp = {
      clubId: this.curClub
    };
    this.categoryService
      .getSizeGroup()
      .then((res: any) => {
        this.sizeList = res.data;
      })
      .catch((err: any) => {});
  }
  selectedSize(selSize: any) {
    this.selectedSizeId = selSize;
  }
  selSize(size: any) {
    this.selectedSizeId = size._id;
  }
  saveProduct() {
    const temp = {
      selling_price: this.product.selling_price,
      shipping_price: this.product.shipping_price,
      description: this.product.description,
      brand: this.selectedBrandId,
      size: this.selectedSizeId,
      color: this.selectedColorId,
      category: this.selectedCategoryId,
      tax: this.product.tax,
      image: this.product.logo,
      name: this.product.name,
      clubId: this.curClub,
      gender: this.genderId,
      estimated_delivery_date_min: this.product.estimated_delivery_date_min,
      estimated_delivery_date_max: this.product.estimated_delivery_date_max
    };
    this.productsService
      .addProduct(temp)
      .then((res: any) => {
        this.sharedService.showMessage('Product created successfully');
        this.router.navigateByUrl('/products');
      })
      .catch((err: any) => {});
  }

  updateProduct() {
    const temp = {
      selling_price: this.product.selling_price,
      shipping_price: this.product.shipping_price,
      description: this.product.description,
      brand: this.brandId,
      color: this.colorId,
      category: this.categoryId,
      tax: this.product.tax,
      image: this.product.logo,
      name: this.product.name,
      clubId: this.curClub,
      gender: this.genderId,
      quantity: this.product.quantity,
      size: this.sizeId,
      estimated_delivery_date_min: this.product.estimated_delivery_date_min,
      estimated_delivery_date_max: this.product.estimated_delivery_date_max
    };
    this.productsService
      .updateProduct(temp, this.productId)
      .then((res: any) => {
        this.sharedService.showMessage('Product updated Successfully');
        this.router.navigateByUrl('/products');
      })
      .catch((err: any) => {});
  }

  getImageDetail(e: any) {
    this.imgUpload = e.target.files[0];
    this.selectedImg = e.target.files[0].name;
    let image = e.target.files[0];
    if (image.name) {
      const imageType = image.name.split('.')[1];
      const that = this;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function(event: any) {
        image = event.target.result;
        const msg = 'Upload Product Image Successfully';
        that.sharedService.showImageDialog(msg, e).subscribe(
          result => {
            that.product.logo = result.name;
            that.tempFile = result;
          },
          err => {}
        );
      };
    }
  }

  uploadImage() {
    const formData = new FormData();
    // formData.append('rl_image', this.imgUpload);
    formData.append('rl_image', this.tempFile);
    formData.append('description', 'new Image');
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      formData.append('clubId', localStorage.super_cur_clubId);
    }
    this.sharedService.showLoader = true;
    this.resourceService.uploadImage(formData).subscribe((event: any) => {
      if (event.type === HttpEventType.Response) {
        let a: any = event.body;

        this.product.logo = a.data;
        this.sharedService.showMessage('Image uploaded Successfully ');
      }

      this.sharedService.showLoader = false;
    });
  }

  productSubmit() {
    this.sharedService
      .showDialog(
        'Fields cannot be empty, enter data in all the fields and then click on submit.'
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/products');
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
          this.router.navigateByUrl('/products');
        }
      });
  }
  cancelProduct() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
      Confirm if you want to leave this page?`
      )
      .subscribe(response => {
        if (response === true) {
          this.router.navigate(['/products']);
        }
      });
  }
}
