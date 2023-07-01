import { Component, OnInit } from '@angular/core';
import { UsersService } from '@app/users/users.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { TeamsService } from '@app/teams/teams.service';
import { ResourceService } from '@app/resource/resource.service';
import { TrainingAssignService } from '@app/training-assign/training-assign.service';
import { SharedService } from '@app/shared/shared.service';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import { ProfilesService } from '@app/profiles/profiles.service';
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
  selector: 'app-add-training-assign',
  templateUrl: './add-training-assign.component.html',
  styleUrls: ['./add-training-assign.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class AddTrainingAssignComponent implements OnInit {
  isEdit = false;
  roleCoach: any;
  coachList: any;
  public selectedT: any = {
    athletes: []
  };

  showCoachName: boolean = false;
  coachName: any;
  activeRouteSubscriber: any;
  activityTypes: Array<any>;
  teamsList: any;
  assignTypes: Array<any>;
  athleteList: Array<any>;
  today: any = new Date();
  list: any;
  editAthleteId: any = [];
  roleAthlete: any;
  taskList: Array<any>;
  curSelectClub: any;
  editTrainAssId: any;
  title = 'Add Training Assignment';
  training: any = {
    coach: '',
    team_id: '',
    atheletes: [],
    assignment_type: '',
    task_type: '',
    task_name: '',
    // task_description: '',
    start_date: '',
    end_date: ''
  };
  constructor(
    private userService: UsersService,
    private teamsService: TeamsService,
    private resourceService: ResourceService,
    private trainingServ: TrainingAssignService,
    private sharedService: SharedService,
    private ProfilesService: ProfilesService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.curSelectClub = localStorage.super_cur_clubId;
    } else {
      this.curSelectClub = localStorage.club_id;
    }
    if (this.curSelectClub) {
      this.getAllCoach();
      this.getAllTeams();
    }

    if (
      this.router.url !== '/training/edit' &&
      localStorage.user_role === 'Coach'
    ) {
      const userDetails = JSON.parse(localStorage.userDetails);
      console.log('userDetails', userDetails);

      this.showCoachName = true;
      this.training.coach = userDetails._id;
      let name: any = {
        fname: '',
        lname: ''
      };

      for (let i = 0; i < userDetails.profile_fields.length; i++) {
        if (userDetails.profile_fields[i].field.name === 'first_name') {
          name.fname = userDetails.profile_fields[i].value;
        }
        if (userDetails.profile_fields[i].field.name === 'last_name') {
          name.lname = userDetails.profile_fields[i].value;
        }
      }
      this.coachName = name.fname + ' ' + name.lname;

      console.log('this.training.created_by', this.training.created_by);
    }
    if (this.router.url !== '/training_assign/add') {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.editTrainAssId = param.editTrainAssId;
        }
      );

      // const obj = JSON.parse(sessionStorage.selected_assign_training);
      // console.log('edit training', obj);

      this.getOneTraning(this.editTrainAssId);
    }

    this.resourceService
      .getAllAssignmentTypes(this.curSelectClub)
      .subscribe((e: any) => {
        this.assignTypes = e.data;
      });

    this.resourceService.getAllTaskTypes().subscribe((e: any) => {
      this.activityTypes = e.data;
    });

    // comment
    this.trainingServ
      .getAllTraining(this.curSelectClub)
      .subscribe((result: any) => {
        this.taskList = result.data;
      });
  }
  getCoach(event) {
    if (event.value) {
      this.training.coach = event.value;
    }
  }
  getOneTraning(id: any) {
    this.isEdit = true;
    this.title = 'Edit Training Assignment';
    this.teamsService
      .getTeamList(this.curSelectClub, '', '')
      .then((e: any) => {
        this.teamsList = e.data;

        this.sharedService.showLoader = true;
        this.trainingServ.getOneAssing(id).then(
          (res: any) => {
            this.sharedService.showLoader = false;
            const obj = res.data;
            this.training.library = obj.library._id;
            this.training.coach = obj.coach._id;

            let tem = this.teamsList;
            this.training.team_id = obj.team_id._id;
            if (tem) {
              this.selectedT = tem.filter(t => t._id === obj.team_id._id);

              const newres = this.selectedT[0].athletes.map(prop => {
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
            }

            const arr = [];
            this.training._id = obj._id;
            obj.atheletes.forEach(item => {
              arr.push(item._id);
              this.training.atheletes.push(item._id);

              const temp = {
                hashedId: this.curSelectClub
              };
            });

            this.editAthleteId = this.editAthleteId.concat(arr);

            this.training.assignment_type = obj.library.assignment_type._id;
            this.training.task_type = obj.library.task_type._id;
            this.training.task_name = obj.library.task_name;
            if (obj.start_date) {
              var date = obj.start_date.split('T')[0];

              this.training.start_date = moment(date);
            }
            if (obj.end_date) {
              var date = obj.end_date.split('T')[0];

              this.training.end_date = moment(date);
            }
          },
          (err: any) => {
            console.log('error occured', err);
            // }
          }
        );
      })
      .catch((err: any) => {
        console.log(err);
      });
    // );
  }

  getTaskNameByAssignment(id: any) {
    this.resourceService
      .getTaskNameByAssignment(id)
      .subscribe((result: any) => {
        
        this.taskList = result.data;
      });
  }

  getAllCoach() {
    this.ProfilesService.getRoleList(this.curSelectClub, 'Coach', '', '').then(
      (e: any) => {
        const newres = e.data.map(prop => {
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

        this.coachList = newres.reverse();
      }
    );
  }
  getAllTeams() {
    this.teamsService
      .getTeamList(this.curSelectClub, '', '')
      .then((e: any) => {
        this.teamsList = e.data;

        return this.teamsList;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  selectedTeam(team: any) {
    if (team) {
      this.training.team_id = team;
      this.selectedT = this.teamsList.filter(t => t._id === team);
      if (this.selectedT[0].athletes) {
        const newres = this.selectedT[0].athletes.map(prop => {
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
        return this.athleteList;
      }
    }
  }

  selectedAthletes(team: any) {
    this.athleteList = this.selectedT[0].athletes;
    return this.athleteList;
  }

  assignTraining() {
    const credentials = this.training;
    credentials.clubId = this.curSelectClub;
    // const sd = credentials.start_date.toISOString();
    // const ed = credentials.end_date.toISOString();
    credentials.start_date = moment(credentials.start_date).format(
      'YYYY-MM-DD HH:mm'
    );
    credentials.end_date = moment(credentials.end_date).format(
      'YYYY-MM-DD HH:mm'
    );
    // const newStartDate = moment(sd).add(5.5, 'hours');
    // const newStartDate = moment(sd).format();
    // const newEndDate = moment(ed)
    //   .utcOffset('+05:30')
    //   .format();

    let removeDuplicate = names =>
      names.filter((v, i) => names.indexOf(v) === i);
    this.editAthleteId = removeDuplicate(this.editAthleteId);
    credentials.atheletes = this.editAthleteId;
    if (credentials.atheletes === '') {
      credentials.atheletes = this.athleteList;
    }
    // credentials.start_date = newStartDate;
    // credentials.end_date = newEndDate;
    // credentials.start_date = new Date(newStartDate);
    // credentials.end_date = new Date(newEndDate);

    // this.trainingServ.assignTraining(this.training).subscribe((e: any) => {
    this.trainingServ.assignTraining(credentials).subscribe((e: any) => {
      // console.log('upload successfull');
      this.sharedService
        .showMessage('Training Assignment created successfully')
        .subscribe(() => this.router.navigate(['/training_assign']));
    });
  }

  updateTraining() {
    this.sharedService.showLoader = true;
    const credentials = this.training;
    credentials.start_date = moment(credentials.start_date).format(
      'YYYY-MM-DD HH:mm'
    );
    credentials.end_date = moment(credentials.end_date).format(
      'YYYY-MM-DD HH:mm'
    );
    let removeDuplicate = names =>
      names.filter((v, i) => names.indexOf(v) === i);
    this.editAthleteId = removeDuplicate(this.editAthleteId);
    credentials.atheletes = this.editAthleteId;
    if (credentials.atheletes === '') {
      credentials.atheletes = this.athleteList;
    }
    this.trainingServ
      .updateAssignedTraining(credentials)
      .subscribe((e: any) => {
        this.sharedService.showLoader = false;
        // console.log('upload successfull');
        this.sharedService
          .showMessage('Training Assignment Updated successfully')
          .subscribe(() => this.router.navigate(['/training_assign']));
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
          this.router.navigate(['/training_assign']);
        }
      });
  }

  trainingSubmit() {
    this.sharedService
      .showDialog(
        'Fields cannot be empty, enter data in all the fields and then click on submit.'
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/training_assign');
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
          this.router.navigateByUrl('/training_assign');
        }
      });
  }
  atheleteschange(event: any) {
    this.training.atheletes = event;
    this.editAthleteId = event;
  }
}
