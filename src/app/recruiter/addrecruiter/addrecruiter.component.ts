import { Component, OnInit } from '@angular/core';
import { TeamsService } from '@app/teams/teams.service';
import { ClubsService } from '@app/clubs/clubs.service';
import { UsersService } from '@app/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '@app/shared/shared.service';
import { AthletesService } from '@app/athletes/athletes.service';
import { ResourceService } from '@app/resource/resource.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ProfilesService } from '@app/profiles/profiles.service';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';
@Component({
  selector: 'app-addrecruiter',
  templateUrl: './addrecruiter.component.html',
  styleUrls: ['./addrecruiter.component.scss']
})
export class AddrecruiterComponent implements OnInit {
  showAthlete: any = [];
  age: any = '';
  title = 'Create Recruiter';
  length: any;
  mobile: string = '';
  college_image: any = '';
  college_img: any;
  school_image_logo: any = '';
  school_img: any;
  type: any;
  createfield: any = [];
  username: string;
  home: String = '';
  invalidNumber: boolean;
  stateList: Array<any>;
  activeRouteSubscriber: any;
  selectedAthleteId: any;
  isEdit = false;
  countryList: Array<any>;
  districtList: any;
  regionsList: Array<any> = [];
  name: any = [];
  form: FormGroup;
  logo: any = '';
  club_img: any;
  tempFile: any;
  fields: any = [];
  data: any = {
    types: [],
    profile_fields: []
  };
  athleteList: Array<any>;
  editRecruiterId: any;
  constructor(
    private teamService: TeamsService,
    private clubService: ClubsService,
    private userService: UsersService,
    private router: Router,
    public sharedService: SharedService,
    public athletesService: AthletesService,
    public activatedRoute: ActivatedRoute,
    public resourceService: ResourceService,
    public _DomSanitizationService: DomSanitizer,
    public ProfilesService: ProfilesService
  ) {}

  ngOnInit() {
    if (this.router.url !== '/recruiter/add') {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.editRecruiterId = param.recruiterId;
          this.type = param.type;
        }
      );

