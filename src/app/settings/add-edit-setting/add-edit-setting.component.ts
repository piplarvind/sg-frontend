import { Component, OnInit } from "@angular/core";
import { UsersService } from "@app/users/users.service";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
import { TeamsService } from "@app/teams/teams.service";
import { environment } from "../../../environments/environment";
import { ResourceService } from "@app/resource/resource.service";
import { SettingsService } from "@app/settings/settings.service";
import { SharedService } from "@app/shared/shared.service";
import { ProfilesService } from "@app/profiles/profiles.service";
@Component({
  selector: "app-add-edit-setting",
  templateUrl: "./add-edit-setting.component.html",
  styleUrls: ["./add-edit-setting.component.scss"],
})
export class AddEditSettingComponent implements OnInit {
  isEdit = false;
  clubId: any;
  roleCoach: any;
  coachList: any;
  coachName: any;
  link: any;
  showCoachName: Boolean = false;
  activeRouteSubscriber: any;
  activityTypes: Array<any>;
  videoPath: any = "www.vimeo.com";
  teamsList: any;
  curTrainVideos: Array<any> = [];
  curTrainImages: Array<any> = [];
  curTrainDocs: Array<any> = [];
  curTrainQuiz: Array<any> = [];
  assignTypes: Array<any>;
  athleteList: Array<any>;
  roleAthlete: any;
  newEnv: any = environment;
  taskList: Array<any>;
  curSelectClub: any;
  title = "CREATE SETTINGS";
  setting: any = {
    key: "",
    value: "",
    active: ""
  };
  editSettingId: any;
  constructor(
    private userService: UsersService,
    private teamsService: TeamsService,
    private resourceService: ResourceService,
    private settingsServ: SettingsService,
    private sharedService: SharedService,
    private router: Router,
    private ProfilesService: ProfilesService,
    public activatedRoute: ActivatedRoute
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
    if (this.router.url !== "/settings/add") {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        (param) => {
          this.editSettingId = param.id;
        }
      );
      this.fetchSingleSetting(this.editSettingId);
    }
    if (
      this.router.url !== "/settings/edit" &&
      localStorage.user_role === "Coach"
    ) {
      const userDetails = JSON.parse(localStorage.userDetails);

      this.showCoachName = true;
      this.setting.created_by = userDetails._id;
      let name = {
        fname: "",
        lname: "",
      };
      for (let i = 0; i < userDetails.profile_fields.length; i++) {
        if (userDetails.profile_fields[i].field.name === "first_name") {
          name.fname = userDetails.profile_fields[i].value;
        }
        if (userDetails.profile_fields[i].field.name === "last_name") {
          name.lname = userDetails.profile_fields[i].value;
        }
      }

      this.coachName = name.fname + name.lname;
    }
    this.resourceService
      .getAllAssignmentTypes(this.clubId)
      .subscribe((e: any) => {
        this.assignTypes = e.data;
      });

    this.resourceService.getAllTaskTypes().subscribe((e: any) => {
      this.activityTypes = e.data;
    });

