import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@app/estore-categories/category.service';
import { SharedService } from '@app/shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  title: string = 'Add';
  isEdit: Boolean = false;
  categoryName: any;
  group_size: Array<any>;
  clubId: any;
  activeRouteSubscriber: any;
  categoryId: any;
  category: any = {
    size: ''
  };
  sizeList: Array<any>;
  selectedSizeId: any;
  selectedSizeGroupName: any;
  categoryData: any = {};
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private categoryService: CategoryService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getSizeGroup();
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.clubId = localStorage.super_cur_clubId;
    } else {
      this.clubId = localStorage.club_id;
    }

    if (this.router.url !== '/category/add') {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.categoryId = param.categoryId;
        },
        err => {}
      );
      this.getOneColor(this.categoryId);
    }
  }

  getOneColor(Id) {
    this.sharedService.showLoader = true;
    this.title = 'Edit Category';
    this.categoryService
      .fetchOnecategory(Id)
      .then((e: any) => {
        this.isEdit = true;
        this.sharedService.showLoader = false;

        this.category = {
          sizeId: e.data.size_group._id
        };
        this.categoryName = e.data.name;
        this.categoryId = e.data._id;
        this.category.size = e.data.size_group.group_name;
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;
      });
  }

  getSizeGroup() {
    const temp = {
      clubId: this.clubId
    };
    this.categoryService
      .getSizeGroup()
      .then((res: any) => {
        this.group_size = res.data;
      })
      .catch((err: any) => {});
  }

  getType(selCategory: any) {
    this.selectedSizeId = selCategory;
  }
  saveCategory() {
    this.sharedService.showLoader = true;
    const reqObj = {
      clubId: this.clubId,
      name: this.categoryName,
      size_group: this.selectedSizeId
    };

    this.categoryService
      .addCategory(reqObj)
      .then((res: any) => {
        this.categoryData = res.data;
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('Category created Successfully');
        this.router.navigateByUrl('/category');
      })
      .catch((err: any) => {});
  }

  updateCategory() {
    // if (!this.categoryName && !this.selectedSizeId) {
    //   this.sharedService
    //     .showDialog('Fields cannot be empty, enter all fields then click on update.')
    //     .subscribe(response => {
    //       if (response === '') {
    //         this.router.navigateByUrl('/category');
    //       }
    //     });
    // } else {
    this.sharedService.showLoader = true;
    const reqObj = {
      clubId: this.clubId,
      name: this.categoryName,
      size_group: this.selectedSizeId
    };
    this.categoryService
      .updateCategory(reqObj, this.categoryId)
      .then((res: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('Category updated Successfully');
        this.router.navigateByUrl('/category');
      })
      .catch((err: any) => {});
  }
  // }

  categorySubmit() {
    if (!this.categoryName && !this.selectedSizeId) {
      this.sharedService
        .showDialog(
          'Fields cannot be empty, enter data in all the fields and then click on submit.'
        )
        .subscribe(response => {
          if (response === '') {
            this.router.navigateByUrl('/category');
          }
        });
    }
  }

  updateEdit() {
    if (!this.categoryName && !this.selectedSizeId) {
      this.sharedService
        .showDialog(
          `Fields cannot be empty,
    enter data in all the fields and then click on update.`
        )
        .subscribe(response => {
          if (response === '') {
            this.router.navigateByUrl('/category');
          }
        });
    }
  }

  cancelCategory() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
      Confirm if you want to leave this page?`
      )
      .subscribe(response => {
        if (response === true) {
          this.router.navigate(['/category']);
        }
      });
  }
}
