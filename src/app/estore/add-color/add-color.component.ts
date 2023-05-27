import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ColorService } from '@app/estore/color.service';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.scss']
})
export class AddColorComponent implements OnInit {
  colorName: any;
  clubId: any;
  color: any = {};
  colorId: any;
  title: string = 'ADD COLOR';
  activeRouteSubscriber: any;
  isEdit: Boolean = false;
  constructor(
    private router: Router,
    private colorService: ColorService,
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
    this.title = 'ADD COLOR';

    if (this.router.url !== '/estore/add') {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.colorId = param.colorId;
        },
        err => {
        }
      );
      this.getOneColor(this.colorId);
    }
  }

  getOneColor(Id) {
    this.sharedService.showLoader = true;
    this.title = 'Edit Color';
    this.colorService
      .fetchOneColor(Id)
      .then((e: any) => {
        this.isEdit = true;
        this.sharedService.showLoader = false;
        this.colorName = e.data.name;
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;
      });
  }

  saveColor() {
    if (!this.colorName) {
      this.sharedService
        .showDialog(
          'Field cannot be empty, enter color name then click on submit.'
        )
        .subscribe(response => {
          if (response === '') {
            this.router.navigateByUrl('/estore');
          }
        });
    } else {
      this.sharedService.showLoader = true;
      const reqObj = {
        clubId: this.clubId,
        name: this.colorName
      };
      this.colorService
        .addColor(reqObj)
        .then((e: any) => {
          this.sharedService.showLoader = false;
          this.sharedService.showMessage('Color saved Successfully');
          this.router.navigateByUrl('/estore');
        })
        .catch((err: any) => {
        });
    }
  }
  updateColor() {
    if (!this.colorName) {
      this.sharedService
        .showDialog(
          'Field cannot be empty, enter color name then click on update.'
        )
        .subscribe(response => {
          if (response === '') {
            this.router.navigateByUrl('/estore');
          }
        });
    } else {
      this.sharedService.showLoader = true;
      const reqObj = {
        clubId: this.clubId,
        name: this.colorName
      };
      this.colorService
        .updateColor(reqObj, this.colorId)
        .then((e: any) => {
          this.sharedService.showLoader = false;
          this.router.navigateByUrl('/estore');
          this.sharedService.showMessage('Color updated successfully');
        })
        .catch((err: any) => {
        });
    }
  }
}
