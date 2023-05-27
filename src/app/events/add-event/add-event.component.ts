import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { EventsService } from '@app/events/events.service';
import { TeamsService } from '@app/teams/teams.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SharedService } from '@app/shared/shared.service';
import { ClubsService } from '@app/clubs/clubs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '@app/users/users.service';
import { ResourceService } from '@app/resource/resource.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfilesService } from '@app/profiles/profiles.service';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { EventRepeatedDialogComponent } from '../event-repeated-dialog/event-repeated-dialog.component';

import { HttpEventType } from '@angular/common/http';
import * as moment from 'moment';
import { RegisterUserEditComponent } from '../register-user-edit/register-user-edit.component';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class AddEventComponent implements OnInit, OnChanges {
  GenderList: any = [];
  audienceList: any = [];
  showTeamaudi: boolean = false;
  audiTeamlist: any = [];
  positionlist: any = [];
  match: string;
  tryouts: string;
  today: any;
  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  displayedColumns2: any = [
    'name',
    'agegroup',

    'registrationdate',
    'accepted',

    // 'action',
    'link'
    //  'attended'
  ];

  displayedColumns: any = [
    'name',
    'agegroup',
    'position',
    'parentname',
    'transaction_id',
    'registrationdate',
    'accepted',

    'action',
    'link'
    // 'accepted',
    // 'attended'
  ];
  frequency_details: any;
  selected: String = '';
  teamCtrl = new FormControl();
  isLoading = true;
  ageList: any;
  ageList2: any;
  filteredTeams: Observable<any[]>;
  invalidAsstCoachNumber: Boolean;
  invalidHeadCoachNumber: Boolean;
  invalidTeamRepNumber: Boolean;
  title = 'CREATE EVENT';
  isOutside: Boolean;
  selectedCountryId: any;
  selectedStateId: any;
  selectedEvntType: any;
  countryList: any = [];
  stateList: any = [];
  opteamlogo: any;
  name: any;
  team1: any;
  team2: any;
  place: any;
  address: any;
  date: any;
  time: any;
  tempFile: any;
  temp: any;
  tempId: any;
  otherClub: any;
  clubList: Array<any>;
  isOtherClub: Boolean = false;
  opponentClubId: any;
  eventTypes: Array<any>;
  selectEventType: any;
  selectEventId: any;
  teams2Outside: Array<any>;
  homeTeamAge: any;
  oppTeamAge: any;
  team2type: String = '';
  team2Id: any = [];
  team1Id: any = [];
  selectedTeam2Id: any;
  selectedTeam1Id: any;
  selectedTeam2Ageotherclub: any = '';
  selectedTeam2Idotherclub: any;
  selectedOutsideTeamAge: any;
  isStandard: Boolean = false;
  isMatch: Boolean = false;
  endRequired: Boolean = false;
  showSubmit: Boolean = true;
  clubsList: Array<any>;
  activeRouteSubscriber: any;
  editEventId: any;

  event: any = {
    name: '',
    location: {
      lat: '',
      long: '',
      address_line_1: '',
      address_line_2: ''
    },

    frequency_details: {
      day: '0',
      dayOfWeek: '0',
      weekOfMonth: '0',
      dayOfMonth: '0',
      month: '0',
      years: '0',
      repeat_type: ''
    },
    type: '',
    start_date: '',
    end_date: '',
    end_time: '',
    start_time: '',
    team1Age: '',
    team2Age: '',
    team1Name: '',
    team2Name: '',
    team2type: '',
    otherClub: '',
    event_type: {
      event_type: ''
    },
    opponent_team: {
      name: '',
      age: '',
      outsideteamId: ',',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      country: '',
      pin_code: '',
      head_coach_firstname: '',
      head_coach_lastname: '',
      head_coach_email: '',
      head_coach_mobile: '',
      assistant_coach_firstname: '',
      assistant_coach_lastname: '',
      assistant_coach_email: '',
      assistant_coach_mobile: '',
      temporary_rep_firstname: '',
      temporary_rep_lastname: '',
      temporary_rep_email: '',
      temporary_rep_mobile: '',
      logo: ''
    }
  };
  team1List: any = [];
  team2List: any = [];
  selectedEvnt: any;
  selectedTeam1Age: any;
  selectedTeam2Age: any;
  selectedClub: any;
  teamType2: any;
  isEdit = false;
  istryOut: boolean = false;
  //// tryout
  is_paid: boolean = false;
  amount: string;
  // isonetimefee: boolean;
  is_repeated: boolean = false;
  is_private: boolean;
  only_auth_user: boolean = true;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private eventService: EventsService,
    private teamService: TeamsService,
    public sharedService: SharedService,
    public service: UsersService,
    public clubService: ClubsService,
    private ref: ChangeDetectorRef,
    public activatedRoute: ActivatedRoute,
    public resourceService: ResourceService,
    public ProfilesService: ProfilesService,
    // private athletesService: AthletesService,
    // public eventRepeatedDialogComponent: EventRepeatedDialogComponent,
    public _DomSanitizationService: DomSanitizer
  ) { }

  ngOnInit() {
    this.event.audience = 'ALL(Default)';
    this.match = `${environment.match}`;
    this.tryouts = `${environment.tryouts}`;
    this.today = new Date();
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.temp = localStorage.super_cur_club;
      this.tempId = localStorage.super_cur_clubId;
    } else {
      this.temp = localStorage.dbName;
      this.tempId = localStorage.club_id;
    }
    this.getCountries();
    this.getGender();
    // this.getAllAge();
    this.getAllRoles();
    this.getclublist();

    this.filteredTeams = this.teamCtrl.valueChanges.pipe(
      startWith(''),
      map(team => (team ? this._filterTeams(team) : this.teams2Outside.slice()))
    );
    this.getEventTypes();
    if (this.router.url !== '/events/add') {
      this.selectedEvnt = '';
      this.teamType2 = '';
      this.event.opponent_team = {};
    }

    if (this.tempId) {
      this.teamService
        .getTeamList(this.tempId, '', '')
        .then((e: any) => {
          this.audiTeamlist = e.data;
          this.team1List = e.data;
        })
        .catch((err: any) => {
          console.log('error in getting the list of teams', err);
        });
    }
    if (this.router.url !== '/events/add') {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.teamService
            .getTeamList(this.tempId, '', '')
            .then((e: any) => {
              this.team1List = e.data;
              this.getOneEvent(this.editEventId);
            })
            .catch((err: any) => {
              console.log('error in getting the list of teams', err);
            });
          this.editEventId = param.eventId;
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  getAllRoles() {
    // this.sharedService.showLoader = true;

    this.ProfilesService.getRoles().then((res: any) => {
      const prop = res.data;

      this.audienceList = [
        { name: 'All', _id: 'All' },
        { name: 'Teams', _id: 'Teams' }
      ].concat(prop);

      // this.sharedService.showLoader prop
    });
  }
  getGender() {
    this.ProfilesService.getGenderList().then((res: any) => {
      this.GenderList = [...res.data];
    });
  }
  private _filterTeams(value: string) {
    const filterValue = value.toLowerCase();
    return this.teams2Outside.filter(
      team => team.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  _compareFn(a: any, b: any) {
    if (a && b) {
      return a === b;
    }
  }
  _compareFnage(a: any, b: any) {
    if (a && b) {
      return a === b;
    }
  }
  getclublist() {
    this.clubService
      .getClubList()
      .then((res: any) => {
        this.clubList = res.data;
        this.clubList = this.clubList.filter(club => club._id !== this.tempId);
      })
      .catch(err => {
        console.log(err);
      });
  }
  // getAllAge() {
  //   this.ProfilesService.getAgeList().then((res: any) => {
  //     this.ageList = [...res.data];
  //   });
  // }
  getAllAge(Id) {
    this.ProfilesService.getAgeListfilterGender(Id).then((res: any) => {
      this.ageList = [...res.data];
    });
  }
  getAllAge2(Id) {
    this.ProfilesService.getAgeListfilterGender(Id).then((res: any) => {
      this.ageList2 = [...res.data];
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['teams2Outside']) {
      if (this.teams2Outside !== undefined) {
        this.teams2Outside.slice();
      }
    }
  }

  handleAddressChange(e: any) {
    // console.log("hell location problem " ,e.geometry.location.lat +"new lang ", e.geometry.location.lng);

    this.event.location.long = e.geometry.location.lng();
    this.event.location.lat = e.geometry.location.lat();

    this.event.location.address_line_1 = e.formatted_address;

    this.event.location.address_line_2 = e.formatted_address;
  }

  getOneEvent(id: any) {
    this.sharedService.showLoader = true;

    this.title = 'EDIT EVENT';
    this.isEdit = true;
    this.showSubmit = false;
    this.eventService
      .getOneEvent(this.editEventId)
      .then((res: any) => {
        this.sharedService.showLoader = false;

        this.event = res.data;
        this.selectedEvnt = this.event.event_type.event_type;

        this.selectEventId = this.event.event_type._id;
        this.getEventType(this.selectedEvnt);
        if (this.event.start_time) {
          const start1 = `${new Date(this.event.start_time)}`;
          const startTime1 = start1.split(' ');
          const startTime = startTime1[4].split(':');
          this.event.start_time = startTime[0] + ':' + startTime[1];
        }
        if (this.event.end_time) {
          const endArr1 = `${new Date(this.event.end_time)}`;
          const endTime1 = endArr1.split(' ');
          const endTime2 = endTime1[4];
          const endTime = endTime2.split(':');
          this.event.end_time = endTime[0] + ':' + endTime[1];
        }
        // if (this.event.start_date) {
        //   var date = this.event.start_date.split('T')[0];

        //   this.event.start_date = moment(date);
        // }
        // if (this.event.end_date) {
        //   var date = this.event.end_date.split('T')[0];
        //   this.event.end_date = moment(date);
        // }

        if (this.event.is_paid) {
          this.is_paid = this.event.is_paid;
          if (this.event.amount) {
            this.amount = this.event.amount;
          }
        }
        if (this.event.is_repeated) {
          this.is_repeated = this.event.is_repeated;
          this.frequency_details = this.event.frequency_details;
        }

        this.is_private = !this.event.is_private;

        this.only_auth_user = this.event.only_auth_user;

        if (
          this.event.team_type === 0 ||
          this.event.team_type === 1 ||
          this.event.team_type === 2 ||
          this.event.team_type === '0' ||
          this.event.team_type === '1' ||
          this.event.team_type === '2'
        ) {
          // this.team1Id = this.event.home_team.team_id;
          // this.event.team2type = this.event.team_type;
          // this.team2TypeChanged(this.event.team_type);

          if (this.event.home_team) {
            this.team1Id = this.event.home_team.team_id;
            this.event.team2type = this.event.team_type;
            this.team2TypeChanged(this.event.team_type);
            this.selectedTeam1Id = this.event.home_team.team_id;
            this.selectedTeam1Age = this.event.home_team.age._id;

            this.event.gender = this.event.home_team.age.gender._id;

            this.gender(this.event.gender);
          }
          if (this.event.opponent_team && this.event.team_type === 0) {
            this.team2Id = this.event.opponent_team.team_id;

            this.selectedTeam2Id = this.event.opponent_team.team_id;

            this.selectedTeam2Age = this.event.opponent_team.age._id;
            this.event.gender2 = this.event.opponent_team.age.gender._id;
            this.gender2(this.event.gender2);
            this.event.opponent_team = {};
          }

          if (this.event.opponent_team && this.event.team_type === 1) {
            this.selectedClub = this.event.opponent_team.clubId;
            this.otherClubgetone(this.selectedClub);
            this.event.team2Age = this.event.opponent_team.age;
            this.selectedTeam2Ageotherclub = this.event.opponent_team.age._id;
            this.selectedTeam2Idotherclub = this.event.opponent_team.team_id;
            this.event.gender2 = this.event.opponent_team.age.gender._id;
            this.gender2(this.event.gender2);
            this.team2Id = this.event.opponent_team.team_id;
            // this.teamService
            //   .getTeamList(this.selectedClub, '', '')
            //   .then((e: any) => {
            //     this.team2List = e.data;

            //     // opponentclub_for = this.event.opponent_team;
            //   })
            //   .catch((err: any) => {
            //     console.log(err);
            //   });
            this.event.opponent_team = {};
          }

          if (this.event.opponent_team && this.event.team_type === 2) {
            this.team2Id = this.event.opponent_team.team_id;
            this.selectedTeam2Id = this.event.opponent_team.team_id;
            this.selectedOutsideTeamAge = this.event.opponent_team.age;
            this.selectedClub = this.event.opponent_team.clubId;
            this.opteamlogo = `${environment.imageUrl}${this.event.opponent_team.logo}`;
          }
          if (
            this.event.opponent_team &&
            this.event.opponent_team.country &&
            this.event.opponent_team.state
          ) {
            this.selectedCountryId = this.event.opponent_team.country._id;
            this.selectedStateId = this.event.opponent_team.state._id;
          }
          this.event.team1Age = this.event.home_team.age;
          // this.selectedTeam2Id = this.event.opponent_team.team_id;

          if (this.event.opponent_team.head_coach_mobile !== '') {
            this.formatHeadCoachMobile();
          }
          if (this.event.opponent_team.assistant_coach_mobile !== '') {
            this.formatMobile();
          }
          if (this.event.opponent_team.temporary_rep_mobile !== '') {
            this.formatTeamMobile();
          }
        }

        if (this.event.attendees_details_unregistered) {
          this.event.attendees_details_unregistered = this.event.attendees_details_unregistered.map(
            prop => {
              let athletename = {
                fname: '',
                lname: ''
              },
                parentname = {
                  fname: '',
                  lname: ''
                },
                transcationId = '',
                position = '',
                age = '',
                createon = '';
              if (prop.eventUser) {
                createon = prop.eventUser.created_on;
                if (
                  prop.eventUser.athlete &&
                  prop.eventUser.athlete.first_name
                ) {
                  athletename.fname = prop.eventUser.athlete.first_name;
                }
                if (
                  prop.eventUser.athlete &&
                  prop.eventUser.athlete.last_name
                ) {
                  athletename.lname = prop.eventUser.athlete.last_name;
                }

                if (prop.eventUser.parent && prop.eventUser.parent.first_name) {
                  parentname.fname = prop.eventUser.parent.first_name;
                }
                if (prop.eventUser.parent && prop.eventUser.parent.last_name) {
                  parentname.lname = prop.eventUser.parent.last_name;
                }
              }
              if (prop.transaction_details) {
                transcationId = prop.transaction_details.transactionId;
              }
              if (prop.eventUser.athlete.age) {
                age = prop.eventUser.athlete.age.label;
              }
              if (prop.eventUser.athlete.position) {
                position = prop.eventUser.athlete.position.position;
              }

              return {
                ...prop,
                name: athletename.fname + ' ' + athletename.lname,
                parentname: parentname.fname + ' ' + parentname.lname,
                transaction_id: transcationId,
                agegroup: age,
                position: position,

                registrationdate: createon
              };
            }
          );

          this.dataSource = this.event.attendees_details_unregistered;
        }
        if (this.event.attendees_details) {
          this.event.attendees_details = this.event.attendees_details.map(
            prop => {
              let athletename = {
                fname: '',
                lname: ''
              },
                age = '';
              let create_on = '';
              if (prop.registered_user) {
                create_on = prop.registered_user.created_on;
                for (
                  let i = 0;
                  i < prop.registered_user.profile_fields.length;
                  i++
                ) {
                  if (
                    prop.registered_user.profile_fields[i].field.name === 'first_name'
                  ) {
                    athletename.fname =
                      prop.registered_user.profile_fields[i].value;
                  }
                  if (
                    prop.registered_user.profile_fields[i].field.name === 'last_name'
                  ) {
                    athletename.lname =
                      prop.registered_user.profile_fields[i].value;
                  }
                  if (
                    prop.registered_user.profile_fields[i].field.name === 'age' &&
                    prop.registered_user.profile_fields[i].value
                  ) {
                    let Selectedage = this.ageList.filter(
                      t =>
                        t._id === prop.registered_user.profile_fields[i].value
                    );

                    if (Selectedage[0]) {
                      age = Selectedage[0].label;
                    }
                  }
                }
              }
              return {
                ...prop,
                name: athletename.fname + ' ' + athletename.lname,
                // parentname: parentname.fname + ' ' + parentname.lname,
                // transaction_id: transcationId,
                agegroup: age,
                // position: position,

                registrationdate: create_on
              };
            }
          );
          this.dataSource2 = this.event.attendees_details;
        }
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  eventattend(row, i) {
    this.event.attendees_details_unregistered[i].attended = !this.event
      .attendees_details_unregistered[i].attended;
  }

  eventaccept(row, i) {
    this.event.attendees_details_unregistered[i].accepted = !this.event
      .attendees_details_unregistered[i].accepted;
  }

  getStates(id: any) {
    this.selectedCountryId = id;
    this.clubService.getStates(this.selectedCountryId).subscribe((res: any) => {
      this.stateList = [...res.data];
      // setTimeout(() => {
      //   this.isLoading = false;
      //   this.ref.markForCheck(); this.clubService
      // });
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

  createEvent() {
    this.sharedService.showLoader = true;
    const temp = this.event;

    this.address = this.event.location.address_line_1;
    if (this.event.start_time !== '') {
      const startDt = new Date();
      const startTime = this.event.start_time.split(':');
      const startHour = startTime[0];
      const startMinute = startTime[1];
      const startime = new Date(
        startDt.getFullYear(),
        startDt.getMonth(),
        startDt.getDate(),
        startHour,
        startMinute
      );
      temp.start_time = startime;
    }
    if (this.event.end_time !== '') {
      const edarr = new Date();
      const etarr = this.event.end_time.split(':');
      const endHour = etarr[0];
      const endMinute = etarr[1];
      const endTime = new Date(
        edarr.getFullYear(),
        edarr.getMonth(),
        edarr.getDate(),
        endHour,
        endMinute
      );
      temp.end_time = endTime;
    }

    temp.club = this.tempId;
    temp.team_type = this.selectEventType;
    temp.event_type = this.selectEventId;
    // temp.hashedId = this.temp;
    if (this.selectedEvntType !== this.match) {
      temp.is_match = false;
      // temp.is_standard = true;
      temp.is_paid = this.is_paid;
      if (this.is_paid === true) {
        temp.amount = this.amount;
      }
      temp.is_repeated = this.is_repeated;
      if (this.is_repeated === true) {
        this.event.frequency_details.repeat_type = this.frequency_details.repeat_type;
        if (this.frequency_details.repeat_type === 'day') {
          this.event.frequency_details.day = this.frequency_details.day;
        }
        if (this.frequency_details.repeat_type === 'week') {
          this.event.frequency_details.dayOfWeek = this.frequency_details.dayOfWeek;
          this.event.frequency_details.weekOfMonth = this.frequency_details.weekOfMonth;
        }
        if (this.frequency_details.repeat_type === 'month') {
          this.event.frequency_details.dayOfMonth = this.frequency_details.dayOfMonth;
          this.event.frequency_details.month = this.frequency_details.month;
        }
        if (this.frequency_details.repeat_type === 'year') {
          this.event.frequency_details.years = this.frequency_details.years;
        }

        // this.temp.frequency_details;
      }

      temp.is_private = !this.is_private;
      temp.only_auth_user = this.only_auth_user;
      temp.end_date = this.event.end_date;
      // temp.event_type = this.selectedEvntType;

      delete temp.opponent_team;
    }
    if (this.is_repeated === false) {
      delete this.event.frequency_details;
    }
    if (this.selectedEvntType === this.match && temp.team_type === '0') {
      delete this.event.frequency_details;

      temp.is_match = true;
      temp.home_team = this.team1Id;
      temp.opponent_team = this.team2Id;
      temp.end_date = temp.start_date;
    }
    if (this.selectedEvntType === this.match && temp.team_type === '1') {
      delete this.event.frequency_details;
      temp.is_match = true;
      temp.opponent_club = this.opponentClubId;
      temp.home_team = this.team1Id;
      temp.opponent_team = this.team2Id;
      temp.end_date = temp.start_date;
    }
    if (this.selectedEvntType === this.match && temp.team_type === '2') {
      delete this.event.frequency_details;
      temp.is_match = true;
      temp.end_date = temp.start_date;
      temp.home_team = this.team1Id;
      temp.opponent_team = {
        name: this.event.opponent_team.name,
        address_line_1: this.event.opponent_team.address_line_1,
        address_line_2: this.event.opponent_team.address_line_2,
        city: this.event.opponent_team.city,
        state: this.selectedStateId,
        country: this.selectedCountryId,
        pin_code: this.event.opponent_team.pin_code,
        head_coach_firstname: this.event.opponent_team.head_coach_firstname,
        head_coach_lastname: this.event.opponent_team.head_coach_lastname,
        head_coach_mobile: this.event.opponent_team.head_coach_mobile,
        head_coach_email: this.event.opponent_team.head_coach_email,
        assistant_coach_firstname: this.event.opponent_team
          .assistant_coach_firstname,
        assistant_coach_lastname: this.event.opponent_team
          .assistant_coach_lastname,
        assistant_coach_mobile: this.event.opponent_team.assistant_coach_mobile,
        assistant_coach_email: this.event.opponent_team.assistant_coach_email,
        temporary_rep_firstname: this.event.opponent_team
          .temporary_rep_firstname,
        temporary_rep_lastname: this.event.opponent_team.temporary_rep_lastname,
        temporary_rep_mobile: this.event.opponent_team.temporary_rep_mobile,
        temporary_rep_email: this.event.opponent_team.temporary_rep_email,
        age: this.event.opponent_team.age,
        logo: this.event.opponent_team.logo
      };
    }
    delete this.event.gender;
    delete this.event.gender2;
    temp.start_date = moment(temp.start_date).utc();
    temp.end_date = moment(temp.end_date).utc();
    // temp.start_date = moment(temp.start_date).format('YYYY-MM-DD HH:mm');
    // temp.end_date = moment(temp.end_date).format('YYYY-MM-DD HH:mm');

    for (let propName in temp) {
      if (
        temp[propName] === null ||
        temp[propName] === undefined ||
        temp[propName] === ''
      ) {
        delete temp[propName];
      }
    }
    this.eventService
      .newStandardEvent(temp)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('Events  created successfully');
        this.router.navigateByUrl('/events');
      })
      .catch((err: any) => {
        // this.sharedService.showLoader = false;
        console.log('err in event creation', err);
      });
  }

  updateEvents() {
    this.sharedService.showLoader = true;

    const temp = this.event;

    if (this.event.start_time !== '' && this.event.start_time !== undefined) {
      const startDate = new Date();
      const starr = this.event.start_time.split(':');
      const startHour = starr[0];
      const startMinute = starr[1];
      const startTime = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startHour,
        startMinute
      );
      temp.start_time = startTime;
    }
    if (this.event.end_time !== '' && this.event.end_time !== undefined) {
      const endDate = new Date();
      const etarr = this.event.end_time.split(':');
      const endHour = etarr[0];
      const endMinute = etarr[1];
      const endTime = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        endHour,
        endMinute
      );
      temp.end_time = endTime;
    }

    temp.club = this.tempId;
    temp.team_type = this.selectEventType;

    temp.event_type = this.selectEventId;

    if (this.selectedEvntType !== this.match) {
      temp.is_match = false;

      temp.selectedEvntType = this.selectedEvntType;

      temp.is_paid = this.is_paid;
      if (this.is_paid === true) {
        temp.amount = this.amount;
      }
      temp.is_repeated = this.is_repeated;
      if (this.is_repeated === true) {
        this.event.frequency_details.repeat_type = this.frequency_details.repeat_type;
        if (this.frequency_details.repeat_type === 'day') {
          this.event.frequency_details.day = this.frequency_details.day;
        }
        if (this.frequency_details.repeat_type === 'week') {
          this.event.frequency_details.dayOfWeek = this.frequency_details.dayOfWeek;
          this.event.frequency_details.weekOfMonth = this.frequency_details.weekOfMonth;
        }
        if (this.frequency_details.repeat_type === 'month') {
          this.event.frequency_details.dayOfMonth = this.frequency_details.dayOfMonth;
          this.event.frequency_details.month = this.frequency_details.month;
        }
        if (this.frequency_details.repeat_type === 'year') {
          this.event.frequency_details.years = this.frequency_details.years;
        }
      }
      if (this.is_repeated === false) {
        delete this.event.frequency_details;
      }
      temp.is_private = !this.is_private;
      temp.only_auth_user = this.only_auth_user;
    }

    if (this.event.attendees_details_unregistered) {
      this.event.attendees_details_unregistered = this.event.attendees_details_unregistered.map(
        prop => {
          prop.transaction_details = prop.transaction_details._id;
          prop.eventUser = prop.eventUser._id;
          delete prop.name;
          delete prop.parentname;
          return {
            ...prop
          };
        }
      );
    }

    if (this.selectedEvntType === this.match && temp.team_type === '0') {
      delete this.event.frequency_details;

      temp.is_match = true;
      temp.home_team = this.team1Id;
      temp.opponent_team = this.team2Id;
      temp.age = this.event.team2Age;
      temp.selectedEvntType = this.selectedEvntType;
      if (temp.end_date === '') {
        temp.end_date = temp.start_date;
      }
    }
    if (this.selectedEvntType === this.match && temp.team_type === '1') {
      delete this.event.frequency_details;

      temp.is_match = true;
      if (temp.end_date === '') {
        temp.end_date = temp.start_date;
      }
      // temp.end_date = temp.start_date;
      temp.opponent_club = this.selectedClub;

      temp.home_team = this.team1Id;
      temp.opponent_team = this.team2Id;

      temp.age = this.selectedTeam2Ageotherclub;
      temp.selectedEvntType = this.selectedEvntType;
      delete temp.team2type;
    }
    if (this.selectedEvntType === this.match && temp.team_type === '2') {
      delete this.event.frequency_details;
      // temp.is_standard = false;
      temp.is_match = true;
      if (temp.end_date === '') {
        temp.end_date = temp.start_date;
      }
      // temp.end_date = temp.start_date;
      temp.selectedEvntType = this.selectedEvntType;
      temp.home_team = this.team1Id;
      temp.opponent_team = {
        name: this.event.opponent_team.name,
        address_line_1: this.event.opponent_team.address_line_1,
        address_line_2: this.event.opponent_team.address_line_2,
        city: this.event.opponent_team.city,
        state: this.selectedStateId,
        country: this.selectedCountryId,
        pin_code: this.event.opponent_team.pin_code,
        head_coach_firstname: this.event.opponent_team.head_coach_firstname,
        head_coach_lastname: this.event.opponent_team.head_coach_lastname,
        head_coach_mobile: this.event.opponent_team.head_coach_mobile,
        head_coach_email: this.event.opponent_team.head_coach_email,
        assistant_coach_firstname: this.event.opponent_team
          .assistant_coach_firstname,
        assistant_coach_lastname: this.event.opponent_team
          .assistant_coach_lastname,
        assistant_coach_mobile: this.event.opponent_team.assistant_coach_mobile,
        assistant_coach_email: this.event.opponent_team.assistant_coach_email,
        temporary_rep_firstname: this.event.opponent_team
          .temporary_rep_firstname,
        temporary_rep_lastname: this.event.opponent_team.temporary_rep_lastname,
        temporary_rep_mobile: this.event.opponent_team.temporary_rep_mobile,
        temporary_rep_email: this.event.opponent_team.temporary_rep_email,
        age: this.event.opponent_team.age,
        logo: this.event.opponent_team.logo
      };
    }
    temp.start_date = moment(temp.start_date).utc();
    temp.end_date = moment(temp.end_date).utc();
    // temp.start_date = moment(temp.start_date).format('YYYY-MM-DD HH:mm');
    // temp.end_date = moment(temp.end_date).format('YYYY-MM-DD HH:mm');

    delete this.event.gender;
    delete this.event.gender2;
    for (let propName in temp) {
      if (
        temp[propName] === null ||
        temp[propName] === undefined ||
        temp[propName] === ''
      ) {
        delete temp[propName];
      }
    }

    this.eventService
      .updateStandardEvent(this.editEventId, temp)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('Events updated successfully ');
        this.router.navigateByUrl('/events');
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('Events can not update ');
        console.log('err in event update', err);
      });
  }

  formatMobile() {
    if (this.event.opponent_team.assistant_coach_mobile) {
      this.event.opponent_team.assistant_coach_mobile = this.extraxtNo(
        this.event.opponent_team.assistant_coach_mobile
      );
      if (
        this.event.opponent_team.assistant_coach_mobile.search(
          /^[0-9]{10}$/
        ) === 0
      ) {
        this.invalidAsstCoachNumber = false;
      } else {
        this.invalidAsstCoachNumber = true;
      }
      this.event.opponent_team.assistant_coach_mobile = this.inputChanged(
        this.event.opponent_team.assistant_coach_mobile
      );
    }
  }
  formatTeamMobile() {
    if (this.event.opponent_team.temporary_rep_mobile) {
      this.event.opponent_team.temporary_rep_mobile = this.extraxtNo(
        this.event.opponent_team.temporary_rep_mobile
      );
      if (
        this.event.opponent_team.temporary_rep_mobile.search(/^[0-9]{10}$/) ===
        0
      ) {
        this.invalidTeamRepNumber = false;
      } else {
        this.invalidTeamRepNumber = true;
      }
      this.event.opponent_team.temporary_rep_mobile = this.inputChanged(
        this.event.opponent_team.temporary_rep_mobile
      );
    }
  }

  formatHeadCoachMobile() {
    if (this.event.opponent_team.head_coach_mobile) {
      this.event.opponent_team.head_coach_mobile = this.extraxtNo(
        this.event.opponent_team.head_coach_mobile
      );
      if (
        this.event.opponent_team.head_coach_mobile.search(/^[0-9]{10}$/) === 0
      ) {
        this.invalidHeadCoachNumber = false;
      } else {
        this.invalidHeadCoachNumber = true;
      }
      this.event.opponent_team.head_coach_mobile = this.inputChanged(
        this.event.opponent_team.head_coach_mobile
      );
    }
  }
  inputChanged(e: any) {
    if (e.length <= 10 && e.length > 0) {
      let first = e.substring(0, 3);
      let mid = e.substring(3, 6);
      let last = e.substring(6, 10);
      e = '(' + first + ') ' + mid + '-' + last;
      return e;
    } else if (e.length === 0) {
    }
  }

  extraxtNo(e) {
    if (e !== '') e = e.replace(/[^A-Z0-9]+/gi, '');
    return e;
  }

  getEventTypes() {
    this.eventService.getEventTypes(this.tempId).subscribe(
      (res: any) => {
        this.eventTypes = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  Download() {
    this.eventService
      .getDownloadscvs(this.editEventId)

      .then((res: any) => {
        window.open(`${environment.imageUrl}/${res.data}`);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  submitEvent() {
    this.sharedService
      .showDialog(
        `Fields cannot be empty,
    enter data in all the fields and then click on submit.`
      )
      .subscribe(
        response => {
          if (response === '') {
            this.router.navigateByUrl('/events');
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  updateEdit() {
    this.sharedService
      .showDialog(
        `Fields cannot be empty, enter data in all the
      fields and then click on update.`
      )
      .subscribe(
        response => {
          if (response === '') {
            this.router.navigateByUrl('/events');
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  cancelEvents() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
    Confirm if you want to leave this page?`
      )
      .subscribe(
        response => {
          if (response) {
            this.router.navigateByUrl('/events');
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  team2TypeChanged(event: any) {
    this.selectEventType = event;
    this.isMatch = true;
    if (event === '0' || event === 0) {
      this.isOutside = false;
      this.isOtherClub = false;

      if (this.team1Id) {
        this.team2List = this.team1List.filter(
          team => team._id !== this.team1Id
        );
      }
    } else if (event === '1' || event === 1) {
      this.isOutside = false;
      this.isOtherClub = true;
      this.getAllClubs();
    } else {
      this.teams2Outside = this.team1List;
      this.isOutside = true;
      this.isOtherClub = false;
      if (this.isEdit && this.selectedStateId === '') {
        this.event.opponent_team = {
          name: '',
          age: '',
          outsideteamId: ',',
          address_line_1: '',
          address_line_2: '',
          city: '',
          state: '',
          country: '',
          pin_code: '',
          head_coach_firstname: '',
          head_coach_lastname: '',
          head_coach_email: '',
          head_coach_mobile: '',
          assistant_coach_firstname: '',
          assistant_coach_lastname: '',
          assistant_coach_email: '',
          assistant_coach_mobile: '',
          temporary_rep_firstname: '',
          temporary_rep_lastname: '',
          temporary_rep_email: '',
          temporary_rep_mobile: '',
          logo: ''
        };
      }
    }
    //  setTimeout(() => {
    // this.isLoading = false;
    //     this.ref.markForCheck();
    //   }, 1000);
  }
  countryData(country: any) {
    this.selectedCountryId = country._id;
    this.getStates(this.selectedCountryId);
  }

  stateData(state: any) {
    this.selectedStateId = state._id;
  }

  getEventImage(e: any) {
    let image = e.target.files[0];
    // if (image.name) {
    // const imageType = image.name.split('.')[1];
    // if (imageType === 'png' || imageType === 'jpeg' || imageType === 'jpg') {
    const that = this;
    const reader = new FileReader();

    reader.readAsDataURL(image);
    reader.onload = function (event: any) {
      image = event.target.result;
      const msg = 'Upload Logo';
      that.sharedService.showImageDialog(msg, e).subscribe(
        result => {
          that.event.opponent_team.logo = result.name;
          that.tempFile = result;
          let objectURL1 = URL.createObjectURL(result);
          that.opteamlogo = objectURL1;
        },
        err => {
          console.log(err);
        }
      );
    };
  }

  getAllClubs() {
    this.clubService
      .getClubList()
      .then((res: any) => {
        this.clubList = res.data;
        this.clubList = this.clubList.filter(club => club._id !== this.tempId);
        if (this.selectedClub) {
          this.otherClubgetone(this.selectedClub);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  getAge1Type(age1: any) {
    this.selectedTeam1Age = age1;
    this.event.team1Age = age1;
  }

  getHomeTeam(event: any) {
    if (event && event.value) {
      this.team1Id = event.value;
    }
  }

  getOpponentTeam(e: any) {
    this.team2Id = e.value;
    this.selectedTeam2Id = e.value;
  }
  getOpponentTeamotherclub(e: any) {
    this.team2Id = e.value;
  }
  getType(event: any) {
    if (this.eventTypes && this.eventTypes.length) {
      const selectedObj = this.eventTypes.filter(
        f => f.event_type === event
      )[0];
      this.selectEventId = selectedObj._id;

      this.selectedEvntType = selectedObj.event_type;
      if (selectedObj.event_type === this.match) {
        this.isStandard = false;
        this.isMatch = true;
        this.event.end_date = this.event.start_date;
        this.endRequired = false;
        this.istryOut = false;
      } else {
        this.isStandard = true;
        this.isMatch = false;
        this.isOutside = false;
        this.team2type = '';
        this.istryOut = false;
        this.endRequired = true;
      }
    }
  }

  getEventType(event: any) {
    if (event === this.match) {
      this.isStandard = false;
      this.selectedEvntType = this.match;
      this.isMatch = true;
      this.endRequired = false;
    } else {
      this.selectedEvntType = event;
      this.isStandard = true;
      this.isMatch = false;
      this.isOutside = false;
      this.team2type = '';
      this.endRequired = true;
    }
  }

  getAge2Type(age2: any) {
    this.event.team2Age = age2;
    this.selectedTeam2Age = age2;
  }
  getAge2Typeotherclub(age2: any) {
    this.selectedTeam2Ageotherclub = age2;
  }
  getOutsideSgAgeType(age: any) {
    this.event.opponent_team.age = age;
  }

  otherClubChanged(otherClub: any) {
    this.selectedClub = otherClub;
    this.opponentClubId = otherClub;
    if (this.clubList && this.clubList.length && otherClub) {
      // const opponentClub = this.clubList.filter(c => c._id === otherClub)[0];
      this.teamService
        .getTeamList(otherClub, '', '')
        .then((res: any) => {
          this.team2List = res.data;
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }

  otherClubs(otherClub: any) {
    this.team2List = [];
    this.opponentClubId = otherClub._id;
    this.teamService
      .getTeamList(otherClub._id, '', '')
      .then((res: any) => {
        this.team2List = res.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  otherClubgetone(otherClub) {
    this.teamService
      .getTeamList(otherClub, '', '')
      .then((res: any) => {
        this.team2List = res.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  getOpponentTeams(otherClub: any) {
    this.teamService
      .getTeamList(otherClub.db_name, '', '')
      .then((res: any) => {
        this.team2List = res.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  uploadImage() {
    if (this.tempFile && this.tempFile !== '') {
      const formData = new FormData();
      formData.append('rl_image', this.tempFile);
      formData.append('description', 'new Image');
      if (
        localStorage.user_role === 'Super Admin' ||
        localStorage.user_role === 'Platform Admin'
      ) {
        formData.append('clubId', localStorage.super_cur_clubId);
      }
      this.sharedService.showLoader = true;
      this.resourceService.uploadImage(formData).subscribe((event: any) => {
        this.sharedService.showLoader = false;
        if (event.type === HttpEventType.Response) {
          let a: any = event.body;

          this.event.opponent_team.logo = a.data;
          this.sharedService.showMessage('image uploaded successfully');
        }
      });
    }
  }

  isPaid(event) {
    if (event.checked) {
      this.is_paid = true;
    } else {
      this.is_paid = false;
    }

    // this.tryout.is_paid = event.checked;
  }
  isRepeat(event) {
    this.is_repeated = event.checked;
    if (this.is_repeated === true) {
      if (this.frequency_details === undefined) {
        this.frequency_details = {
          repeat_type: 'day',
          day: '',
          month: '',
          weekOfMonth: '',
          years: ''
        };
      }
      const dialogRef = this.dialog.open(EventRepeatedDialogComponent, {
        width: '380px',

        data: this.frequency_details
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === undefined) {
          this.is_repeated = false;
        }
        this.frequency_details = result;
      });
    }
  }

  validateOrder(text) {
    var phoneNo = '';
    for (let i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (ch >= '0' && ch <= '9') {
        phoneNo += ch;
      }
    }
    setTimeout(() => {
      this.amount = phoneNo;
    }, 0);
  }

  editregistration(ele) {
    let element = {
      data: ele.eventUser._id,
      teamlist: ''
    };
    const dialogRef = this.dialog.open(RegisterUserEditComponent, {
      width: '80%',

      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getOneEvent(this.editEventId);
    });
  }
  linkregistration(element) {
    let ele = {
      data: element.eventUser._id,
      teamlist: this.team1List,
      event: this.editEventId
    };
    const dialogRef = this.dialog.open(RegisterUserEditComponent, {
      width: '40%',

      data: ele
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getOneEvent(this.editEventId);
    });
  }
  linkuserregistration(element) {
    let ele = {
      data: element.registered_user._id,
      teamlist: this.team1List,
      event: this.editEventId,
      linkexitinguser: 'link to existing user'
    };
    const dialogRef = this.dialog.open(RegisterUserEditComponent, {
      width: '40%',

      data: ele
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getOneEvent(this.editEventId);
    });
  }
  getAudience(value) {
    if (value === 'Teams') {
      this.showTeamaudi = true;
    } else {
      this.showTeamaudi = false;
      delete this.event.audiTeam;
    }
  }

  gender(gen: string) {
    this.getAllAge(gen);
  }
  gender2(gen: string) {
    this.getAllAge2(gen);
  }
}
