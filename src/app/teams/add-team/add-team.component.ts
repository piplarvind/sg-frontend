import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamsService } from '@app/teams/teams.service';
import { UsersService } from '@app/users/users.service';
import { ClubsService } from '@app/clubs/clubs.service';
import { PackagesService } from '../../packages/packages.service';
import { SharedService } from '@app/shared/shared.service';
import { ResourceService } from '@app/resource/resource.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { ProfilesService } from '@app/profiles/profiles.service';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
  title: any = 'Create Team';
  GenderList: any = [];
  showathlete: any = [];
  clubLogo = '';
  img: any;
  logo_img: any;
  packageList: Array<any> = [];
  list: Array<any>;
  editTeamId: any;
  name: string;
  ageList: any;
  logo: string;
  banner: string;
  club: any;
  email: any;
  noAthlete = true;
  athleteData: any;
  selectedAthlete: Array<any> = [];
  roleClub: any;
  contact_no: any;
  address: any;
  roleAthletes: any;
  coachList: any;
  athleteList: any;
  isLoading = true;
  showSubmit = true;
  team: any = {
    name: '',
    contact_no: '',
    email: '',
    members: '',
    address: '',
    age: '',
    package: '',
    club: '',
    athletes: '',
    banner: '',
    logo: '',
    head_coach: '',
    assistant_coach: '',
    team_rep: '',
    info: '',
    order: ''
  };
  temp: any;
  activeRouteSubscriber: any;
  tempFile: any;
  tempFile1: any;
  isEdit = false;
  clubId: any;
  roleCoach: any;
  showUploadImg = false;
  selectedAge: any;
  selectedHeadCoach: any;
  curSelectClub: any;
  isSuperAdmin = false;
  clubList: Array<any> = [];
  roleParent: any;
  parentList: Array<any> = [];
  selectedTeamAge: any;
  constructor(
    private router: Router,
    private teamService: TeamsService,
    private userService: UsersService,
    private packageService: PackagesService,
    public sharedService: SharedService,
    public clubService: ClubsService,
    public activatedRoute: ActivatedRoute,
    public resourceService: ResourceService,
    public _DomSanitizationService: DomSanitizer,
    private ProfilesService: ProfilesService
  ) {}

  ngOnInit() {
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.clubId = localStorage.super_cur_clubId;
    } else {
      this.clubId = localStorage.club_id;
    }
    if (this.clubId) {
      this.getClubPlans();
      this.getAllCoach();
      this.getReperent();
      this.getGender();

      this.getAllAthletes();
    }

    this.temp = localStorage.dbName;

    if (
      (localStorage.user_role === `${environment.Super_Admin}` ||
        localStorage.user_role === `${environment.Platform_Admin}`) &&
      this.router.url === '/teams/add'
    ) {
      this.isSuperAdmin = true;
    }

    if (this.router.url !== '/teams/add') {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.isEdit = true;
          this.editTeamId = param.teamId;
          this.getOneTeam(this.editTeamId);
        },
        err => {
          console.log(err);
        }
      );

      this.showUploadImg = true;
    }
  }
  getGender() {
    this.ProfilesService.getGenderList().then((res: any) => {
      this.GenderList = [...res.data];
    });
  }
  getAllAthletes() {
    this.sharedService.showLoader = true;

    this.ProfilesService.getRoleListAlluser(this.clubId, 'Athlete').then(
      (res: any) => {
        this.sharedService.showLoader = false;

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
        if (!this.isEdit && !this.team.age) {
          this.athleteList = newres.filter(a => a.teams.length === 0);
        }
        if (this.isEdit && !this.team.age) {
          let list = newres.filter(a => a.teams.length === 0);
          if (this.selectedAthlete.length >= 0) {
            const arr = [];
            for (let i = 0; i < newres.length; i++) {
              for (let j = 0; j < this.selectedAthlete.length; j++) {
                if (this.selectedAthlete[j] === newres[i]._id) {
                  arr.push(newres[i]);
                }
              }
            }
            this.showathlete = arr;
            this.athleteList = arr.concat(list);
            this.sharedService.showLoader = false;
          }
        }
      }
    );
  }
  getAllAge(Id) {
    this.ProfilesService.getAgeListfilterGender(Id).then((res: any) => {
      this.ageList = [...res.data];
      this.ageChanged(this.team.age);
    });
  }
  getOneTeam(id: any) {
    this.sharedService.showLoader = true;
    this.isEdit = true;
    this.title = 'Edit Team';

    this.teamService
      .getOneTeam(id)
      .then((e: any) => {
        this.team = e.data;

        if (e.data.age) {
          if (this.team.age.gender) {
            this.team.gender = this.team.age.gender;
            this.getAllAge(this.team.age.gender);
            this.team.age = e.data.age._id;
          }
        }

        if (e.data.assistant_coach) {
          this.team.assistant_coach = e.data.assistant_coach._id;
        }
        if (e.data.team_rep) {
          this.team.team_rep = e.data.team_rep._id;
        }
        if (e.data.head_coach) {
          this.team.head_coach = e.data.head_coach._id;
        }

        if (this.team.package !== null) {
          this.team.package = this.team.package;
        }
        if (this.team.athletes) {
          const tempArray = [];
          for (let i = 0; i < this.team.athletes.length; i++) {
            tempArray.push(this.team.athletes[i]._id);
          }

          this.team.athletes = tempArray;

          if (e.data.banner) {
            this.img = `${environment.imageUrl}/${e.data.banner}`;
          } else if (!e.data.banner) {
            e.data.banner = '';
          }
          if (e.data.logo) {
            this.logo_img = `${environment.imageUrl}/${e.data.logo}`;
          }

          this.selectedAthlete = tempArray;
        }
        this.selectedTeamAge = JSON.stringify(e.data.age);
      })
      .catch(err => {
        console.log(err);
        this.sharedService.showLoader = false;
      });
  }

  cancelTeam() {
    this.sharedService
      .showDialog(
        'All the unsaved data will be lost. Are you sure you want to leave this page?'
      )
      .subscribe(response => {
        if (response === true) {
          this.router.navigate(['/teams']);
        }
      });
  }

  teamSubmit() {
    this.sharedService
      .showDialog(
        'Fields cannot be empty, enter data in all the fields and then click on submit.'
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigate(['/teams']);
        }
      });
  }

  createTeam() {
    this.sharedService.showLoader = true;
    const temp = this.team;

    temp.club = this.clubId;

    for (let propName in temp) {
      if (
        temp[propName] === null ||
        temp[propName] === undefined ||
        temp[propName] === ''
      ) {
        delete temp[propName];
      }
    }
    this.teamService
      .newTeam(temp)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService
          .showMessage('Team created Successfully')
          .subscribe(() => this.router.navigate(['/teams']));
      })
      .catch(err => {
        this.sharedService.showLoader = false;
        console.log(err);
      });
  }

  updateTeam() {
    const temp = this.team;
    this.sharedService.showLoader = true;

    const formData = new FormData();

    temp.logo = this.team.logo;

    temp.banner = this.team.banner;

    temp.club = this.clubId;

    this.teamService
      .updateTeam(this.editTeamId, temp)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService
          .showMessage('Team Updated Successfully')
          .subscribe(() => this.router.navigate(['/teams']));
      })
      .catch(err => {
        this.sharedService.showLoader = false;
        console.log(err);
      });
  }

  dropdownChange(e: any) {
    this.userService
      .getAthleteList({
        hashedId: this.curSelectClub,
        role: this.roleClub
      })
      .then((value: any) => {
        this.coachList = value.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
    this.userService
      .getAthleteList({
        hashedId: this.curSelectClub,
        role: this.roleAthletes
      })
      .then((res: any) => {
        this.athleteList = res.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  getTeamImage(e: any) {
    let image = e.target.files[0];
    if (image.name) {
      const imageType = image.name.split('.')[1];
      const that = this;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function(event: any) {
        image = event.target.result;
        const msg = 'Upload Team Photo';

        that.sharedService.showImageDialog(msg, e, true).subscribe(
          result => {
            that.team.logo = result.name;
            let objectURL1 = URL.createObjectURL(result);
            that.logo_img = objectURL1;
            that.tempFile = result;
          },
          err => {
            console.log(err);
          }
        );
      };
    }
  }

  getBannerImage(e: any) {
    let image = e.target.files[0];
    if (image.name) {
      const that = this;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function(event: any) {
        image = event.target.result;
        var imgURL = reader.result;

        const msg = 'Upload Banner';
        that.sharedService.showImageDialog(msg, e, true).subscribe(
          result => {
            that.team.banner = result.name;
            that.tempFile1 = result;

            var objectURL = URL.createObjectURL(result);
            that.img = objectURL;
          },
          err => {
            console.log(err);
          }
        );
      };
    }
  }
  uploadBannerImage() {
    this.sharedService.showLoader = true;
    const formData = new FormData();
    formData.append('rl_image', this.tempFile1);
    formData.append('description', 'new Image');
    // that.imageUrl =window.URL.createObjectURL(result);

    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      formData.append('clubId', localStorage.super_cur_clubId);
    }

    this.resourceService.uploadImage(formData).subscribe(event => {
      if (event.type === HttpEventType.Response) {
        let a: any = event.body;
        this.tempFile1 = this.team.banner;
        this.team.banner = a.data;
        this.sharedService.showMessage('Image  uploaded Successfully');
      }

      this.sharedService.showLoader = false;
    });
    err => {
      console.log(err);
    };
  }
  uploadTeamImage() {
    const formData = new FormData();
    formData.append('rl_image', this.tempFile);
    formData.append('description', 'new Image');
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      formData.append('clubId', localStorage.super_cur_clubId);
    }

    this.resourceService.uploadImage(formData).subscribe(
      event => {
        if (event.type === HttpEventType.Response) {
          let a: any = event.body;

          this.team.logo = a.data;
          this.sharedService.showMessage('Image  uploaded Successfully');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getTeamAthletes(event?: any) {
    if (event.value) {
      this.team.athletes = event.value;
    }
  }

  getClubPlans() {
    this.packageService
      .getClubPackageallPlans(this.clubId, 'Club_Package')
      .subscribe(
        (res: any) => {
          this.packageList = res.data;
        },
        err => {
          console.log('inside error', err);
        }
      );
  }

  getReperent() {
    this.ProfilesService.getRoleListAlluser(this.clubId, 'Parent').then(
      (res: any) => {
        const newres = res.data.map(prop => {
          let name: any = {
            fname: '',
            lname: ''
          };
          if (prop.profile_fields) {
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
          }
          return {
            ...prop,
            name: name.fname + ' ' + name.lname
          };
        });

        this.parentList = newres;
      },
      err => {
        console.log('inside error', err);
      }
    );
  }

  getHeadCoach(event?: any) {
    if (event.value) {
      this.team.head_coach = event.value;
    }
  }

  getAssistant(event?: any) {
    if (event.value) {
      this.team.assistant_coach = event.value;
    }
  }

  getTeamRep(event?: any) {
    if (event.value) {
      this.team.team_rep = event.value;
    }
  }

  ageChanged(event: any) {
    this.athleteList = [];

    this.team.age = event;
    if (this.ageList) {
      let ageselected = this.ageList.filter(t => t._id === event);
      let agese = ageselected[0].name + '&gender=' + this.team.gender;
      this.ProfilesService.getAthleteListByage(this.clubId, 'Athlete', agese)
        .then((res: any) => {
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

          if (!this.isEdit) {
            this.athleteList = newres.filter(a => a.teams.length === 0);
          }
          if (this.isEdit) {
            let list = newres.filter(a => a.teams.length === 0);
            if (this.selectedAthlete.length >= 0) {
              const arr = [];
              for (let i = 0; i < newres.length; i++) {
                for (let j = 0; j < this.selectedAthlete.length; j++) {
                  if (this.selectedAthlete[j] === newres[i]._id) {
                    arr.push(newres[i]);
                  }
                }
              }
              this.showathlete = arr;
              this.athleteList = arr.concat(list);
            }
            this.sharedService.showLoader = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  getAllCoach() {
    this.ProfilesService.getRoleListAlluser(this.clubId, 'Coach')
      .then((res: any) => {
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

        this.coachList = newres.reverse();

        //
      })
      .catch(err => {
        console.log(err);
      });
  }
  gender(gen: string) {
    this.getAllAge(gen);
  }
}
