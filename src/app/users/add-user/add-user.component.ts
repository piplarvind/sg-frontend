import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsersService } from '@app/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '@app/shared/shared.service';
import { ClubsService } from '@app/clubs/clubs.service';
import * as moment from 'moment';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  /** control for the selected bank */
  public bankCtrl: UntypedFormControl = new UntypedFormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: UntypedFormControl = new UntypedFormControl();

  /** control for the selected bank for multi-selection */
  public bankMultiCtrl: UntypedFormControl = new UntypedFormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public bankMultiFilterCtrl: UntypedFormControl = new UntypedFormControl();

  showForm = false;
  isLoading = true;
  title: any = 'Create User';
  isEdit = false;
  // dob = {
  //   month: null,
  //   day: null,
  //   year: null
  // };
  userRoles: Array<string> = [];
  invalidEmail: any;
  invalidNumber: Boolean;
  hideUserDetails: Boolean;
  selectedUserRoleName: any;
  selectedUserType: any;
  generic_role_change: Boolean;
  invalidHomeNumber: Boolean;
  roleAthlete:any;
  rolesList: Array<any> = [];
  temp: any;
  level:any;
  parent=false;
  athleteList: Array<any>;

  user: any = {
  
    first_name: '',
    last_name: '',
    // dob: '',
    address_line_1: '',
    address_line_2: '',
    zip: '',
    city: '',
    state: '',
    country: '',
    email: '',
    mobile_phone: '',
    home_phone: '',
    role: '',
    gender: '',
    child:[]
  };
  childId:any=[];
  roleId: any;
  clubId: any;
  activeRouteSubscriber: any;
  errorYear: any;
  edituserId: any;
  selectedUserRole: any;
  showClubs = false;
  clubList: any;
  countryList: any;
  stateList: any;
  cityList: any;
  curSelectClub: any;
  selectedCountry: any;
  selectedState: any;
  selectedCountryId: any;
  selectedStateId: any;

  constructor(
    private service: UsersService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    public sharedService: SharedService,
    private userService: UsersService,
    public clubService: ClubsService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.service.getAllCountries().subscribe((res: any) => {
      this.countryList = res;
      console.log("country list ::",res);
      
      const countryId = this.countryList[226]._id;
      this.selectedCountryId = countryId;
      this.getStates(countryId);
    });
    if (localStorage.user_role === 'Super Admin' || localStorage.user_role === 'Platform Admin') {
      this.clubId = localStorage.super_cur_clubId;
      this.curSelectClub = localStorage.super_cur_club;
    } else {
      this.clubId = localStorage.club_id;
    }
 
 
  if (localStorage.user_role === 'Super Admin') {
    this.level='level1';
  }
  if (localStorage.user_role === 'Club Admin') {
    this.level='level2'
  }
  if (localStorage.user_role === 'Coach') {
    this.level='level3';
  }
  console.log("level  :::", this.level);
  
    this.getCountries();
    this.service
      .getAllRoles1(this.level)
      .then((e: any) => {
        this.rolesList = e.obj;
        if (localStorage.user_role === 'Club Admin' || localStorage.user_role === 'Coach') {
          this.rolesList = this.rolesList.filter(result => {
            return result.user_role !== 'Club Admin';
          });
        }
        if (localStorage.user_role === 'Club Admin' || localStorage.user_role === 'Coach') {
          this.rolesList = this.rolesList.filter(result => {
            return result.user_role !== 'Super Admin';
          });
        }
        if (localStorage.user_role === 'Club Admin' || localStorage.user_role === 'Coach') {
          this.rolesList = this.rolesList.filter(result => {
            return result.user_role !== 'Platform Admin';
          });
        }
        if (localStorage.user_role === 'Platform Admin') {
          this.rolesList = e.obj.filter(result => {
            return result.user_role !== 'Platform Admin';
          });
        }

        if (localStorage.user_role === 'Super Admin') {
          this.rolesList = e.obj.filter(result => {
            return result.user_role !== 'Platform Admin' && result.user_role !== 'Super Admin';
          });
        }

        if (
          localStorage.user_role === 'Athlete' ||
          localStorage.user_role === 'Parent' ||
          localStorage.user_role === 'Family-Friends-Fans'
        ) {
          this.rolesList = e.obj.filter(result => {
            return result.user_role !== 'Platform Admin';
          });
        }
        if (
          localStorage.user_role === 'Athlete' ||
          localStorage.user_role === 'Parent' ||
          localStorage.user_role === 'Family-Friends-Fans'
        ) {
          this.rolesList = e.obj.filter(result => {
            return result.user_role !== 'Super Admin';
          });
        }
        if (
          localStorage.user_role === 'Athlete' ||
          localStorage.user_role === 'Parent' ||
          localStorage.user_role === 'Family-Friends-Fans'
        ) {
          this.rolesList = e.obj.filter(result => {
            return result.user_role !== 'Club Admin';
          });
        }
        if (
          localStorage.user_role === 'Athlete' ||
          localStorage.user_role === 'Parent' ||
          localStorage.user_role === 'Family-Friends-Fans'
        ) {
          this.rolesList = e.obj.filter(result => {
            return result.user_role !== 'Coach';
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
    if (this.router.url !== '/users/add') {
      this.title = 'Edit User';
      this.activeRouteSubscriber = this.activateRoute.queryParams.subscribe(param => {
        this.edituserId = param.userId;
      });
      this.isEdit = true;
      this.showForm = true;

      this.getOneuser(this.edituserId);
    }
  }

  countryData(country: any) {
    this.selectedCountry = country.name;
    this.selectedCountryId = country._id;
    this.getStates(country._id);
  }

  getOneuser(id: any) {
    this.sharedService.showLoader = true;
    this.isEdit = true;
    
    this.service.fetchOneUser(id).then((e: any) => {
      console.log('get one user ::', e);
     console.log("level one user     ::",this.level);
     
      this.isEdit = true;
      this.showForm = true;
      this.user = e.data;
 if (e.data.role.user_role==='Parent') {
  this.parent=true;
  
 }

 this.getAllAthletes();
if(this.user.child) {
    this.user.child.forEach(item => {
  const arr = [];
arr.push(item._id);
console.log("arr::",arr);

this.user.child.push(item._id);

this.childId = this.childId.concat(arr);
console.log('---->',this.childId);


 //  this.editAthleteId = item._id;
  console.log("item id", item._id);
 //  const temp = {
 //    hashedId: this.curSelectClub
 //   };

 
});
}
   

      this.selectedUserRole = this.user.role._id;
      this.selectedUserRoleName = this.user.role.user_role;
      console.log("  this.selectedUserRoleName",  this.selectedUserRoleName);
      
      this.selectedCountryId = this.user.country._id;
      this.selectedStateId = this.user.state._id;
      if (this.user.role.user_role === 'Platform Admin' || this.user.role.user_role === 'Super Admin') {
        this.hideUserDetails = false;
      } else {
        this.hideUserDetails = true;
        this.getStates(this.selectedCountryId);
      }
      this.getStates(this.selectedCountryId);
      this.user.mobile_phone = this.inputChanged(this.user.mobile_phone);
      if (this.user.home_phone) {
        this.user.home_phone = this.extraxtNo(this.user.home_phone);
      }
      if (this.user.mobile_phone !== '') {
        this.formatMobile();
      }
      if (this.user.home_phone !== '') {
        this.formatHome();
      }
      // const temp = this.user.dob.split('T')[0].split('-');
      // this.dob.year = temp[0];
      // this.dob.month = +temp[1] - 1;
      // const newDay = Number(temp[2]);
      // // this.dob.day = newDay + 1;
      // this.dob.day = newDay;
      // this.user.dob = new Date(this.dob.year, this.dob.month, this.dob.day).toISOString();
      // console.log('dob ::', this.user.dob);
   
      this.service
      .getAllRoles1(this.level)
        .then((res: any) => {
          if (this.selectedUserRoleName !== 'Family-Friends-Fans') {
            this.rolesList = res.obj.filter(role => role.user_role !== 'Family-Friends-Fans');
          }
          if (this.selectedUserRoleName === 'Family-Friends-Fans') {
            // this.selectedUserRole = this.user.role._id;
            this.rolesList = res.obj;
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    });

    this.service
      .getAllRoles1(this.level)
      .then((e: any) => {
        // if (this.selectedUserRoleName !== 'Family-Friends-Fans') {
        //   this.rolesList = e.obj.filter(role => role.user_role !== 'Family-Friends-Fans');
        //   console.log('roles list', this.rolesList);
        // }
        // if (this.selectedUserRoleName === 'Family-Friends-Fans') {
        // this.selectedUserRole = this.user.role._id;
        this.rolesList = e.obj;
        // }
      })
      .catch((err: any) => {
        console.log(err);
      });

    this.sharedService.showLoader = false;
  }
  // createClub() {
  //   this.sharedService.showLoader = true;
  //   const temp = this.club;
  //   const x = this.club.email;
  //   const atpos = x.indexOf('@');
  //   const dotpos = x.lastIndexOf('.');
  //   if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
  //     this.sharedService.loginDialog('Enter a valid email address').subscribe((res: any) => {});
  //   } else {
  //     temp.mobile_phone = this.extraxtNo(temp.mobile_phone);
  //     temp.country = this.selectedCountryId;
  //     temp.state = this.selectedStateId;
  //     temp.district = this.selectedDistrictId;
  //     temp.region = this.selectedregionId;
  //     temp.validity = this.selectedValidity;
  //     this.clubService
  //       .newClub(temp)
  //       .then((e: any) => {
  //         this.sharedService.showLoader = false;
  //         this.sharedService.showMessage(e.message);
  //         this.router.navigateByUrl('/clubs');
  //       })
  //       .catch((err: any) => {
  //         console.log(err);
  //         this.sharedService.loginDialog(err.error.message);
  //       });
  //   }

  createUser() {
    this.sharedService.showLoader = true;
    const temp = this.user;

    // const day = Number(this.dob.day);
    // const now = moment().format('YYYY-MM-DD');
    // const formatter = 'YYYY-MM-DD';
    // console.log('year ', this.dob.year);
    // let date = new Date(this.dob.year, this.dob.month, day);
    // this.user.dob = moment(date).format(formatter);
    // this.user.dob = new Date(this.dob.year, this.dob.month, day).toISOString();
    // //this.user.dob = new Date(this.dob.year, this.dob.month, day).toISOString();
    // console.log('dob ::', this.user.dob);
    temp.mobile_phone = this.extraxtNo(temp.mobile_phone);
    temp.home_phone = this.extraxtNo(temp.home_phone);
    temp.clubId = this.clubId;
    temp.role = this.selectedUserRole;
    temp.country = this.selectedCountryId;
    temp.state = this.selectedStateId;
    // let removeDuplicate = (names) => names.filter((v,i) => names.indexOf(v) === i);                                     
    // // this.childId = [...new Set(this.childId)];
    // this.childId = removeDuplicate(this.childId);
    temp.child = this.childId;
    delete temp.gender;

    if (localStorage.user_role === 'Super Admin' || localStorage.user_role === 'Platform Admin') {
      temp.hashedId = localStorage.super_cur_club;
    } else {
      temp.hashedId = localStorage.dbName;
    }
    this.service
      .newUser(temp)
      .then((e: any) => {
        this.formatMobile();
        this.formatHome();
        this.sharedService.showLoader = false;
        this.sharedService.showMessage(e.message).subscribe(() => this.router.navigate(['/users']));
      })
      .catch(err => {
        console.log(err);
        this.sharedService.showLoader = false;
        this.sharedService.loginDialog(err.error.message);
      });
  }

  // validateYear(year: any) {
  //   var yearvar = new String(year);
  //   var pre: string;

  //   console.log('length', yearvar.length);
  //   console.log(year);
  //   // console.log(arguments.length);
  //   if (yearvar.length === 2 && year >= 30) {
  //     console.log('prefix');
  //     this.errorYear = false;
  //     pre = '19'.concat(year);
  //     console.log('pre', pre);
  //     this.dob.year = parseInt(pre);
  //     console.log('date year', this.dob.year);
  //   } else if (yearvar.length === 2 && year <= 18) {
  //     this.errorYear = false;
  //     pre = '20'.concat(year);
  //     console.log('pre', pre);
  //     this.dob.year = parseInt(pre);
  //     console.log('date year', this.dob.year);
  //   } else if (yearvar.length === 1 && year <= 18) {
  //     this.errorYear = false;
  //     pre = '200'.concat(year);
  //     console.log('pre', pre);
  //     this.dob.year = parseInt(pre);
  //     console.log('date year', this.dob.year);
  //   } else if (yearvar.length === 4 && year >= 1930) {
  //     this.errorYear = false;
  //   } else {
  //     this.errorYear = true;
  //   }
  // }

  cancelChange() {
    this.sharedService
      .showDialog(
        'Unsaved data, if any will be lost if you cancel this action. Confirm if you want to leave this page?'
      )
      .subscribe(response => {
        if (response === true) {
          this.router.navigate(['/users']);
        }
      });
  }

  updateUser() {
    this.sharedService.showLoader = true;
    // const day = Number(this.dob.day);
    // const now = moment().format('YYYY-MM-DD');
    // const formatter = 'YYYY-MM-DD';
    // console.log('year ', this.dob.year);
    // let date = new Date(this.dob.year, this.dob.month, day);
    // this.user.dob = moment(date).format(formatter);
    // console.log('dob ::', this.user.dob);
    const temp = this.user;
    temp.mobile_phone = this.extraxtNo(temp.mobile_phone);
    if (temp.home_phone !== 'undefined') {
      temp.home_phone = this.extraxtNo(temp.home_phone);
      // if (temp.home_phone) {
      //   temp.home_phone = this.extraxtNo(temp.home_phone);
    }
    temp.hashedId = localStorage.dbName;
    temp.clubId = this.clubId;
    temp.country = this.selectedCountryId;
    temp.state = this.selectedStateId;
    let removeDuplicate = (names) => names.filter((v,i) => names.indexOf(v) === i);                                     
    // this.childId = [...new Set(this.childId)];
    this.childId = removeDuplicate(this.childId);
    temp.child = this.childId;
    delete temp._id;
    delete temp.role;
    delete temp.dob;
    if (this.selectedUserRoleName === 'Family-Friends-Fans') {
      if (this.selectedUserRoleName === 'Family-Friends-Fans') {
        temp.generic_role_change = false;
      }
      if (this.selectedUserType) {
        if (this.selectedUserRoleName !== this.selectedUserType) {
          temp.generic_role_change = true;
        }
      }
    }
    temp.role = this.selectedUserRole;
    console.log("temp :::",temp.child);
    console.log("temp :::",temp);
    this.service
      .updateUser(temp)
      .then((e: any) => {
        this.formatMobile();
        this.formatHome();
        this.sharedService.showLoader = false;
        this.sharedService.showMessage(e.message).subscribe(() => this.router.navigate(['/users']));
      })
      .catch(err => {
        console.log(err);
        this.sharedService.showLoader = false;
        if (err.error && err.error.message) {
          this.sharedService.loginDialog(err.error.message);
        }
      });
  }

  getCountries() {
    this.service.getAllCountries().subscribe((res: any) => {
      this.countryList = res;
    });
    this.getStates(this.selectedCountryId);
  }

  getStates(id: any) {
    this.selectedCountryId = id;
    this.service.getStates(this.selectedCountryId).subscribe((res: any) => {
      this.stateList = res;
      setTimeout(() => {
        this.isLoading = false;
        this.ref.markForCheck();
      }, 100);
    });
  }

  stateData(state: any) {
    this.selectedState = state.name;
    this.selectedStateId = state._id;
  }

  getAllClubs() {
    this.clubService
      .getClubList()
      .then((res: any) => {
        this.clubList = res.data.reverse();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  errorSubmit() {
    this.sharedService.showMessage('Required (*) fields cannot be empty').subscribe();
  }

  selectUser(user: any) {
    console.log("selected user",user);
    this.selectedUserRole = user._id;
    this.selectedUserType = user.user_role;
    if (user.user_role !== 'Club Admin') {
      this.showForm = true;
      this.showClubs = false;
    }
    if (
      user.user_role === 'Club Admin' ||
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.showClubs = true;
      this.showForm = true;
      this.getAllClubs();
    }
    if (user.user_role === 'Platform Admin' || user.user_role === 'Super Admin') {
      this.hideUserDetails = false;
    } else {
      this.hideUserDetails = true;
    }
   
    if (user.user_role === 'Parent') {
      this.parent=true;
      this.getAllAthletes()
   
  }

  }
  getAllAthletes() {
    this.sharedService.showLoader = true;
    const temp = {
      hashedId: localStorage.dbName
    };
    let tempValue: any;
    this.userService.getAllRoles().then((e: any) => {
      const roles = e.obj;
     
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].user_role === 'Athlete') {
          this.roleAthlete = roles[i]._id;
          console.log('roles', this.roleAthlete);
        }
      }
        console.log("localStorage.user_role",localStorage.user_role);
        
      if (localStorage.user_role === 'Club Admin' || localStorage.user_role === 'Coach') {
        tempValue = localStorage.dbName;
      } else if (localStorage.user_role === 'Super Admin' || localStorage.user_role === 'Platform Admin') {
        console.log("this.curSelectClub",this.curSelectClub);
        tempValue = this.curSelectClub;
      }

      this.userService
        .getAthleteList({
          hashedId:  tempValue,
          role: this.roleAthlete
        })
        .then((res: any) => {
          this.sharedService.showLoader = false;
          this.athleteList = res.data;
                 console.log("res data all athlete ::",res.data );
          
         
        
          console.log(this.athleteList[0]);
        });
    });
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

  formatMobile(event?: any) {
    // if (event.keyCode !== 8) {
    if (this.user.mobile_phone) {
      this.user.mobile_phone = this.extraxtNo(this.user.mobile_phone);
      if (this.user.mobile_phone.search(/^[0-9]{10}$/) === 0) {
        this.invalidNumber = false;
      } else {
        this.invalidNumber = true;
      }
      this.user.mobile_phone = this.inputChanged(this.user.mobile_phone);
    }
  }

  formatHome(event?: any) {
    // if (event.keyCode !== 8) {
    if (this.user.home_phone) {
      this.user.home_phone = this.extraxtNo(this.user.home_phone);
      if (this.user.home_phone.search(/^[0-9]{10}$/) === 0) {
        this.invalidHomeNumber = false;
      } else {
        this.invalidHomeNumber = true;
      }
      this.user.home_phone = this.inputChanged(this.user.home_phone);
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
  extraxtNo(e: any) {
    let s = '';
    if (e && e !== '') {
      s = e.replace(/[^A-Z0-9]+/gi, '');
    }
    return s;
  }

  ChildChange(event:any) {
    console.log(this.childId);
    console.log('event');    
    console.log(event);
    
    // this.childId = this.childId.concat(event);
    this.childId= event;
    console.log("this clid id::", this.childId );
    
console.log("event jkjhhjjh", event);
console.log("event childId",  this.childId);

  }
}
