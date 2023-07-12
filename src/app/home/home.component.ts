import { Component, OnInit } from "@angular/core";
import { finalize } from "rxjs/operators";
import { ClubsService } from "@app/clubs/clubs.service";
import { SharedService } from "@app/shared/shared.service";
import { QuoteService } from "@app/home/quote.service";
import { DashboardService } from "./dashboard.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  staticsData: any;
  quote: string;
  isLoading: boolean;
  isSuperAdmin: Boolean = false;
  clubsList: Array<any>;
  dashboardStates = [
    { name: "User Types", userCount: 0 },
    { name: "No. of Users", userCount: 0 },
    { name: "No. of Atheletes", userCount: 0 },
    { name: "No. of Coachs", userCount: 0 },
    // Add more states with user count
  ];

  constructor(
    private dashboardService: DashboardService,
    private quoteService: QuoteService,
    private clubService: ClubsService,
    public sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dashboardService
      .getStaticsData()
      .then((e: any) => {
        this.staticsData = e.data;
        this.dashboardStates = e.data;
      })
      .catch((err: any) => {
        console.log("err in statics data", err);
      });
    if (
      localStorage.user_role === "Super Admin" ||
      localStorage.user_role === "Platform Admin"
    ) {
      this.isSuperAdmin = true;
      let tempVal;
      this.clubService.getClubList().then((e: any) => {
        this.sharedService.showLoader = false;
        this.clubsList = e.data;
      });
    }
    this.sharedService.showLoader = false;
    // this.isLoading = true;
    // this.quoteService.getRandomQuote({ category: 'dev' })
    //   .pipe(finalize(() => { this.isLoading = false; }))
    //   .subscribe((quote: string) => { this.quote = quote; });
  }

  dropdownChange(e: any) {
    localStorage.super_cur_clubId = e.value._id;
    localStorage.super_cur_club = e.value.db_name;
    localStorage.super_cur_clubName = e.value.club_name;
  }

  navigateToPage(page: string) {
    console.log('page', page);
    let pageUrl = 'athletes';
    switch (page) {
      case 'Patent':
        pageUrl = 'parent';
        break;
      case 'Family-Friends-Fans':
        pageUrl = 'friends-family-fans';
        break;
      case 'Coach':
        pageUrl = 'coach';
        break;
      case 'Club Admin':
        pageUrl = 'club-admin';
        break;
      case 'Recruiter':
        pageUrl = 'recruiter';
        break;
      default:
        pageUrl = 'athletes';
        break;

    }
    this.router.navigateByUrl('/' + pageUrl);
  }
}
