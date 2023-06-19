import { Component, OnInit } from '@angular/core';
import { ProfileTypeService } from '@app/profile-type/profile-type.service';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@app/shared/shared.service';
@Component({
  selector: 'app-add-profile-type',
  templateUrl: './add-profile-type.component.html',
  styleUrls: ['./add-profile-type.component.scss'],
  providers:[ProfileTypeService]
})
export class AddProfileTypeComponent implements OnInit {
  isEdit: Boolean = false;
  title: string = 'Add Profile Type';
  editProfileId: any;
  activeRouteSubscriber: any;

  profile_type: any = {
    name: '',
    description: '',
    order: '',
    abbr: '',
    priority: '',
    fields: []
  };
  selectedfield = [];
  fieldList: any;
  constructor(
    private router: Router,
    public ProfileTypeService: ProfileTypeService,
    public sharedService: SharedService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAllFields();
    if (this.router.url !== '/profile_type/add') {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.isEdit = true;
          this.editProfileId = param.profileId;
          this.getOneProfile(this.editProfileId);
        }
      );
    }
  }

  getAllFields() {
    this.sharedService.showLoader = true;
    this.ProfileTypeService.getFields().then((res: any) => {
      const prop = res.data;
      this.fieldList = prop;

      this.sharedService.showLoader = false;
      let arr = [];
      for (let i = 0; i < prop.length; i++) {
        if (prop[i].isDefault) {
          arr = arr.concat(prop[i]._id);
        }
      }
      if (!this.isEdit) {
        this.profile_type.fields = arr;
      }
    });
  }
  getfield(event) {
    this.profile_type.fields = event;
    this.selectedfield = event;
  }
  createProfiles() {
    this.sharedService.showLoader = true;
    this.ProfileTypeService.newProfileType(this.profile_type)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('profile successfully created');

        this.router.navigateByUrl('/profile_type');
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;
        console.log('err in profile creation', err);
      });
  }
  ProfileSubmit() {
    this.sharedService
      .showDialog(
        'Fields cannot be empty, enter data in all the fields and then click on submit.'
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/profile_type');
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
          this.router.navigateByUrl('/profile_type');
        }
      });
  }
  getOneProfile(id: any) {
    this.sharedService.showLoader = true;

    this.title = 'Edit Profile Type';

    this.ProfileTypeService.fetchOneProfile(id).then((e: any) => {
      this.profile_type = e.data;

      const fieldarr = [];
      for (let i = 0; i < e.data.fields.length; i++) {
        if (e.data.fields[i]._id) {
          fieldarr.push(e.data.fields[i]._id);
        }
      }
      this.profile_type.fields = fieldarr;
      this.sharedService.showLoader = false;
    });
  }

  cancelChanges() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
    Confirm if you want to leave this page?`
      )
      .subscribe(response => {
        if (response === true) {
          this.router.navigate(['/profile_type']);
        }
      });
  }

  editProfiles() {
    this.sharedService.showLoader = true;
    const temp = this.profile_type;

    this.ProfileTypeService.editProfileType(this.editProfileId, temp)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('profile successfully Updated');

        this.router.navigateByUrl('/profile_type');
      })
      .catch((err: any) => {
        // this.sharedService.showLoader = false;
        console.log('err in profile creation', err);
      });
  }
}
