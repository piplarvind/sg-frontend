import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material';
import { RegisterUser } from '../model/registerUser';
import { EventsService } from '../events.service';
import { AthletesService } from '@app/athletes/athletes.service';
import { ProfilesService } from '@app/profiles/profiles.service';
import { environment } from '../../../environments/environment';
import { SharedService } from '@app/shared/shared.service';
export interface DialogData {
  data: string;

  teamlist: any;
  event: string;
  linkexitinguser: string;
}
@Component({
  selector: 'app-register-user-edit',
  templateUrl: './register-user-edit.component.html',
  styleUrls: ['./register-user-edit.component.scss']
})
export class RegisterUserEditComponent implements OnInit {
  selectedteam: string = '';
  alreadyathlete: boolean = false;
  selectedathlete: string = '';
  selecttype: any = '';
  user: RegisterUser;
  isdata: boolean = false;
  islink: boolean = false;
  athletemoblie: any = '';
  parentmobile: any = '';
  quote: string | undefined;
  isLoading = false;
  radiobutgr: boolean = true;
  Positionlist: any = [];
  athletelist: any = [];
  tempId: any;
  ageList: any = [];
  positionlist: any = [];
  teamlist: any = [];
  constructor(
    private eventService: EventsService,
    public sharedService: SharedService,
    public ProfilesService: ProfilesService,
    private athletesService: AthletesService,
    public dialogRef: MatDialogRef<RegisterUserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.user = new RegisterUser();
  }

  ngOnInit() {
    if (!this.data.teamlist) {
      this.isdata = true;
      this.getPosition();
      this.getAllAge();
      this.getoneRegisterUser(this.data.data);
    }
    if (this.data.teamlist) {
      this.islink = true;
      this.teamlist = this.data.teamlist;
      this.getAllAthletes();
    }
    if (this.data.teamlist && this.data.linkexitinguser) {
      this.radiobutgr = false;

      this.alreadyathlete = true;

      this.selectedathlete = this.data.data;
    }
  }

  getAllAthletes() {
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.tempId = localStorage.super_cur_clubId;
    } else {
      this.tempId = localStorage.club_id;
    }
    if (this.tempId) {
      this.ProfilesService.getRoleListAlluser(this.tempId, 'Athlete').then(
        (res: any) => {
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
          this.athletelist = newres;
        }
      );
    }
  }

  getPosition() {
    this.athletesService
      .fetchPosition()
      .then((e: any) => {
        this.positionlist = e.data;
      })
      .catch((err: any) => {});
  }
  getAllAge() {
    this.ProfilesService.getAgeList().then((res: any) => {
      console.log('grt coountries', res);
      this.ageList = [...res.data];
    });
  }

  getoneRegisterUser(id) {
    this.eventService
      .getRegisterUser(id)
      .then((res: any) => {
        if (res.data) {
          this.user = res.data;
          this.user.athlete.position = res.data.athlete.position._id;

          this.user.athlete.age = res.data.athlete.age._id;
          this.parentformatMobile(res.data.athlete.mobile);
          this.PayerformatMobile(res.data.parent.mobile);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  cancelEvents() {
    this.dialogRef.close();
  }
  OnUpdateRegister() {
    this.isLoading = true;
    this.user.athlete.mobile = this.extraxtNo(this.athletemoblie);
    this.user.parent.mobile = this.extraxtNo(this.parentmobile);

    this.eventService
      .updateREgisterUser(this.data.data, this.user)
      .then((res: any) => {
        this.dialogRef.close();
      })
      .catch(err => {
        console.log(err);
      });
  }
  PayerformatMobile(event: any) {
    let new_value = event.replace(/\D/g, '');
    if (new_value.length <= 10) {
      console.log('inside length::', this.athletemoblie.length);

      this.athletemoblie = new_value;
      this.athletemoblie = this.inputmobileChanged(this.athletemoblie);
    }
  }

  inputmobileChanged(e: any) {
    let s = '';
    if (e.length <= 10 && e.length > 0) {
      const first = e.substring(0, 3);
      const mid = e.substring(3, 6);
      const last = e.substring(6, 10);
      s = '(' + first + ') ' + mid + '-' + last;
      return s;
    }
  }
  parentformatMobile(event: any) {
    let new_value = event.replace(/\D/g, '');
    console.log('this.mobile_phone', this.parentmobile.length);
    if (new_value.length <= 10) {
      console.log('inside length::', this.parentmobile.length);

      this.parentmobile = new_value;
      this.parentmobile = this.inputmobileChanged(this.parentmobile);
    }
  }
  extraxtNo(e: any) {
    let s = '';
    if (e && e !== '') {
      s = e.replace(/[^A-Z0-9]+/gi, '');
    }
    return s;
  }
  getTeam(e: any) {
    this.selectedteam = e.value;
  }
  getathlete(e: any) {
    this.selectedathlete = e.value;
  }
  OnUpdateLink() {
    console.log('upadt link');

    if (this.alreadyathlete && this.selectedathlete && this.selectedteam) {
      let finaldata = {
        club: this.tempId,
        team: this.selectedteam,
        athlete: this.selectedathlete,

        event: this.data.event,
        isRegistered: true
      };

      this.eventService
        .Athleteaddtoteam(this.data.data, finaldata)
        .then((res: any) => {
          if (res.status === 'Failure') {
            this.sharedService.showMessage(res.message);
          }
          if (res.status === 'Success') {
            this.sharedService.showMessage(res.message);
            this.dialogRef.close();
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else if (
      this.selecttype === '1' &&
      this.selectedathlete &&
      this.selectedteam
    ) {
      let finaldata = {
        club: this.tempId,
        team: this.selectedteam,
        athlete: this.selectedathlete,
        event: this.data.event
      };

      this.eventService
        .Athleteaddtoteam(this.data.data, finaldata)
        .then((res: any) => {
          if (res.status === 'Failure') {
            this.sharedService.showMessage(res.message);
          }
          if (res.status === 'Success') {
            this.sharedService.showMessage(res.message);
            this.dialogRef.close();
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else if (this.selectedteam && this.selecttype === '2') {
      let fdata = {
        club: this.tempId,
        team: this.selectedteam,
        event: this.data.event
      };
      this.eventService
        .Useraddtoteam(this.data.data, fdata)
        .then((res: any) => {
          if (res.status === 'Failure') {
            this.sharedService.showMessage(res.message);
          }
          if (res.status === 'Success') {
            this.sharedService.showMessage(res.message);
            this.dialogRef.close();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
