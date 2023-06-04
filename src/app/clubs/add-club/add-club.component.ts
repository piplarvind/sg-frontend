import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import { ClubsService } from '@app/clubs/clubs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
// import { UsersService } from '@app/users/users.service';
import { SharedService } from '@app/shared/shared.service';
import { headerCompRef } from '@app/core/shell/header/header.component';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { ResourceService } from '@app/resource/resource.service';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';
import { ProfilesService } from '@app/profiles/profiles.service';
@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.scss']
})
export class AddClubComponent implements OnInit {
  title: any = 'Create Club';
  clubLogo = '';
  tempFile: any = '';
  club_img: any;
  sportList: any;
  districtList: any;
  invalidEmail: any;
  invalidNumber: Boolean;
  club: any = {
    sport:'',
    club_code: '',
    name: '',
    // first_name: '',
    // last_name: '',
    website: '',
    country: '',
    info: '',
    address: '',
    // contact_no: '',
    // validity: '',
    color: '',
    // email: '',
    members: '',
    message: '',
    total_teams: '',
    region: ''
  };
  selectedSportId: any;
  selectedregion: any;
  selectedregionId: any;
  selectedState: any;
  selectedStateId: any;
  selectedValidity: any;
  selectedCountry: any;
  selectedCountryId: any;
  selectedDistrict: any;
  selectedDistrictId: any;
  editClubId: any;
  activeRouteSubscriber: any;
  isEdit = false;
  showImage: Boolean = false;
  dataSource = new MatTableDataSource();
  displayedColumns: any = ['name', 'email', 'mobile'];
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  regionsList: Array<any> = [];
  countryId: any = '';
  adminList: Array<any> = [];
  validityList = [
    { value: 0.6, viewValue: '6 months' },
    { value: 1, viewValue: '1 year' },
    { value: 2, viewValue: '2 year' }
  ];
  // isLoading = true;
  constructor(
    private router: Router,
    private clubService: ClubsService,
    private ProfilesService: ProfilesService,
    // public service: UsersService,
    // public userService: UsersService,
    public sharedService: SharedService,
    public activatedRoute: ActivatedRoute,
    public _DomSanitizationService: DomSanitizer,
    public resourceService: ResourceService,
    private ref: ChangeDetectorRef // private headerComp: HeaderComponent
  ) {}