      this.getCountries();
      this.getDistricts();
      this.getAllRegions();
      this.getAllAthletes();
      this.getOneRecruiter(this.editRecruiterId);
    }
  }

  getOneRecruiter(id: any) {
    this.sharedService.showLoader = true;

    this.title = 'Edit Recruiter';

    this.ProfilesService.fetchOneUser(id, 'cms_recruiter', this.type)
      .then((e: any) => {
        this.sharedService.showLoader = false;

        this.data.types = e.data.types;

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
        this.name = this.fields.map(n => n.field.name);

        const formGroup = {};

        let i = 0;

        for (let prop of this.name) {
          formGroup[prop] = new FormControl(this.fields[i].value || '');
          if (prop === 'country' && this.fields[i].value) {
            const countryId = this.fields[i].value;
            this.getStates(countryId);
          }
          if (prop === 'mobile_phone' && this.fields[i].value.length > 5) {
            this.mobile = this.inputChanged(this.fields[i].value);
          }
          if (prop === 'home_phone' && this.fields[i].value.length > 5) {
            this.home = this.inputChanged(this.fields[i].value);
          }
          if (prop === 'user_name') {
            this.username = this.fields[i].value;
          }
          if (prop === 'profile_image' && this.fields[i].value.length > 4) {
            this.logo = this.fields[i].value;
            this.club_img = `${environment.imageUrl}${this.fields[i].value}`;
          }
          if (prop === 'school_logo' && this.fields[i].value > 3) {
            this.school_image_logo = this.fields[i].value;
            this.school_img = `${environment.imageUrl}${this.fields[i].value}`;
          }
          if (prop === 'college_logo' && this.fields[i].value > 3) {
            this.college_image = this.fields[i].value;
            this.college_img = `${environment.imageUrl}${this.fields[i].value}`;
          }
          if (prop === 'athlete_of_interest' && this.fields[i].value) {
            let value = this.fields[i].value;
            let a = value.split(',');
            this.selectedAthleteId = a;
          }
          if (prop === 'age' && this.fields[i].value) {
            this.age = this.fields[i].value;
          }
          i++;
        }

        this.form = new FormGroup(formGroup);

        if (this.form.get('mobile_phone')) {
          this.form.get('mobile_phone').setValue(this.mobile);
        }
        if (this.form.get('home_phone')) {
          this.form.get('home_phone').setValue(this.home);
        }

        this.isEdit = true;
      })
      .catch((err: any) => {
        console.log(err);
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
          this.router.navigate(['/parent']);
        }
      });
  }

  getAthlete(event) {
    if (event && event.value) {
      this.selectedAthleteId = event.value;
    }
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
    var arr2 = Object.values(this.form.value);

    for (let i = 0; i < this.fields.length; i++) {
      if (this.fields[i].field.name === 'mobile_phone') {
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.extraxtNo(this.mobile)
        });
      }
      if (this.fields[i].field.name === 'home_phone') {
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.extraxtNo(this.home)
        });
      }
      if (this.fields[i].field.name === 'profile_image') {
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.logo
        });
      }
      if (this.fields[i].field.name === 'school_logo') {
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.school_image_logo
        });
      }
      if (this.fields[i].field.name === 'college_logo') {
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.college_image
        });
      }
      if (this.fields[i].field.name === 'athlete_of_interest') {
        //console.log('this.selectedAthleteId', this.selectedAthleteId[0]); return;
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.selectedAthleteId
        });
      }
      if (this.fields[i].field.name === 'age') {
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.age
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

    this.createfield = getUnique(this.createfield, 'field');
    this.data.profile_fields = this.createfield;

    this.sharedService.showLoader = true;
    this.ProfilesService.editProfile(this.editRecruiterId, this.data)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('Recruiter successfully Updated');

        this.router.navigateByUrl('/recruiter');
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;
        console.log('err in profile creation', err);
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
    this.ProfilesService.getRoleListAlluser(tempValue, 'Athlete').then(
      (res: any) => {
        this.sharedService.showLoader = false;
        // this.athleteList = res.data;

        const newres = res.data.map(prop => {
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
        this.athleteList = newres;

        if (this.selectedAthleteId.length >= 0 && this.isEdit) {
          const arr = [];
          for (let i = 0; i < newres.length; i++) {
            for (let j = 0; j < this.selectedAthleteId.length; j++) {
              if (this.selectedAthleteId[j] === newres[i]._id) {
                arr.push(newres[i]);
              }
            }
          }
          this.showAthlete = arr;
        }

        // for (let i = 0; i < this.selectedAthleteId.length; i++) {
        //   let a = this.athleteList.filter(
        //     t => (t._id = this.selectedAthleteId[i])
        //   )[0];
        //   this.showAthlete = this.showAthlete.push(a);
        // }
      }
    );
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
        const msg = 'Upload Profile Photo';
        that.sharedService.showImageDialog(msg, e).subscribe(
          result => {
            let objectURL1 = URL.createObjectURL(result);
            that.club_img = objectURL1;

            that.logo = result.name;
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

            that.resourceService.uploadImage(formData).subscribe(event => {
              if (event.type === HttpEventType.Response) {
                let a: any = event.body;

                that.logo = a.data;
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

            that.resourceService
              .uploadProfileImage(formData)
              .subscribe(event => {
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

            that.resourceService
              .uploadProfileImage(formData)
              .subscribe(event => {
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
  getStates(id: any) {
    // this.selectedCountryId = id;
    // console.log(' this. ab ', this.selectedCountryId);
    this.clubService.getStates(id).subscribe((res: any) => {
      this.stateList = [...res.data];
    });
  }

  getDistricts() {
    this.clubService.getDistricts().subscribe((res: any) => {
      this.districtList = [...res.data];
    });
  }

  // districtData(district: any) {
  //   this.selectedDistrictId = district._id;
  // }

  getAllRegions() {
    this.clubService.getRegions().subscribe((e: any) => {
      this.regionsList = [...e.data];
    });
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
  extraxtNo(e: any) {
    let s = '';
    if (e && e !== '') {
      s = e.replace(/[^A-Z0-9]+/gi, '');
    }
    return s;
  }
  validateamount(text: any) {
    var phoneNo = '';
    for (let i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (ch >= '0' && ch <= '9') {
        phoneNo += ch;
      } else {
        this.age = '';
      }
    }

    setTimeout(() => {
      this.age = phoneNo;
    }, 0);
  }
}
