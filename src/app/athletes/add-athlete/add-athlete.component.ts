import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamsService } from '@app/teams/teams.service';
import { ClubsService } from '@app/clubs/clubs.service';
import { UsersService } from '@app/users/users.service';
import { ProfilesService } from '@app/profiles/profiles.service';
import { SharedService } from '@app/shared/shared.service';
import { AthletesService } from '@app/athletes/athletes.service';
import { ResourceService } from '@app/resource/resource.service';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { breakStatement } from '@babel/types';

@Component({
  selector: 'app-add-athlete',
  templateUrl: './add-athlete.component.html',
  styleUrls: ['./add-athlete.component.scss']
})
export class AddAthleteComponent implements OnInit {
  title: string = 'Edit Athlete';
  collage_name: string = '';
  mobile: any = '';
  signed_senior: boolean = false;
  clgarr: any = [];
  GenderList: any = [];
  selectedAthletePosition: any = [];
  home: any = '';
  handedList: any;
  StatusList: any;
  invalidNumber: boolean;
  type: any;
  length: any;
  marked = false;
  approach_touch: any;
  username: any;
  height_inch: any;
  height_feets: any;
  ParentName: any = [];
  reach_inch: any;
  reach_feets: any;
  approch_inch: any;
  approch_feets: any;
  editAthleteId: any;
  createfield: any = [];
  check: boolean;
  college_image: any = '';
  college_img: any;
  positionList: any = [];
  school_img: any;
  countryList: any = [];
  districtList: any;
  ageList: any;
  stateList: any = [];
  logo: any = '';
  school_image_logo: any = '';
  regionsList: Array<any> = [];
  club_img: any;
  tempFile: any;
  finalData: any = [];
  name: any = [];
  form: UntypedFormGroup;
  isChecked: boolean = false;
  activeRouteSubscriber: any;
  fields: any = [];
  data: any = {
    types: [],
    profile_fields: []
  };
  isEdit: boolean = false;
  athleteClubFeeList: any = [];
  planData: any = [];
  dataSource = new MatTableDataSource();
  displayedColumns: any = [
    'paid_date',
    'status',
    'installment_amount',
    'installments_type',  
    'payment_method',
    'notes',
    'createdBy',
    'createdAt',
    'Actions'
  ];
  owningAmount: any = 0.00;
  paidAmount: any = 0.00;
  behalf: any;
  payer: any;
  plan: any;

  @ViewChild(MatSort)

  sort: MatSort;

  constructor(
    private router: Router,
    private userService: UsersService,
    public sharedService: SharedService,
    public activatedRoute: ActivatedRoute,
    public athletesService: AthletesService,
    public resourceService: ResourceService,
    public _DomSanitizationService: DomSanitizer,
    public ProfilesService: ProfilesService,
    private clubService: ClubsService
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    if (this.router.url !== '/athletes/add') {
      if (this.userService.curUser === null) {
        this.router.navigateByUrl('/athletes');
      }
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.editAthleteId = param.athleteId;
          this.type = param.type;
        }
      );
      this.getStatus();
      this.getCountries();
      this.getDistricts();
      this.getAllRegions();
      this.fetchPosition();
      this.getHanded();