  ngOnInit() {
    if (this.router.url === '/clubs/add') {
      this.clubService.getAllCountries().subscribe((res: any) => {
        this.countryList = [...res.data];
        const defaultCountry = res.data.find(item => {
          return item.ref_id === '231';
        });
        const countryId = defaultCountry._id;
        this.selectedCountryId = countryId;
        this.getStates(countryId);
      });
    }
    this.getSports();
    this.getCountries();
    this.getDistricts();
    this.getAllRegions();
    if (this.router.url !== '/clubs/add') {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.editClubId = param.editClubId;
        }
      );
      this.getOneClub(this.editClubId);
      this.getAdmin(this.editClubId);
    }
  }
  getAdmin(id) {
    this.ProfilesService.getRoleListAlluser(id, 'Club_Admin').then(
      (res: any) => {
        // this.athleteList = res.data;

        const newres = res.data.map(prop => {
          let name: any = {
              fname: '',
              lname: ''
            },
            email: string = '',
            phone: any = '';

          for (let i = 0; i < prop.profile_fields.length; i++) {
            if (prop.profile_fields[i].field) {
              if (prop.profile_fields[i].field.name === 'first_name') {
                name.fname = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'last_name') {
                name.lname = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === 'email') {
                email = prop.profile_fields[i].value;
              }
              if (
                prop.profile_fields[i].field.name === 'mobile_phone' &&
                prop.profile_fields[i].value.length > 3
              ) {
                phone = this.formatMobile(prop.profile_fields[i].value);
              }
            }
          }
          return {
            ...prop,
            name: name.fname + ' ' + name.lname,
            email: email,
            mobile: phone
          };
        });
        this.dataSource = newres;
      }
    );
  }
  getOneClub(id: any) {
    this.sharedService.showLoader = true;
    this.isEdit = true;
    this.showImage = true;
    this.title = 'Edit Club';
    this.clubService
      .getOneClub(id)
      .then((res: any) => {
        this.club = res.data;
        this.selectedValidity = this.club.validity;
        this.selectedCountryId = this.club.country._id;
        this.selectedSportId = this.club.sport._id;
        this.selectedStateId = this.club.state._id;
        this.selectedDistrictId = this.club.district._id;
        this.selectedregionId = this.club.region._id;
        if (res.data.logo.length > 3) {
          this.club_img = `${environment.imageUrl}${res.data.logo}`;
          this.tempFile = res.data.logo;
        }
        this.getStates(this.selectedCountryId);
        this.sharedService.showLoader = false;
        console.log(this.club);
      })
      .catch((err: any) => {});
  }

  validateUsername(value: any) {
    if (value.search(/^[0-9]{10}$/) === 0) {
      this.invalidNumber = false;
    } else {
      this.invalidNumber = true;
    }
  }

  getValidity(e: any) {
    this.selectedValidity = e;
  }

  getAllRegions() {
    this.clubService.getRegions().subscribe((e: any) => {
      this.regionsList = [...e.data];
    });
  }

  regionData(region: any) {
    this.selectedregionId = region._id;
  }

  clubSubmit() {
    this.sharedService
      .showDialog(
        'Fields cannot be empty, enter data in all the fields and then click on submit.'
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/clubs');
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
          this.router.navigateByUrl('/clubs');
        }
      });
  }

  createClub() {
    this.sharedService.showLoader = true;
    const temp = this.club;
    // const x = this.club.email;
    // const atpos = x.indexOf('@');
    // const dotpos = x.lastIndexOf('.');
    // if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
    //   this.sharedService
    //     .loginDialog('Enter a valid email address')
    //     .subscribe((res: any) => {});
    // } else {
    //   temp.mobile_phone = this.extraxtNo(temp.mobile_phone);
    temp.sport = this.selectedSportId;
    temp.country = this.selectedCountryId;
    temp.state = this.selectedStateId;
    temp.district = this.selectedDistrictId;
    temp.region = this.selectedregionId;
    temp.validity = this.selectedValidity;
    this.clubService
      .newClub(temp)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('club created successfully.');
        this.router.navigateByUrl('/clubs');
      })
      .catch((err: any) => {
        this.sharedService.loginDialog(err.error.message);
      });
    // }
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

  updateClub() {
    this.sharedService.showLoader = true;
    const temp = this.club;

    temp.logo = this.tempFile;
    temp.sport = this.selectedSportId;
    temp.country = this.selectedCountryId;
    temp.state = this.selectedStateId;
    temp.district = this.selectedDistrictId;
    temp.region = this.selectedregionId;

    delete temp.created_by;

    this.clubService
      .updateClub(this.editClubId, temp)
      .then((e: any) => {
        // this.formatMobile();
        this.sharedService.showLoader = false;
        this.sharedService.updatedStatus('changed');
        localStorage.super_cur_clubLogo = e.data.logo;
        const headerRef = headerCompRef();
        headerRef.changeLogo(e.data.logo, this.editClubId);
        // this.sharedService.updatedClubData(localStorage.super_cur_clubLogo);
        this.sharedService
          .showMessage('club updated successfully')
          .subscribe(() => this.router.navigate(['/clubs']));
      })
      .catch((err: any) => {
        this.sharedService.loginDialog(err.error.message);
      });
    // }
  }

  cancelClub() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
      Confirm if you want to leave this page?`
      )
      .subscribe(response => {
        if (response === true) {
          this.router.navigate(['/clubs']);
        }
      });
  }

  getCountries() {
    this.clubService.getAllCountries().subscribe((res: any) => {
      this.countryList = [...res.data];
      const defaultCountry = res.data.find(item => {
        return item.ref_id === '231';
      });
      this.getStates(defaultCountry._id);
    });
  }

  getStates(id: any) {
    this.selectedCountryId = id;
    this.clubService.getStates(this.selectedCountryId).subscribe((res: any) => {
      this.stateList = [...res.data];
    });
  }

  uploadImageFile($event: any, type: any) {}

  getDistricts() {
    this.clubService.getDistricts().subscribe((res: any) => {
      this.districtList = [...res.data];
    });
  }

  getSports() {
    this.clubService.getSports().subscribe((res: any) => {
      this.sportList = [...res.data];
    });
  }

  districtData(district: any) {
    this.selectedDistrictId = district._id;
  }

  sportData(sport: any) {
    this.selectedSportId = sport._id;
  }
  formatMobile(number: any) {
    return this.inputChanged(number);
  }

  inputChanged(e: any) {
    if (e.length <= 10 && e.length > 0) {
      const first = e.substring(0, 3);
      const mid = e.substring(3, 6);
      const last = e.substring(6, 10);
      e = '(' + first + ') ' + mid + '-' + last;
      return e;
    } else if (e.length === 0) {
    }
  }

  extraxtNo(e: any) {
    if (e !== '') {
      e = e.replace(/[^A-Z0-9]+/gi, '');
      return e;
    }
  }

  getClubImage(e: any) {
    let image = e.target.files[0];
    if (image.name) {
      const imageType = image.name.split('.')[1];
      const that = this;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function(event: any) {
        image = event.target.result;
        const msg = 'Upload Team Logo';
        that.sharedService.showImageDialog(msg, e).subscribe(
          result => {
            let objectURL1 = URL.createObjectURL(result);
            that.club_img = objectURL1;

            if (result.name) {
              that.club.logo = result.name;
            }
            that.tempFile = result;
          },
          err => {}
        );
      };

      // } else {
      // this.sharedService.loginDialog('Upload an image of type .png/.jpeg/.jpg');
      // }
    }
  }

  uploadBannerImage() {
    if (this.tempFile) {
      const formData = new FormData();
      formData.append('image', this.tempFile);

      this.sharedService.showLoader = true;
      this.resourceService.uploadProfileImage(formData).subscribe(event => {
        if (event.type === HttpEventType.Response) {
          let a: any = event.body;
          this.sharedService.showLoader = false;
          this.tempFile = a.data;
          this.club.logo = a.data;
          // this.sharedService.showMessage('image updated successfully');
        }
      });
    }
  }
  validateForm(email: any) {
    const x = email;
    const atpos = x.indexOf('@');
    const dotpos = x.lastIndexOf('.');
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
      alert('Not a valid e-mail address');
      return false;
    }
  }

  submitFunction() {}

  getRegionVal(event?: any) {
    this.club.region = event.value;
  }

  getDistrictValue(event?: any) {
    this.club.district = event.value;
  }

  getStateVal(event?: any) {
    this.club.state = event.value;
  }
}