    if (this.router.url === "/settings/add") {
      this.resource();
    }
    if (
      localStorage.user_role === "Super Admin" ||
      localStorage.user_role === "Platform Admin"
    ) {
      this.curSelectClub = localStorage.super_cur_club;
      this.getAllCoach();
      // this.getAllTeams();
      // this.getAllAthletes();
    } else {
      this.curSelectClub = localStorage.dbName;
      this.getAllCoach();
      // this.getAllTeams();
      // this.getAllAthletes();
    }
  }
  resource() {
    // comment
    this.resourceService
      .getAllResources(this.clubId, "", "")
      .subscribe((result: any) => {
        this.taskList = result.data;
        for (let i = 0; i < this.taskList.length; i++) {
          if (this.setting.resources.includes(this.taskList[i]._id)) {
            if (this.taskList[i].type === "video") {
              this.curTrainVideos.push(this.taskList[i]);
            } else if (this.taskList[i].type === "image") {
              this.curTrainImages.push(this.taskList[i]);
            } else if (this.taskList[i].type === "doc") {
              this.curTrainDocs.push(this.taskList[i]);
            } else {
              this.curTrainQuiz.push(this.taskList[i]);
            }
          }
        }
      });
  }
  fetchSingleSetting(id) {
    this.isEdit = true;
    this.title = "EDIT SETTING";
    this.sharedService.showLoader = true;
    this.settingsServ
      .fetchSingleSetting(id)
      .then((e: any) => {
        const obj = e.data;

        this.setting._id = obj._id;
        this.setting.key = obj.key;
        this.setting.value = obj.value;
        this.setting.active = obj.active;
        this.sharedService.showLoader = false;
      })
      .catch((err) => {
        console.log(err);
        this.sharedService.showLoader = false;
      });
  }
  getTaskNameByAssignment(id: any) {
    this.resourceService
      .getTaskNameByAssignment(id)
      .subscribe((result: any) => {
        // console.log("response",result);
        this.taskList = result.data;
      });
  }

  playVideo(resource: any) {
    window.open(
      "https://vimeo.com/" + resource.video.vimeoData.vimeoId,
      "_blank"
    );
  }

  openDocument(resource: any) {
    window.open(`${environment.imageUrl}${resource.doc.filepath}`);
  }

  showImage(resource: any) {
    window.open(`${environment.imageUrl}${resource.image}`);
  }

  getAllCoach() {
    this.ProfilesService.getRoleListAlluser(this.clubId, "Coach").then(
      (e: any) => {
        const newres = e.data.map((prop) => {
          let name: any = {
            fname: "",
            lname: "",
          };

          for (let i = 0; i < prop.profile_fields.length; i++) {
            if (prop.profile_fields[i].field) {
              if (prop.profile_fields[i].field.name === "first_name") {
                name.fname = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === "last_name") {
                name.lname = prop.profile_fields[i].value;
              }
            }
          }
          return {
            ...prop,
            name: name.fname + " " + name.lname,
          };
        });

        this.coachList = newres.reverse();
      }
    );
    // });
  }
  getAllTeams() {
    const temp = "tg_NHUXavJODyGO";
    this.teamsService
      .getTeamList({ clubId: this.curSelectClub }, "", "")
      .then((e: any) => {
        // console.log(e);
        this.teamsList = e.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  getAllAthletes() {
    const temp = {
      hashedId: this.curSelectClub,
    };
    this.userService.getAllRoles().then((e: any) => {
      const roles = e.obj;
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].user_role === "Athlete") {
          this.roleAthlete = roles[i]._id;
          // console.log(this.roleAthlete);
        }
      }

      this.userService
        .getAthleteList({
          hashedId: temp.hashedId,
          role: this.roleAthlete,
        })
        .then((e: any) => {
          this.athleteList = e.data.reverse();
        });
    });
  }
  createSetting() {
    this.sharedService.showLoader = true;
    this.setting.clubId = this.clubId;
    this.settingsServ
      .createSettingData(this.setting)
      .then((res: any) => {
        // this.brandData = res.data;
        this.sharedService.showLoader = false;
        this.sharedService.showMessage("Setting created successfully");
        this.router.navigateByUrl("/settings");
      })
      .catch((err: any) => {});
  }

  updateSetting() {
    this.sharedService.showLoader = true;
    
    this.settingsServ
      .updateSetting(this.setting, this.editSettingId)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.router.navigateByUrl("/settings");
        this.sharedService.showMessage("Setting updated Successfully");
      })
      .catch((err: any) => {});
  }

  cancelChanges() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
    Confirm if you want to leave this page?`
      )
      .subscribe((response) => {
        if (response === true) {
          this.router.navigate(["/settings"]);
        }
      });
  }

  getResources(event: any) {
    this.setting.resources = event.value;
  }

  settingSubmit() {
    this.sharedService
      .showDialog(
        "Fields cannot be empty, enter data in all the fields and then click on submit."
      )
      .subscribe((response) => {
        if (response === "") {
          this.router.navigateByUrl("/settings");
        }
      });
  }

  updateEdit() {
    this.sharedService
      .showDialog(
        `Fields cannot be empty,
    enter data in all the fields and then click on update.`
      )
      .subscribe((response) => {
        if (response === "") {
          this.router.navigateByUrl("/settings");
        }
      });
  }
}
