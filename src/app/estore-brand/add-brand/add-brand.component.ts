import { Component, OnInit } from '@angular/core';
import { BrandService } from '@app/estore-brand/brand.service';
import { SharedService } from '@app/shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {
  title: string = 'Add Brand';
  brandName: any;
  clubId: any;
  brand: any = {};
  brandId: any;
  isEdit: Boolean = false;
  brandData: any = {};
  activeRouteSubscriber: any;
  constructor(
    private brandService: BrandService,
    private router: Router,
    private sharedService: SharedService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.clubId = localStorage.super_cur_clubId;
    } else {
      this.clubId = localStorage.club_id;
    }

    if (this.router.url !== '/brand/add') {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.brandId = param.brandId;
        },
        err => {}
      );
      this.isEdit = true;

      this.fetchOneBrand(this.brandId);
    }

    this.brandName = this.brand.name;
  }

  fetchOneBrand(Id) {
    this.sharedService.showLoader = true;
    this.title = 'Edit Brand';
    this.brandService
      .fetchOneBrand(Id)
      .then((e: any) => {
        this.isEdit = true;
        this.sharedService.showLoader = false;

        this.brandName = e.data.name;
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;
      });
  }
  saveBrand() {
    if (!this.brandName) {
      this.sharedService
        .showDialog(
          'Field cannot be empty, enter brand name then click on submit.'
        )
        .subscribe(response => {
          if (response === '') {
            this.router.navigateByUrl('/brand');
          }
        });
    } else {
      this.sharedService.showLoader = true;
      const reqObj = {
        clubId: this.clubId,
        name: this.brandName
      };
      this.brandService
        .addBrand(reqObj)
        .then((res: any) => {
          this.brandData = res.data;
          this.sharedService.showLoader = false;
          this.sharedService.showMessage('Brand created successfully');
          this.router.navigateByUrl('/brand');
        })
        .catch((err: any) => {});
    }
  }

  updateBrand() {
    if (!this.brandName) {
      this.sharedService
        .showDialog(
          'Field cannot be empty, enter brand name then click on update.'
        )
        .subscribe(response => {
          if (response === '') {
            this.router.navigateByUrl('/brand');
          }
        });
    } else {
      this.sharedService.showLoader = true;
      const reqObj = {
        clubId: this.clubId,
        name: this.brandName
      };
      this.brandService
        .editBrand(reqObj, this.brandId)
        .then((e: any) => {
          this.sharedService.showLoader = false;
          this.router.navigateByUrl('/brand');
          this.sharedService.showMessage('Brand updated Successfully');
        })
        .catch((err: any) => {});
    }
  }
}
