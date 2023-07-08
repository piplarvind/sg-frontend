import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, FormBuilder } from '@angular/forms';
import { ClubsService } from '@app/clubs/clubs.service';
import { SharedService } from '@app/shared/shared.service';
import { ProfilesService } from '@app/profiles/profiles.service';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { ResourceService } from '@app/resource/resource.service';
import { AthletesService } from '@app/athletes/athletes.service';
import { ClubProfileService } from '@app/club-profile/club-profile.service';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';
@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
  
export class AddProfileComponent implements OnInit {

  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.India, CountryISO.UnitedKingdom];
  phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

  username_pattern: boolean = true;
  GenderList: any = [];
  rolesList: any = [];
  usertype: any;
  isDisabled: boolean = false;
  is_parents: boolean = false;
  // marked = false;
  // theCheckbox :boolean;
  getIsEdit: boolean = false;
  rolechangeWithisEdit: boolean = false;
  ageList: any;
  clubRoleList: any;
  mobile: string = '';
  home: String = '';
  invalidNumber: boolean;
  length: number;
  date: any;
  username: any;
  role_parent: any;
  ParentName = [];
  marked: boolean;
  seletected_parent: boolean = false;
  matcard_height: number = 700;
  approach_touch: any;
  height_inch: String = '';
  height_feets: String = '';
  reach_inch: String = '';
  reach_feets: String = '';
  approch_inch: String = '';
  approch_feets: String = '';
  check: boolean;
  college_image: any = '';
  college_img: any;
  positionList: any = [];
  athleteList: any = [];
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  logo: any = '';
  school_image_logo: any = '';
  regionsList: Array<any> = [];
  countryId: any = '';
  districtList: any;
  selectedregion: any;
  selectedregionId: any;
  selectedState: any;
  selectedStateId: any;
  selectedValidity: any;
  selectedCountry: any;
  selectedCountryId: any;
  selectedDistrict: any;
  selectedDistrictId: any;
  selectedAthleteId: any = [];
  club_img: any;
  tempFile: any;
  finalData: any = [];
  gernarlRolelist: any = [];
  form: UntypedFormGroup;
  isChecked: boolean = false;
  storePreviousData;
  objectProps;
  editProfilesId: string;
  activeRouteSubscriber: any;
  selectedUserRole: any = [];
  totalField: any = [];
  field: Boolean = false;
  categoriesSelected: any;
  unsubcribe: any;
  checkIfOthersAreSelected: boolean = false;
  isEdit: boolean = false;
  SeletedRole: any = [];
  title: string = 'Add User';
  fields: any = [];
  createfield: any = [];
  type: any = [];
  StatusList: any = [];
  data: any = {
    child: [],
    types: [],
    profile_fields: []
  };
  selectedFruitValues = '';
  phone = {
    number:''
  };
  name: any = [];
  school_img: any;
  groupedRoles: { [key: string]: any[] };

  constructor(
    private router: Router,
    public ProfilesService: ProfilesService,
    public sharedService: SharedService,
    public activatedRoute: ActivatedRoute,
    private clubService: ClubsService,
    public resourceService: ResourceService,
    public _DomSanitizationService: DomSanitizer,
    public athletesService: AthletesService,
    public clubProfileService: ClubProfileService
  ) {
    
  }

  ngOnInit() {
    this.getAllRoles();
    this.getGender();
    if (this.router.url === '/clubs/add') {
    }
    this.getCountries();
    this.getDistricts();
    this.getAllRegions();
    this.getAllAthletes();
    this.fetchPosition();
    this.getStatus();
    this.getAllClubRole();

    

    if (this.router.url !== '/profiles/add') {
      // this.coach = JSON.parse(sessionStorage.curCoach);
      // console.log('edit coach', this.coach);
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.editProfilesId = param.profileId;
          this.usertype = param.type;
          this.getOneProfile(this.editProfilesId);
        }
      );
    }
  }

  changePreferredCountries() {
		this.preferredCountries = [CountryISO.UnitedStates, CountryISO.India];
  }
  
  groupBy(array: any[], property: string): { [key: string]: any[] } {
    const groupedData: { [key: string]: any[] } = {};
    //console.log('array', array);
    array.forEach((item) => {
      const key = item[property];
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(item);
    });
    
    return groupedData;
  }

  

  checkbox1(e) {
    this.marked = e.checked;
  }
  getGender() {
    this.ProfilesService.getGenderList().then((res: any) => {
      this.GenderList = [...res.data];
    });
  }

  getAllAge(Id:any) {
    this.ProfilesService.getAgeListfilterGender(Id).then((res: any) => {
      this.ageList = [...res.data];

    });
  }

  getAllClubRole() {
    this.clubProfileService.getClubProfileTitleList('?').then((res: any) => {
      this.clubRoleList = [...res.data];
    });
  }

  getStatus() {
    this.athletesService
      .fetchStatus()
      .then((e: any) => {
        this.StatusList = e.data;
      })
      .catch((err: any) => {
        console.log('error while fetching handed', err);
      });
  }
  
  fetchPosition() {
    this.athletesService
      .fetchPosition()
      .then((e: any) => {
        this.positionList = e.data.filter(element => {
          return element.name !== ' ';
        });
      })
      .catch((err: any) => {
        console.log('error while fetching position', err);
      });
  }
  stateData(state: any) {
    this.selectedState = state.name;
    this.selectedStateId = state._id;
  }

  countryData(country: any) {
    this.selectedCountry = country.name;
    this.selectedCountryId = country._id;
    this.getStates(country._id);
  }

  getCountries() {
    this.clubService.getAllCountries().subscribe((res: any) => {
      this.countryList = [...res.data];
      // const defaultCountry = res.data.find(item => {
      //   return item.sortname.toLowerCase() === 'us';
      // });
      // console.log('defaultCountry._id', defaultCountry._id);
      // this.getStates(defaultCountry._id);
    });
  }
  getheightInches(e) {
    this.height_inch = e.target.value;
  }

  getheightFeets(event) {
    this.height_feets = event.target.value;
  }

  getreachFeets(event) {
    this.reach_feets = event.target.value;
  }
  getreachInches(event) {
    this.reach_inch = event.target.value;
  }
  getapproachFeets(event) {
    this.approch_feets = event.target.value;
  }
  getapproachInches(event) {
    this.approch_inch = event.target.value;
  }
  getStates(id: any) {
    this.selectedCountryId = id;
    this.clubService.getStates(this.selectedCountryId).subscribe((res: any) => {
      this.stateList = [...res.data];
    });
  }

  uploadImageFile($event: any, type: any) {}

  getAthlete(event) {
    if (event && event.value) {
      this.selectedAthleteId = event.value;
    }
  }
  getDistricts() {
    this.clubService.getDistricts().subscribe((res: any) => {
      this.districtList = [...res.data];
    });
  }

  districtData(district: any) {
    this.selectedDistrictId = district._id;
  }

  getAllRegions() {
    this.clubService.getRegions().subscribe((e: any) => {
      this.regionsList = [...e.data];
    });
  }

  regionData(region: any) {
    this.selectedregionId = region._id;
  }

  getClubImage(e: any) {
    let image = e.target.files[0];
    if (image.name) {
      const imageType = image.name.split('.')[1];
      // if (imageType === 'png' || imageType === 'jpeg' || imageType === 'jpg') {
      const that = this;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function(event: any) {
        image = event.target.result;
        const msg = 'Upload  User Photo';
        that.sharedService.showImageDialog(msg, e).subscribe(
          result => {
            let objectURL1 = URL.createObjectURL(result);
            that.club_img = objectURL1;

            that.logo = result.name;
            that.tempFile = result;

            const formData = new FormData();
            formData.append('image', that.tempFile);
            // formData.append('description', 'new Image');
            // if (
            //   localStorage.user_role === 'Super Admin' ||
            //   localStorage.user_role === 'Platform Admin'
            // ) {
            //   formData.append('clubId', localStorage.super_cur_clubId);
            // }
            that.sharedService.showLoader = true;
            that.resourceService
              .uploadProfileImage(formData)
              .subscribe(event => {
                if (event.type === HttpEventType.Response) {
                  let a: any = event.body;

                  that.logo = a.data;
                  that.sharedService.showLoader = false;
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
  getcollegeImage(e: any) {
    let image = e.target.files[0];
    if (image.name) {
      const imageType = image.name.split('.')[1];
      // if (imageType === 'png' || imageType === 'jpeg' || imageType === 'jpg') {
      const that = this;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function(event: any) {
        image = event.target.result;
        const msg = 'Upload College Logo';
        that.sharedService.showImageDialog(msg, e).subscribe(
          result => {
            let objectURL1 = URL.createObjectURL(result);
            that.college_img = objectURL1;

            that.college_image = result.name;
            that.tempFile = result;

            const formData = new FormData();
            formData.append('rl_image', that.tempFile);
            formData.append('description', 'new Image');
            if (
              localStorage.user_role === 'Super Admin' ||
              localStorage.user_role === 'Platform Admin'
            ) {
              formData.append('clubId', localStorage.super_cur_clubId);
            }

            that.ProfilesService.uploadImage(formData).subscribe(event => {
              if (event.type === HttpEventType.Response) {
                let a: any = event.body;

                that.college_image = a.data;
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

  school_image(e: any) {
    let image = e.target.files[0];
    if (image.name) {
      const imageType = image.name.split('.')[1];
      // if (imageType === 'png' || imageType === 'jpeg' || imageType === 'jpg') {
      const that = this;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function(event: any) {
        image = event.target.result;
        const msg = 'Upload School Logo';
        that.sharedService.showImageDialog(msg, e).subscribe(
          result => {
            let objectURL1 = URL.createObjectURL(result);
            that.school_img = objectURL1;

            that.school_image_logo = result.name;
            that.tempFile = result;

            const formData = new FormData();
            formData.append('rl_image', that.tempFile);
            formData.append('description', 'new Image');
            if (
              localStorage.user_role === 'Super Admin' ||
              localStorage.user_role === 'Platform Admin'
            ) {
              formData.append('clubId', localStorage.super_cur_clubId);
            }

            that.ProfilesService.uploadImage(formData).subscribe(event => {
              if (event.type === HttpEventType.Response) {
                let a: any = event.body;

                that.school_image_logo = a.data;
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
  inputChanged(e: any) {
    let s = '';
    if (e.length <= 10 && e.length > 0) {
      const first = e.substring(0, 3);
      const mid = e.substring(3, 6);
      const last = e.substring(6, 10);
      s = '(' + first + ') ' + mid + '-' + last;
      return s;
    }
  }

  formatMobile(event: any) {
    if (event) {
      let new_value = event.replace(/\D/g, '');

      if (new_value.length <= 10 && new_value) {
        this.mobile = new_value;
        this.mobile = this.inputChanged(this.mobile);
      }
      if (new_value.length === 0) {
        this.mobile = '';
      }
    }
  }

  formatHome(event?: any) {
    if (event) {
      let new_value = event.replace(/\D/g, '');

      if (new_value.length <= 10 && new_value) {
        this.home = new_value;
        this.home = this.inputChanged(this.home);
      }
      if (new_value.length === 0) {
        this.home = '';
      }
    }
  }
  extraxtNo(e: any) {
    let s = '';
    if (e && e !== '') {
      s = e.replace(/[^A-Z0-9]+/gi, '');
    }
    return s;
  }
  getOneProfile(id:any) {
    this.sharedService.showLoader = true;
    this.isEdit = true;
    this.title = 'Edit User Type';
    this.ProfilesService.fetchOneUser(id, 'cms_profile', this.usertype).then(
      (e: any) => {
        this.sharedService.showLoader = false;

        let section_arraysort = e.data.sections;
        section_arraysort = section_arraysort.sort((a, b) => {
          return a.order - b.order;
        });
        let sorteachProfile;
        for (let i = 0; i < section_arraysort.length; i++) {
          sorteachProfile = section_arraysort[i].profile_fields.sort((a, b) => {
            return a.order - b.order;
          });
          this.fields = this.fields.concat(sorteachProfile);
        }
        this.length = this.fields.length;

        this.field = true;

        this.length = this.fields.length;

        this.name = this.fields.map(n => n.field.name);

        const formGroup = {};

        let i = 0;
        let nullgrad_year: boolean = false;
        for (let prop of this.name) {
          formGroup[prop] = new UntypedFormControl(this.fields[i].value || '');
          if (prop === 'country') {
            const countryId = this.fields[i].value;
            this.getStates(countryId);
          }
          if (prop === 'gender' && this.fields[i].value) {
            this.gender(this.fields[i].value);
          }
          if (prop === 'mobile_phone' && this.fields[i].value.length > 5) {
            // this.fields[i].value = this.inputChanged(this.fields[i].value);
            this.mobile = this.inputChanged(this.fields[i].value);
          }
          if (prop === 'grad_year' && this.fields[i].value.length < 3) {
            nullgrad_year = true;
          }
          if (prop === 'home_phone' && this.fields[i].value.length > 5) {
            this.home = this.inputChanged(this.fields[i].value);
            this.fields[i].value = this.home;
          }
          if (prop === 'user_name' && this.fields[i].value) {
            this.username = this.fields[i].value;
          }
          if (prop === 'profile_image' && this.fields[i].value.length > 4) {
            this.logo = this.fields[i].value;
            this.club_img = `${environment.imageUrl}${this.fields[i].value}`;
          }
          if (prop === 'school_logo' && this.fields[i].value.length > 4) {
            this.school_image_logo = this.fields[i].value;
            this.school_img = `${environment.imageUrl}${this.fields[i].value}`;
          }
          if (prop === 'college_logo' && this.fields[i].value.length > 4) {
            this.college_image = this.fields[i].value;
            this.college_img = `${environment.imageUrl}${this.fields[i].value}`;
          }
          if (prop === 'approach_touch' && this.fields[i].value) {
            if (this.fields[i].value) {
              let a = this.fields[i].value.split(':');

              this.approch_feets = a[0];
              this.approch_inch = a[1];
            }
          }
          if (prop === 'height' && this.fields[i].value) {
            if (this.fields[i].value) {
              let a = this.fields[i].value.split(':');

              this.height_feets = a[0];
              this.height_inch = a[1];
            }
          }
          if (prop === 'reach' && this.fields[i].value) {
            if (this.fields[i].value) {
              let a = this.fields[i].value.split(':');

              this.reach_feets = a[0];
              this.reach_inch = a[1];
            }
          }
          if (prop === 'captain' && this.fields[i].value === 'true') {
            this.marked = true;
          }

          if (prop === 'athlete_of_interest' && this.fields[i].value) {
            let value = this.fields[i].value;
            let a = value.split(',');
            this.selectedAthleteId = a;
          }

          i++;
        }

        this.form = new UntypedFormGroup(formGroup);

        if (this.form.get('mobile_phone')) {
          this.form.get('mobile_phone').setValue(this.mobile);
        }
        if (this.form.get('home_phone')) {
          this.form.get('home_phone').setValue(this.home);
        }

        if (nullgrad_year) {
          this.form.get('grad_year').setValue('');
        }
        this.rolesList = this.rolesList.map((element, index) => {
          let obj = Object.assign({}, element);
          if (e.data.types.map(ele => ele._id).indexOf(element._id) > -1) {
            obj.checked = true;
          }
          return obj;
        });

        if (e.data.types[0].name === 'Athlete') {
          this.is_parents = true;
          let ath = this.rolesList.filter(t => t._id === e.data.types[0]._id);
          let gr = this.rolesList.filter(t => t.name === 'Family-Friends-Fans');
          this.rolesList = ath.concat(gr);
          this.matcard_height = 1100;
          if (e.data.parents) {
            for (let i = 0; i < e.data.parents.length; i++) {
              let fname = '',
                lname = '';
              for (
                let j = 0;
                j < e.data.parents[i].profile_fields.length;
                j++
              ) {
                if (e.data.parents[i].profile_fields[j].name === 'first_name') {
                  fname = e.data.parents[i].profile_fields[j].value;
                }
                if (e.data.parents[i].profile_fields[j].name === 'last_name') {
                  lname = e.data.parents[i].profile_fields[j].value;
                }
              }
              this.ParentName.push(fname + ' ' + lname);
            }
          }
        }

        if (e.data.types[0].name === 'Recruiter') {
          let rec = this.rolesList.filter(t => t._id === e.data.types[0]._id);
          let grn = this.rolesList.filter(t => t.name === 'Family-Friends-Fans');
          this.rolesList = rec.concat(grn);
        }
        for (let k = 0; k < e.data.types.length; k++) {
          if (e.data.types[k].name === 'Parent') {
            this.seletected_parent = true;
            if (e.data.child) {
              for (let j = 0; j < e.data.child.length; j++) {
                const child_id = e.data.child[j]._id;
                this.data.child.push(child_id);
              }
            }
            // this.data.child = e.data.child._id;
          } else {
            this.seletected_parent = false;
          }
        }
        this.SeletedRole = e.data.types.map(t => t._id);
        this.finalData = this.SeletedRole;
        this.isEdit = true;
      }
    );
  }

  onUpload(e) { }
  
  ProfileSubmit() {
    this.sharedService
      .showDialog(
        'Fields cannot be empty, enter data in all the fields and then click on submit.'
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/profiles');
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
          this.router.navigateByUrl('/profiles');
        }
      });
  }
  getChildAthletes(event?: any) {
    if (event.value) {
      this.data.child = event.value;
    }
  }
  uploadclubImage() {}
  // checkUNvalid() {
  //   let value1,
  //     value2,
  //     value3,
  //     v1: boolean = false,
  //     v2: boolean = false,
  //     v3: boolean = false;
  //   var arr2 = Object.values(this.form.value);
  //   for (let i = 0; i < this.fields.length; i++) {
  //     this.fields[i].value = arr2[i];
  //     if (this.isEdit) {
  //       if (this.fields[i].field.name === 'user_name') {
  //         value1 = this.fields[i].value;
  //       }
  //       if (this.fields[i].field.name === 'email') {
  //         value2 = this.fields[i].value;
  //       }
  //       if (this.fields[i].field.name === 'mobile_phone') {
  //         value3 = this.checkmobile;
  //       }
  //     }
  //   }

  //   if (
  //     this.username === value1 &&
  //     value2 === this.email &&
  //     value3 === this.mobile
  //   ) {
  //     this.editProfiles();
  //   }
  // if (this.username !== value1) {
  //   let vaule = {
  //     value: value1,
  //     check_by: 'user_name'
  //   };
  //   this.sharedService.showLoader = true;
  //   this.ProfilesService.checkusername(vaule)
  //     .then((e: any) => {
  //       this.sharedService.showLoader = false;

  //       if (e.status === 'Success') {
  //         v1 = true;
  //         if (v1 && v2 && v3) {
  //           this.editProfiles();
  //         }
  //       } else {
  //         this.sharedService.showMessage('user name already exist');
  //       }
  //     })
  //     .catch((err: any) => {
  //       // this.sharedService.showLoader = false;
  //       console.log('err in profile creation', err);
  //     });
  // } else if (this.username === value1) {
  //     v1 = true;
  //   }
  //   if (value2 && this.email !== value2) {
  //     let vaule = {
  //       value: value2,
  //       check_by: 'email'
  //     };
  //     this.sharedService.showLoader = true;
  //     this.ProfilesService.checkusername(vaule)
  //       .then((e: any) => {
  //         this.sharedService.showLoader = false;

  //         if (e.status === 'Success') {
  //           v2 = true;
  //           if (v1 && v2 && v3) {
  //             this.editProfiles();
  //           }
  //         } else {
  //           this.sharedService.showMessage('email already exist');
  //         }
  //       })
  //       .catch((err: any) => {
  //         // this.sharedService.showLoader = false;
  //         console.log('err in profile creation', err);
  //       });
  //   } else if (this.email === value2) {
  //     v2 = true;
  //   }
  //   if (this.mobile !== value3) {
  //     let vaule = {
  //       value: this.extraxtNo(this.mobile),
  //       check_by: 'mobile_phone'
  //     };
  //     this.sharedService.showLoader = true;
  //     this.ProfilesService.checkusername(vaule)
  //       .then((e: any) => {
  //         this.sharedService.showLoader = false;

  //         if (e.status === 'Success') {
  //           v3 = true;
  //           if (v1 && v2 && v3) {
  //             this.editProfiles();
  //           }
  //         } else {
  //           this.sharedService.showMessage('mobile number already exist');
  //         }
  //       })
  //       .catch((err: any) => {
  //         console.log('err in profile creation', err);
  //       });
  //   } else if (this.mobile === value3) {
  //     v3 = true;
  //   }
  // }
  checkUNvalid() {
    let value1;
    var arr2 = Object.values(this.form.value);
    for (let i = 0; i < this.fields.length; i++) {
      this.fields[i].value = arr2[i];
      if (this.fields[i].field.name === 'user_name') {
        value1 = this.fields[i].value;
      }
    }
    if (this.username === value1) {
      this.editProfiles();
    } else if (this.username !== value1) {
      let vaule = {
        value: value1,
        check_by: 'user_name'
      };
      this.sharedService.showLoader = true;
      this.ProfilesService.checkusername(vaule)
        .then((e: any) => {
          this.sharedService.showLoader = false;

          if (e.status === 'Success') {
            this.editProfiles();
          } else {
            this.sharedService.showMessage('user name already exist');
          }
        })
        .catch((err: any) => {
          // this.sharedService.showLoader = false;
          console.log('err in profile creation', err);
        });
    }
  }
  editProfiles() {
    this.createfield = [];

    let j = 0;
    this.data.types = this.SeletedRole;
    for (let i = 0; i < this.data.types.length; i++) {
      if (this.data.types[i] === this.role_parent) {
        j++;
      }
    }
    if (j <= 0) {
      this.data.child = [];
    }

    var arr2 = Object.values(this.form.value);
    console.log('arr2', this.form);
    if (this.getIsEdit) {
      for (let i = 0; i < this.fields.length; i++) {
        if (this.fields[i].name === 'first_name') {
          this.createfield.push({
            field: this.fields[i]._id,
            value:
              this.fields[i].value.charAt(0).toUpperCase() +
              this.fields[i].value.slice(1)
          });
        }
        if (this.fields[i].name === 'last_name') {
          this.createfield.push({
            field: this.fields[i]._id,
            value:
              this.fields[i].value.charAt(0).toUpperCase() +
              this.fields[i].value.slice(1)
          });
        }
        if (this.fields[i].name === 'mobile_phone') {
          this.createfield.push({
            field: this.fields[i]._id,
            //value: this.extraxtNo(this.mobile)
            value: this.extraxtNo(this.phone.number)
          });
        }
        if (this.fields[i].name === 'home_phone') {
          this.createfield.push({
            field: this.fields[i]._id,
            value: this.selectedFruitValues
          });
        }
        if (this.fields[i].name === 'profile_image') {
          this.createfield.push({
            field: this.fields[i]._id,
            value: this.logo
          });
        }
        if (this.fields[i].field.name === 'college_logo') {
          this.createfield.push({
            field: this.fields[i].field._id,
            value: this.college_image
          });
        }
        if (this.fields[i].field.name === 'school_logo') {
          this.createfield.push({
            field: this.fields[i].field._id,
            value: this.school_image_logo
          });
        }
        if (this.fields[i].field.name === 'approach_touch') {
          if (this.approch_feets && this.approch_inch) {
            this.createfield.push({
              field: this.fields[i].field._id,
              value: this.approch_feets + ':' + this.approch_inch
            });
          }
        }

        if (this.fields[i].field.name === 'reach') {
          if (this.reach_feets && this.reach_inch) {
            this.createfield.push({
              field: this.fields[i].field._id,
              value: this.reach_feets + ':' + this.reach_inch
            });
          }
        }
        if (this.fields[i].field.name === 'height') {
          if (this.height_feets && this.height_inch) {
            this.createfield.push({
              field: this.fields[i].field._id,
              value: this.height_feets + ':' + this.height_inch
            });
          }
        }
        if (this.fields[i].field.name === 'captain') {
          this.createfield.push({
            field: this.fields[i].field._id,
            value: this.marked
          });
        }
        if (this.fields[i].name === 'athlete_of_interest') {
          this.createfield.push({
            field: this.fields[i]._id,
            value: this.selectedAthleteId
          });
        }

        this.createfield.push({
          field: this.fields[i]._id,
          value: arr2[i]
        });
      }
    }
    if (this.isEdit) {
      for (let i = 0; i < this.fields.length; i++) {
        if (this.fields[i].field.name === 'first_name') {
          this.createfield.push({
            field: this.fields[i].field._id,
            value:
              this.fields[i].value.charAt(0).toUpperCase() +
              this.fields[i].value.slice(1)
          });
        }
        if (this.fields[i].field.name === 'last_name') {
          this.createfield.push({
            field: this.fields[i].field._id,
            value:
              this.fields[i].value.charAt(0).toUpperCase() +
              this.fields[i].value.slice(1)
          });
        }
        if (this.fields[i].field.name === 'mobile_phone') {
          this.createfield.push({
            field: this.fields[i].field._id,
            value: this.extraxtNo(this.mobile)
          });
        }
        if (this.fields[i].field.name === 'home_phone') {
          this.createfield.push({
            field: this.fields[i].field._id,
            value: this.selectedFruitValues
          });
        }
        if (this.fields[i].field.name === 'profile_image') {
          this.createfield.push({
            field: this.fields[i].field._id,
            value: this.logo
          });
        }
        if (this.fields[i].field.name === 'college_logo') {
          this.createfield.push({
            field: this.fields[i].field._id,
            value: this.college_image
          });
        }
        if (this.fields[i].field.name === 'school_logo') {
          this.createfield.push({
            field: this.fields[i].field._id,
            value: this.school_image_logo
          });
        }
        if (this.fields[i].field.name === 'approach_touch') {
          if (this.approch_feets && this.approch_inch) {
            this.createfield.push({
              field: this.fields[i].field._id,
              value: this.approch_feets + ':' + this.approch_inch
            });
          }
        }

        if (this.fields[i].field.name === 'reach') {
          if (this.reach_feets && this.reach_inch) {
            this.createfield.push({
              field: this.fields[i].field._id,
              value: this.reach_feets + ':' + this.reach_inch
            });
          }
        }
        if (this.fields[i].field.name === 'height') {
          if (this.height_feets && this.height_inch) {
            this.createfield.push({
              field: this.fields[i].field._id,
              value: this.height_feets + ':' + this.height_inch
            });
          }
        }
        if (this.fields[i].field.name === 'captain') {
          this.createfield.push({
            field: this.fields[i].field._id,
            value: this.marked
          });
        }
        if (this.fields[i].field.name === 'athlete_of_interest') {
          this.createfield.push({
            field: this.fields[i].field._id,
            value: this.selectedAthleteId
          });
        }

        this.createfield.push({
          field: this.fields[i].field._id,
          value: arr2[i]
        });
      }
    }

    function getUnique(arr, comp) {
      const unique = arr
        .map(e => e[comp])

        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter(e => arr[e])
        .map(e => arr[e]);

      return unique;
    }

    // this.data.profile_fields = this.createfield;

    this.createfield = getUnique(this.createfield, 'field');
    this.data.profile_fields = this.createfield;

    this.sharedService.showLoader = true;
    this.ProfilesService.editProfile(this.editProfilesId, this.data)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('User Updated Successfully');

        this.router.navigateByUrl('/profiles');
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;
        console.log('err in profile creation', err);
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
          this.router.navigate(['/profiles']);
        }
      });
  }

  onSubmit = async () => {
    this.createfield = [];
    const obj = await JSON.parse(localStorage.userDetails);

    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.data.club = localStorage.super_cur_clubId;
    } else {
      this.data.club = localStorage.club_id;
    }
    // console.table(this.fields);
    this.data.createdBy = obj._id;

    this.data.types = this.type;
    var arr2 = Object.values(this.form.value);

    for (let i = 0; i < this.fields.length; i++) {
      if (this.fields[i].field.name === 'profile_image') {
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.logo
        });
      }
      if (this.fields[i].field.name === 'college_logo') {
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.logo
        });
      }
      if (this.fields[i].field.name === 'school_logo') {
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.logo
        });
      }
      if (this.fields[i].field.name === 'approach_touch') {
        if (this.approch_feets && this.approch_inch) {
          this.createfield[i]?.push({
            field: this.fields[i].field._id,
            value: this.logo
          });
        }
      }
      if (this.fields[i].field.name === 'reach') {
        if (this.reach_feets && this.reach_inch) {
          this.createfield.push({
            field: this.fields[i].field._id,
            value: this.reach_feets + ':' + this.reach_inch
          });
        }
      }
      if (this.fields[i].field.name === 'height') {
        if (this.height_feets && this.height_inch) {
          this.createfield.push({
            field: this.fields[i].field._id,
            value: this.height_feets + ':' + this.height_inch
          });
        }
      }
      if (this.fields[i].field.name === 'captain') {
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.marked
        });
      }
      if (this.fields[i].field.name === 'athlete_of_interest') {
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.selectedAthleteId
        });
      }
      if (this.fields[i].field.name === 'mobile_phone') {
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.extraxtNo(this.mobile)
        });
      }
      if (this.fields[i].field.name === 'home_phone') {
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.selectedFruitValues
        });
      }

      this.createfield.push({
        field: this.fields[i].field._id,
        value: arr2[i]
      });
    }

    function getUnique(arr, comp) {
      const unique = arr
        .map(e => e[comp])

        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter(e => arr[e])
        .map(e => arr[e]);

      return unique;
    }

    // this.data.profile_fields = this.createfield;

    this.createfield = getUnique(this.createfield, 'field');
    this.data.profile_fields = this.createfield;

    this.sharedService.showLoader = true;
    this.ProfilesService.createProfile(this.data)
      .then((e: any) => {
        this.sharedService.showLoader = false;

        if (e.status === 'Failure') {
          this.sharedService.showMessage(e.message);
          this.createfield = [];
        } else {
          this.router.navigateByUrl('/profiles');
          this.sharedService.showMessage('User created successfully');
        }
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;
        console.log('err in profile creation', err);
      });
  }

  getAllRoles() {
    // this.sharedService.showLoader = true;

    this.ProfilesService.getRoles().then((res: any) => {
      const prop = res.data;

      this.rolesList = prop;
      this.gernarlRolelist = prop;
      this.categoriesSelected = prop;
      this.groupedRoles = this.groupBy(this.rolesList, 'group_role');
      // this.sharedService.showLoader prop
    });
  }

  getAllAthletes() {
    this.sharedService.showLoader = true;
    let tempValue: any;
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      tempValue = localStorage.super_cur_clubId;
    } else {
      tempValue = localStorage.club_id;
    }
    this.ProfilesService.getRoleList(tempValue, 'Athlete', 0, '').then(
      (res: any) => {
        this.sharedService.showLoader = false;
        this.athleteList = res.data;
        
        const newres = res.data.map((prop:any) => {
          let name: any = {
            fname: '',
            lname: ''
          };
          for (let i = 0; i < prop.profile_fields.length; i++) {
            if (prop.profile_fields[i].field) {
              if (prop.profile_fields[i].field.name === 'first_name') {
                name.fname = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'last_name') {
                name.lname = prop.profile_fields[i].value;
              }
            }
          }

          return {
            ...prop,
            name: name.fname + ' ' + name.lname
          };
        });
      }
    );
  }

  selectUser(user) {
    this.finalData = user;
    this.type = this.finalData;
    this.SeletedRole = this.finalData;
    let path: string = '';
    this.fields = [];
    for (let i = 0; i < this.finalData.length; i++) {
      path = path.concat('&types=' + this.finalData[i]);
    }
    this.ProfilesService.getfields(path).then((res: any) => {
      // this.fields = res.data;

      let section_arraysort = res.data;
      section_arraysort = section_arraysort.sort((a, b) => {
        return a.order - b.order;
      });
      let sorteachProfile;
      for (let i = 0; i < section_arraysort.length; i++) {
        sorteachProfile = section_arraysort[i].profile_fields.sort((a, b) => {
          return a.order - b.order;
        });
        this.fields = this.fields.concat(sorteachProfile);
      }

      for (let i = 0; i < this.fields.length; i++) {
        if (this.fields[i].field.name === 'country') {
          const ref_id = this.fields[i].field.lookupDetails.default_value;
          this.clubService.getAllCountries().subscribe((res: any) => {
            this.countryList = [...res.data];
            const defaultCountry = res.data.find(item => {
              return item.ref_id === ref_id;
            });
            const countryId = defaultCountry._id;
            this.selectedCountryId = countryId;
            this.getStates(countryId);
            this.field = true;

            if (this.form && this.form.value) {
              this.storePreviousData = this.form.value;
              let formControl = {};
              for (let x in this.storePreviousData) {
                formControl[x] = new UntypedFormControl(this.storePreviousData[x]);
              }
              this.form = new UntypedFormGroup(formControl);
            }

            this.length = this.fields.length;
            this.name = this.fields.map(n => n.field.name);
            const formGroup = {};
            let i = 0;
            for (let prop of this.name) {
              formGroup[prop] = new UntypedFormControl(
                this.storePreviousData
                  ? this.storePreviousData[prop]
                  : prop === 'country'
                  ? this.selectedCountryId
                  : ''
              );

              i++;
            }

            this.form = new UntypedFormGroup(formGroup);
          });
        }
      }
    });
  }

  stopUncheck(event, item) {
    console.log('event', event);
    console.log('item', item);
    if (this.finalData.length === 1 && this.finalData[0] === item._id) {
      event.preventDefault();
      return;
    }
  }

  

  
  toggleVisibility(e, user) {
    
    console.log('event', e);
    console.log('item', user);

    if (this.isEdit) {
      this.getIsEdit = true;
    }

    let gen: any = this.rolesList.filter(t => t.name === 'Family-Friends-Fans');
    let is_parent: any;
    if (e.checked) {
      if (user.name === 'Athlete') {
        let ath = this.rolesList.filter(t => t._id === user._id);
        let gr = this.rolesList.filter(t => t.name === 'Family-Friends-Fans');
        this.rolesList = ath.concat(gr);
        this.seletected_parent = false;
        this.is_parents = true;
        this.matcard_height = 1100;
        this.finalData = [];
      }
      if (user.name === 'Family-Friends-Fans') {
        this.rolesList = this.gernarlRolelist;
        this.finalData = [];
        this.finalData.push(user._id);
        this.seletected_parent = false;
        this.is_parents = false;
      }
      if (user.name === 'Parent') {
        this.seletected_parent = true;
        this.role_parent = user._id;
      }
      
      if (user.name === 'Recruiter') {
        let rec = this.rolesList.filter(t => t._id === user._id);
        let grn = this.rolesList.filter(t => t.name === 'Family-Friends-Fans');
        this.rolesList = rec.concat(grn);

        this.finalData = [];
      }
      if (user.name !== 'Family-Friends-Fans') {
        for (let i = 0; i < this.finalData.length; i++) {
          if (this.finalData[i] === gen[0]._id) {
            this.finalData.splice(i, 1);
          }
        }

        this.finalData.push(user._id);
      }
    } else {
      if (user.name === 'Parent') {
        this.seletected_parent = false;
      }
      if (user.name === 'Athlete') {
        this.is_parents = false;
      }
      let index = this.finalData.indexOf(user._id);
      this.finalData.splice(index, 1);
    }
    this.rolesList = this.rolesList.map((element, index) => {
      // let obj = Object.assign({}, element);
      if (this.finalData.indexOf(element._id) > -1) {
        element.checked = true;
      } else {
        element.checked = false;
      }
      return element;
    });

    this.selectUser(this.finalData);
  }

  gender(gen: string) {
    this.getAllAge(gen);
  }
}
