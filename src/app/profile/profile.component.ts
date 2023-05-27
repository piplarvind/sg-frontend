import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { ClubsService } from '@app/clubs/clubs.service';
import { SharedService } from '@app/shared/shared.service';
import { HttpEventType } from '@angular/common/http';
import { ResourceService } from '@app/resource/resource.service';
import { ProfilesService } from '@app/profiles/profiles.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetails: any = {
    profile_fields: {}
  };
  datafield: boolean = false;
  username: any = '';
  email: any = '';
  password: any = '';
  selectedRegion: any = 'option1';
  selectedCompany: any = 'option1';
  selectedPackagePeriod: any = 'option1';
  selectedCountryId: any;
  selectedStateId: any;
  countryList: any = [];
  stateList: any = [];
  firstName: any;
  lastName: any;
  userPic: any = '';
  // assets/user.png
  user = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    mobile: '',
    home_phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    name: ''
  };
  logo: any = '';
  club_img: any = '';
  data: any = {
    club: '',
    profile_fields: {}
  };
  constructor(
    private clubService: ClubsService,
    public ProfilesService: ProfilesService,
    public sharedService: SharedService,
    public resourceService: ResourceService,
    public _DomSanitizationService: DomSanitizer
  ) {}

  ngOnInit() {
    const obj = JSON.parse(localStorage.userDetails);

    if (obj) {
      this.getOneProfile(obj._id, obj.types[0]._id);
    }
  }

  testingFunc(e: any) {
    let image = e.target.files[0];
    if (image.name) {
      const imageType = image.name.split('.')[1];
      // if (imageType === 'png' || imageType === 'jpeg' || imageType === 'jpg') {
      const that = this;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function(event: any) {
        image = event.target.result;
        const msg = 'Upload Team Logo';
        that.sharedService.showImageDialog(msg, e).subscribe(
          result => {
            let objectURL1 = URL.createObjectURL(result);
            that.userPic = objectURL1;
            // console.log('club _img crop  ::', that.club_img);

            let tempFile = result;

            const formData = new FormData();
            formData.append('rl_image', tempFile);
            formData.append('description', 'new Image');
            if (
              localStorage.user_role === 'Super Admin' ||
              localStorage.user_role === 'Platform Admin'
            ) {
              formData.append('clubId', localStorage.super_cur_clubId);
            }

            that.resourceService.uploadImage(formData).subscribe(event => {
              if (event.type === HttpEventType.Response) {
                let a: any = event.body;
                that.logo = a.data;
                that.userPic = `${environment.imageUrl}${a.data}`;
                that.UpdateProfiles();
              }
            });
          },
          err => {
            console.log(err);
          }
        );
      };
    }
  }

  getOneProfile(id, type) {
    let profile_fields = [];
    this.ProfilesService.fetchOneUser(id, 'cms_profile', type).then(
      (e: any) => {
        this.userDetails = e.data;
        let section_arraysort = e.data.sections;
        section_arraysort = section_arraysort.sort((a, b) => {
          return a.order - b.order;
        });
        let sorteachProfile;
        for (let i = 0; i < section_arraysort.length; i++) {
          sorteachProfile = section_arraysort[i].profile_fields.sort((a, b) => {
            return a.order - b.order;
          });
          profile_fields = profile_fields.concat(sorteachProfile);
        }
        this.userDetails.profile_fields = profile_fields;
        if (this.userDetails.profile_fields) {
          for (let i = 0; i < this.userDetails.profile_fields.length; i++) {
            if (this.userDetails.profile_fields[i].field.name === 'first_name') {
              this.user.first_name = this.userDetails.profile_fields[i].value;
            }
            if (this.userDetails.profile_fields[i].field.name === 'last_name') {
              this.user.last_name = this.userDetails.profile_fields[i].value;
            }
            if (this.userDetails.profile_fields[i].field.name === 'email') {
              this.user.email = this.userDetails.profile_fields[i].value;
            }
            if (
              this.userDetails.profile_fields[i].field.name === 'mobile_phone'
            ) {
              this.user.mobile = this.userDetails.profile_fields[i].value;
            }
            if (this.userDetails.profile_fields[i].field.name === 'user_name') {
              this.user.name = this.userDetails.profile_fields[i].value;
            }
            if (this.userDetails.profile_fields[i].field.name === 'home_phone') {
              this.user.home_phone = this.userDetails.profile_fields[i].value;
            }
            if (
              this.userDetails.profile_fields[i].field.name === 'profile_image'
            ) {
              this.logo = this.userDetails.profile_fields[i].value;
              this.userPic = `${environment.imageUrl}${
                this.userDetails.profile_fields[i].value
              }`;
            }
            if (
              this.userDetails.profile_fields[i].field.name === 'country' &&
              this.userDetails.profile_fields[i].value
            ) {
              this.clubService.getAllCountries().subscribe((res: any) => {
                this.countryList = [...res.data];

                let country = this.countryList.filter(
                  t => t._id === this.userDetails.profile_fields[i].value
                )[0];

                this.selectedCountryId = country.name;
                this.clubService
                  .getStates(country._id)
                  .subscribe((res: any) => {
                    this.stateList = [...res.data];
                  });
              });
            }
            if (
              this.userDetails.profile_fields[i].field.name === 'state' &&
              this.userDetails.profile_fields[i].value
            ) {
              let state = this.stateList.filter(
                t => t._id === this.userDetails.profile_fields[i].value
              );
              this.selectedStateId = state.name;
            }
            if (
              this.userDetails.profile_fields[i].field.name === 'address_line_1'
            ) {
              this.userDetails.address_line_1 = this.userDetails.profile_fields[
                i
              ].value;
            }
            if (
              this.userDetails.profile_fields[i].field.name === 'address_line_2'
            ) {
              this.userDetails.address_line_2 = this.userDetails.profile_fields[
                i
              ].value;
            }
            if (this.userDetails.profile_fields[i].field.name === 'zip') {
              this.userDetails.zip = this.userDetails.profile_fields[i].value;
            }
          }
        }
        // this.userDetails = obj;
        this.datafield = true;
      }
    );
  }
  UpdateProfiles() {
    // let user = this.userDetails;
    this.data.club = this.userDetails.club;
    let createfield = [];

    for (let i = 0; i < this.userDetails.profile_fields.length; i++) {
      if (this.userDetails.profile_fields[i].field.name === 'profile_image') {
        createfield.push({
          field: this.userDetails.profile_fields[i].field._id,
          value: this.logo
        });
      } else {
        createfield.push({
          field: this.userDetails.profile_fields[i].field._id,
          value: this.userDetails.profile_fields[i].value
        });
      }
    }
    // console.log('this.fieldscreatefield ', createfield);

    this.data.profile_fields = createfield;

    this.sharedService.showLoader = true;
    this.ProfilesService.editProfile(this.userDetails._id, this.data)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('Image Updated Successfully');
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;
        console.log('err in profile creation', err);
      });
  }
}
