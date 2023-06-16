import { Component, OnInit } from "@angular/core";
import { ResourceService } from "@app/resource/resource.service";
import { Router, RouterModule } from "@angular/router";
import { SharedService } from "@app/shared/shared.service";
import { UsersService } from "@app/users/users.service";
import { SubscriptionsService } from "@app/subscriptions/subscriptions.service";
import { ProfilesService } from "@app/profiles/profiles.service";
import { TeamsService } from "@app/teams/teams.service";

// import { SearchSelectComponent } from '@app/shared/search-select/search-select.component';
@Component({
  selector: "app-add-subscription",
  templateUrl: "./add-subscription.component.html",
  styleUrls: ["./add-subscription.component.scss"],
})
export class AddSubscriptionComponent implements OnInit {
  curClub: string;
  title = "Create Subscription";
  rolesList: Array<any> = [];
  roleUserList: Array<any>;
  subscription: any = {
    club: "",
    name: "",
    createdBy: "",
    package_amount: "",
    description: "",
    profile_type: "",
    highlight_text: '',
    trial_period: '',
    plan_type: '',
    late_pay_fee: 0,
  };
  dataSource: Array<any> = [];
  isEdit = false;
  showSubmit: Boolean = true;
  constructor(
    public resourceService: ResourceService,
    public sharedService: SharedService,
    public subscriptionService: SubscriptionsService,
    public userService: UsersService,
    public teamService: TeamsService,
    private router: Router,
    public ProfilesService: ProfilesService
  ) {}

  ngOnInit() {
    this.getAllRoles();
    if (
      localStorage.user_role === "Super Admin" ||
      localStorage.user_role === "Platform Admin"
    ) {
      this.curClub = localStorage.super_cur_clubId;
    } else {
      this.curClub = localStorage.club_id;
    }
    if (this.router.url === "/subscriptions/add") {
    }

    if (this.router.url === '/subscriptions/edit') {
      this.title = 'Edit Subscription';
      this.isEdit = true;
      this.showSubmit = false;
      let getSubs = JSON.parse(sessionStorage.selected_subscription);
      this.subscription._id = getSubs._id;
      this.fetchOneSubscription(this.subscription._id);
    }
  }

  fetchOneSubscription(subId) {
    this.sharedService.showLoader = true;
    this.isEdit = true;

    this.title = 'Edit Subscription';
    this.subscriptionService
      .getOneSubscription(subId)
      .then((res: any) => {
        this.subscription = res.data;
        // if (res.data.start_date) {
        //   var date = res.data.start_date.split('T')[0];

        //   this.season.start_date = moment(date);
        // }
        // if (res.data.end_date) {
        //   var date = res.data.end_date.split('T')[0];
        //   this.season.end_date = moment(date);
        // }
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  getAllRoles() {
    const fetch = 'level5'; //fetch only GEN & ATH
    this.ProfilesService.getSpecificRoles(fetch)
      .then((res: any) => {
        this.rolesList = res.data;
      })
      .catch((err: any) => {
        console.log("err happened", err);
      });
  }

  selectRole(role: any) {
    let temp = {
      hashedId: "",
      //
      role: role._id,
    };
    if (
      localStorage.user_role === "Super Admin" ||
      localStorage.user_role === "Platform Admin"
    ) {
      temp.hashedId = localStorage.super_cur_club;
    } else {
      temp.hashedId = localStorage.dbName;
    }
    this.userService
      .getAthleteList(temp)
      .then((res: any) => {
        this.roleUserList = res.data;
      })
      .catch((err: any) => {
        console.log("error occured in fetching data for this role");
      });
  }

  checkTrialInput() {
    if (this.subscription.trial_period < 0) {
      //   this.errPayment = true;
      // } else {
      //   this.errPayment = false;
      this.sharedService.loginDialog('Value cannot be less than 0');
    }
  }

  createSubscription(credentials: any) {
    this.sharedService.showLoader = true;
    const obj = JSON.parse(localStorage.userDetails);
    
    this.subscription.club = this.curClub; 
    this.subscription.createdBy = obj._id;
    this.subscription.plan_type = 'subscription';
    this.subscriptionService.newPlan(this.subscription).subscribe(
      (res: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage("Subscription plan created  successfully");
        this.router.navigate(["/subscriptions"]);
      },
      (err: any) => {
        console.log("error occured", err);
      }
    );
  }

  cancelSubscription() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
      Confirm if you want to leave this page?`
      )
      .subscribe((response) => {
        if (response === true) {
          this.router.navigate(["/subscriptions"]);
        }
      });
  }

  updateEdit() {
    this.sharedService
      .showDialog(
        `Fields cannot be empty,
    senter data in all the fields and then click on update.`
      )
      .subscribe((response) => {
        if (response === "") {
          this.router.navigateByUrl("/subscriptions");
        }
      });
  }

  subscriptionSubmit() {
    this.sharedService
      .showDialog(
        "Fields cannot be empty, enter data in all the fields and then click on submit."
      )
      .subscribe((response) => {
        if (response === "") {
          this.router.navigateByUrl("/subscriptions");
        }
      });
  }

  editSubscription() {
    this.sharedService.showLoader = true;
    this.subscription.installments = this.dataSource;

    const temp = this.subscription;

    this.subscriptionService.updatingPlan(temp).subscribe(
      (res: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage("Plan updated successfully");
        this.router.navigate(["/subscriptions"]);
      },
      (err: any) => {
        console.log("error occured", err);
      }
    );
  }
}
