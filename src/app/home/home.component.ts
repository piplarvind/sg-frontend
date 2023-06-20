import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ClubsService } from '@app/clubs/clubs.service';
import { SharedService } from '@app/shared/shared.service';
import { QuoteService } from '@app/home/quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string;
  isLoading: boolean;
  isSuperAdmin: Boolean = false;
  clubsList: Array<any>;
  dashboardStates = [
    { name: 'Profiles Types', userCount: 100 },
    { name: 'No. of Profiles', userCount: 200 },
    { name: 'No. of Atheletes', userCount: 150 },
    { name: 'No. of Coachs', userCount: 75 },
    // Add more states with user count
  ];

  constructor(
    private quoteService: QuoteService,
    private clubService: ClubsService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
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
}