      // this.getAllAge();
      this.getGender();
      this.getOneAthlete(this.editAthleteId);
      this.athleteClubFees(this.editAthleteId, this.type);
    }
  }
  // getAllAge () {
  //   this.ProfilesService.getAgeList().then((res: any) => {
  //     this.ageList = [...res.data];
  //   });
  // }
  getGender() {
    this.ProfilesService.getGenderList().then((res: any) => {
      this.GenderList = [...res.data];
    });
  }

  getAllAge(Id) {
    this.ProfilesService.getAgeListfilterGender(Id).then((res: any) => {
      this.ageList = [...res.data];
    });
  }
  getOneAthlete(id: any) {
    this.sharedService.showLoader = true;
    this.ProfilesService.fetchOneUser(id, 'cms_athlete', this.type)
      .then((e: any) => {
        this.sharedService.showLoader = false;

        this.data.types = e.data.types;

        let section_arraysort = e.data.sections;
        section_arraysort = section_arraysort.sort((a, b) => {
          return a.order - b.order;
        });
        let sorteachProfile;
        for (let i = 0; i < section_arraysort.length; i++) {
          let index;
          sorteachProfile = section_arraysort[i].profile_fields.sort((a, b) => {
            return a.order - b.order;
          });

          this.fields = this.fields.concat(sorteachProfile);
          for (let n = 0; n < this.fields.length; n++) {
            if (this.fields[n].field.name === 'college_logo') {
              this.clgarr = this.clgarr.concat(this.fields[n]);
              this.fields.splice(n, 1);
            }
            if (this.fields[n].field.name === 'college_name') {
              // index = k;
              this.clgarr = this.clgarr.concat(this.fields[n]);
              this.fields.splice(n, 1);
            }
          }
        }

        for (let i = 0; i < this.clgarr.length; i++) {
          if (
            this.clgarr[i].field.name === 'college_logo' &&
            this.clgarr[i].value.length > 4
          ) {
            this.college_image = this.clgarr[i].value;
            this.college_img = `${environment.imageUrl}${this.clgarr[i].value}`;
          }
          if (this.clgarr[i].field.name === 'college_name') {
            this.collage_name = this.clgarr[i].value;
          }
        }
        this.length = this.fields.length;

        this.name = this.fields.map(n => n.field.name);

        const formGroup = {};

        let i = 0;
        let nullgrad_year: boolean = false;
        for (let prop of this.name) {
          formGroup[prop] = new UntypedFormControl(this.fields[i].value || '');

          if (prop === 'country' && this.fields[i].value) {
            const countryId = this.fields[i].value;
            this.getStates(countryId);
          }
          if (prop === 'position' && this.fields[i].value) {
            let value = this.fields[i].value;
            let a = value.split(',');
            this.selectedAthletePosition = a;
          }
          if (prop === 'grad_year' && this.fields[i].value.length < 3) {
            nullgrad_year = true;
          }

          if (prop === 'mobile_phone' && this.fields[i].value.length > 5) {
            this.mobile = this.inputChanged(this.fields[i].value);
          }
          if (prop === 'home_phone' && this.fields[i].value.length > 5) {
            this.home = this.inputChanged(this.fields[i].value);
          }
          if (prop === 'position' && this.fields[i].value.length > 2) {
            this.selectedAthletePosition = this.fields[i].value.split(',');
          }
          if (prop === 'user_name') {
            this.username = this.fields[i].value;
          }
          if (prop === 'gender' && this.fields[i].value.length > 3) {
            this.gender(this.fields[i].value);
          }
          if (prop === 'profile_image' && this.fields[i].value.length > 4) {
            this.logo = this.fields[i].value;
            this.club_img = `${environment.imageUrl}${this.fields[i].value}`;
          }
          if (prop === 'school_logo' && this.fields[i].value.length > 4) {
            this.school_image_logo = this.fields[i].value;
            this.school_img = `${environment.imageUrl}${this.fields[i].value}`;
          }
          if (prop === 'status' && this.fields[i].value.length > 4) {
            if (this.StatusList) {
              this.statuschnage(this.fields[i].value);
            }
          }
          if (prop === 'college_logo' && this.fields[i].value.length > 4) {
            this.college_image = this.fields[i].value;
            this.college_img = `${environment.imageUrl}${this.fields[i].value}`;
          }
          if (prop === 'approach_touch' && this.fields[i].value) {
            let a = this.fields[i].value.split(':');

            this.approch_feets = a[0];
            this.approch_inch = a[1];
          }
          if (prop === 'height' && this.fields[i].value) {
            let a = this.fields[i].value.split(':');

            this.height_feets = a[0];
            this.height_inch = a[1];
          }
          if (prop === 'reach' && this.fields[i].value) {
            let a = this.fields[i].value.split(':');

            this.reach_feets = a[0];
            this.reach_inch = a[1];
          }
          if (prop === 'captain') {
            if (this.fields[i].value === 'true') {
              this.marked = true;
            }
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
        this.isEdit = true;
        if (e.data.parents) {
          for (let i = 0; i < e.data.parents.length; i++) {
            let fname = '',
              lname = '';

            for (let j = 0; j < e.data.parents[i].profile_fields.length; j++) {
              if (
                e.data.parents[i].profile_fields[j].field.name === 'first_name'
              ) {
                fname = e.data.parents[i].profile_fields[j].value;
              }
              if (
                e.data.parents[i].profile_fields[j].field.name === 'last_name'
              ) {
                lname = e.data.parents[i].profile_fields[j].value;
              }
            }

            this.ParentName.push(fname + ' ' + lname);
          }
        }
      })
      .catch((err: any) => {
        console.log('err', err);
      });
  }

  private mapValidators(validators) {
    const formValidators = [];

    if (validators) {
      for (const validation of Object.keys(validators)) {
        if (validation === 'pattern') {
          formValidators.push(Validators.pattern);
        } else if (validation === 'min') {
          formValidators.push(Validators.min(validators[validation]));
        }
      }
    }

    return formValidators;
  }

  updateEdit() {
    this.sharedService
      .showDialog(
        `Fields cannot be empty,
    enter data in all the fields and then click on update.`
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/athletes');
        }
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
          this.router.navigate(['/athletes']);
        }
      });
  }
  checkbox1(e) {
    this.marked = e.checked;
  }

  getCountries() {
    this.clubService.getAllCountries().subscribe((res: any) => {
      this.countryList = [...res.data];
    });
  }
  fetchPosition() {
    this.athletesService
      .fetchPosition()
      .then((e: any) => {
        this.positionList = e.data
          .map(prop => {
            let positonview = '';
            if (prop.label && prop.abbr) {
              positonview = prop.label + ' ' + prop.abbr;
            }
            return {
              ...prop,
              positonview: positonview
            };
          })
          .filter(element => {
            return element.name !== ' ';
          });
      })
      .catch((err: any) => { });
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
    this.clubService.getStates(id).subscribe((res: any) => {
      this.stateList = [...res.data];
    });
  }
  countryData(country: any) {
    this.getStates(country);
  }
  uploadImageFile($event: any, type: any) { }

  getDistricts() {
    this.clubService.getDistricts().subscribe((res: any) => {
      this.districtList = [...res.data];
    });
  }
  getHanded() {
    this.athletesService
      .fetchHanded()
      .then((e: any) => {
        this.handedList = e.data;
      })
      .catch((err: any) => { });
  }
  getStatus() {
    this.athletesService
      .fetchStatus()
      .then((e: any) => {
        this.StatusList = e.data;
      })
      .catch((err: any) => { });
  }
  // districtData(district: any) {
  //   this.selectedDistrictId = district._id;
  // }

  getAllRegions() {
    this.clubService.getRegions().subscribe((e: any) => {
      this.regionsList = [...e.data];
    });
  }

  // regionData(region: any) {
  //   this.selectedregionId = region._id;
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
    // if (this.signed_senior) {
    //   this.fields.concat(this.clgarr);
    // }
    var arr2 = Object.values(this.form.value);
    for (let i = 0; i < this.fields.length; i++) {
      if (this.fields[i].field.name === 'mobile_phone') {
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.extraxtNo(this.mobile)
        });
      }
      if (this.fields[i].field.name === 'position') {
        this.createfield.push({
          field: this.fields[i].field._id,
          value: this.selectedAthletePosition
        });
      }
      if (this.fields[i].field.name === 'home_phone') {
        console.log('home_phone', this.home);
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
      // if (this.fields[i].field.name === 'college_logo') {
      //   this.createfield.push({
      //     field: this.fields[i].field._id,
      //     value: this.college_image
      //   });
      // }
      // if (this.fields[i].field.name === 'college_name') {
      //   this.createfield.push({
      //     field: this.fields[i].field._id,
      //     value: this.collage_name
      //   });
      // }
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

      this.createfield.push({
        field: this.fields[i].field._id,
        value: arr2[i]
      });
    }
    for (let i = 0; i < this.clgarr.length; i++) {
      if (this.clgarr[i].field.name === 'college_logo') {
        this.createfield.push({
          field: this.clgarr[i].field._id,
          value: this.college_image
        });
      }
      if (this.clgarr[i].field.name === 'college_name') {
        this.createfield.push({
          field: this.clgarr[i].field._id,
          value: this.collage_name
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

    this.createfield = getUnique(this.createfield, 'field');
    this.data.profile_fields = this.createfield;

    this.sharedService.showLoader = true;
    this.ProfilesService.editProfile(this.editAthleteId, this.data)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('Athlete successfully Updated');

        this.router.navigateByUrl('/athletes');
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;
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
    console.log('event::', event);
    if (event) {
      let new_value = event.replace(/\D/g, '');

      if (new_value.length <= 10 && new_value) {
        this.home = new_value;
        this.home = this.inputChanged(this.home);
      }
      console.log('new  value .length', new_value.length);

      if (new_value.length === 0) {
        this.home = '';
      }
      console.log('this.home phone::', this.home);
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
  getClubImage(e: any) {
    let image = e.target.files[0];
    if (image.name) {
      const imageType = image.name.split('.')[1];

      const that = this;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function (event: any) {
        image = event.target.result;
        const msg = 'Upload Profile Photo';
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

            that.resourceService
              .uploadProfileImage(formData)
              .subscribe(event => {
                if (event.type === HttpEventType.Response) {
                  let a: any = event.body;

                  that.logo = a.data;
                }
              });
          },
          err => { }
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
      reader.onload = function (event: any) {
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
          err => { }
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
      reader.onload = function (event: any) {
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
          err => { }
        );
      };
    }
  }
  multiplevalueselect(event) {
    if (event) {
      this.selectedAthletePosition = event;
    }
  }
  gender(gen: string) {
    this.getAllAge(gen);
  }
  statuschnage(event) {
    if (this.StatusList) {
      let signed_senior_id = this.StatusList.filter(
        t => t.name === 'signed_senior'
      )[0];

      if (event === signed_senior_id._id) {
        this.signed_senior = true;
      }
    }
  }

  //Athlete Club Fees
  athleteClubFees(athleteId, type) {
    this.clubService.getAthleteClubFeeList(athleteId, type).subscribe((res: any) => {
      this.planData = res.data[0];
      //this.dataSource.data = res.data[0]['payments'];
      // console.log('installll:', res.data[0]['payments']);
      var tempData = res.data[0]['payments'];
      var tempData2 = [];
      var tempData3 = [];
      var finalData = [];

      tempData.forEach(obj => {
        if (obj.status) {
          tempData2.push(obj);
        }
      });

      tempData2.sort(function (a, b) {
        if (a.status && a.transactionDetails !== undefined && b.transactionDetails !== undefined && a.transactionDetails !== null && b.transactionDetails !== null) {
          var dateA = new Date(a.transactionDetails.created_on), dateB = new Date(b.transactionDetails.created_on);
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          return 0;
        }
      });
      finalData.push(tempData2);

      tempData.forEach(obj => {
        if (!obj.status) {
          tempData3.push(obj);
        }
      });

      tempData3.sort(function (a, b) {
        if (a.status === 0) {
          var dateA = new Date(a.installments.installments_date), dateB = new Date(b.installments.installments_date);
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          return 0;
        }
      });
      finalData = tempData2.concat(tempData3);
      console.log('finalData:', finalData);
      finalData.forEach(obj => {
        
        this.payer = obj.payer;
        this.plan = obj.plan;
        this.dataSource.data.push(obj);        
        if (obj.status && obj.active) {
          if (obj.transactionDetails.amount !== null) {
            this.paidAmount = parseFloat(this.paidAmount) + parseFloat(obj.transactionDetails.amount);
          } else {
            this.paidAmount = parseFloat(this.paidAmount) + parseFloat('0.00');
          }
        } else {
          this.paidAmount = parseFloat(this.paidAmount) + parseFloat('0.00');
        }
        /*if (obj.installments.installments_type.installment_type === 'installment' || obj.installments.installments_type.installment_type === 'downpayment') {
          this.dataSource.data.push(obj);      
          if (obj.status) {
            if (obj.transactionDetails.amount !== null) {
              this.paidAmount = parseFloat(this.paidAmount) + parseFloat(obj.transactionDetails.amount);
            } else {
              this.paidAmount = parseFloat(this.paidAmount) + parseFloat('0.00');
            }
          } else {
            this.paidAmount = parseFloat(this.paidAmount) + parseFloat('0.00');
          }   
        } else {
          this.dataSource.data = [];
          this.dataSource.data.push(obj);
          if (obj.status) {
          if (obj.transactionDetails.amount !== null) {
            this.paidAmount = parseFloat(this.paidAmount) + parseFloat(obj.transactionDetails.amount);
          } else {
            this.paidAmount = parseFloat(this.paidAmount) + parseFloat('0.00');
          }
        } else {
          this.paidAmount = parseFloat(this.paidAmount) + parseFloat('0.00');
        }
          
        }*/

      });
      this.owningAmount = parseFloat(this.planData.planId.package_amount) - parseFloat(this.paidAmount);
    });
  }

  //Change installment pay status
  changePayStatus(row: any) {
    this.sharedService
      .showDialog('Are you sure you want to pay this installment?')
      .subscribe(response => {
        if (response !== '') {
          this.sharedService.showLoader = true;
          const temp = row;
          temp.status = 1;
          this.athletesService
            .payInstallment(temp)
            .then((e: any) => {
              this.sharedService.showLoader = false;
              this.sharedService.showMessage('Installment paid successfully.');
              window.location.reload();
            })
            .catch((err: any) => {
              this.router.navigate(['athletes/edit/{{row._id}}'], {
                queryParams: { athleteId: this.editAthleteId, type: this.type }
              });
              this.sharedService.showLoader = false;
              this.sharedService.showMessage("Installment can't be pay.");
            });
        }
      });

    // this.router.navigate(['athletes/installment/delete/{{userduesId}}'], {
    //   queryParams: {userduesId: userduesId, athleteId: this.editAthleteId, type: this.type }
    // });
  };

  //Edit installement date
  editInstallment(row: any) {
    this.router.navigate(['athletes/installment/edit/{{paymentId}}/{{installementId}}'], {
      queryParams: { paymentId: row._id, installementId: row.installments._id, athleteId: this.editAthleteId, type: this.type }
    });
  }

  //Delete installment 
  deleteInstallment(row: any) {
    this.sharedService
      .showDialog('Are you sure you want to delete this installment?')
      .subscribe(response => {
        if (response !== '') {
          this.sharedService.showLoader = true;
          const temp = row;
          temp.active = 0
          this.athletesService
            .removeInstallment(temp)
            .then((e: any) => {
              this.sharedService.showLoader = false;
              this.sharedService.showMessage('Installment deleted successfully.');
              window.location.reload();
            })
            .catch((err: any) => {
              this.router.navigate(['athletes/edit/{{row._id}}'], {
                queryParams: { athleteId: this.editAthleteId, type: this.type }
              });
              this.sharedService.showLoader = false;
              this.sharedService.showMessage("Installment can't be deleted.");
            });
        }
      });
  };

  //Re-store delete istallment
  restoreDeletedInstallment(row: any) {
    this.sharedService
      .showDialog('Are you sure you want to re-store this installment?')
      .subscribe(response => {
        if (response !== '') {
          this.sharedService.showLoader = true;
          const temp = row;
          temp.active = 1
          this.athletesService
            .removeInstallment(temp)
            .then((e: any) => {
              this.sharedService.showLoader = false;
              this.sharedService.showMessage('Installment re-stored successfully.');
              window.location.reload();
            })
            .catch((err: any) => {
              this.router.navigate(['athletes/edit/{{row._id}}'], {
                queryParams: { athleteId: this.editAthleteId, type: this.type }
              });
              this.sharedService.showLoader = false;
              this.sharedService.showMessage("Installment can't be re-sotre.");
            });
        }
      });
  }
  addOfflinePayment() {
    this.router.navigate(['offlinePayment/addOfflinePayment'], {
      queryParams: { athleteId: this.editAthleteId, type: this.type, plan: this.plan, payer: this.payer }
    });
  }
}
