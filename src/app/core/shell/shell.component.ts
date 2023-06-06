import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatSidenav, MatExpansionPanelTitle } from '@angular/material';
import { filter } from 'rxjs/operators';
import { SharedService } from '../../shared/shared.service';
import { environment } from "../../../environments/environment";
import { SportsService } from '@app/sports/sports.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  user_role: any;
  clubId: any;
  ClubSelected: any;
  message;
  panelOpenState: Boolean = false;
  sportLogo = "./assets/ClubV_logo.png";

  constructor(
    private media: ObservableMedia,
    private sharedService: SharedService,
    private sportService: SportsService,
  ) {
    this.user_role = localStorage.user_role;
    this.clubId = localStorage.club_id;
  }

  ngOnInit() {
    // this.sharedService.getPermission()
    // this.sharedService.receiveMessage()
    // this.message = this.sharedService.currentMessage;
    // console.log(this.message);
    // Automatically close side menu on screens > sm breakpoint
    // this.media.asObservable()
    //   .pipe(filter((change: MediaChange) => (change.mqAlias !== 'xs' && change.mqAlias !== 'sm')))
    //   .subscribe(() => this.sidenav.close());
    const obj = JSON.parse(localStorage.userDetails);
    if (obj.club) {
      this.sportService
      .getSportList()
      .then((e: any) => {
        if (
          localStorage.user_role === "Coach" ||
          localStorage.user_role === "Club Admin"
        ) {
          const sportDetails = e.data.filter((sport) => sport._id === obj.club.sport);
      
          this.sportSelected(sportDetails[0]);
              this.sportLogo = `${environment.imageUrl}${sportDetails[0].logo}`;
            }
          })
          .catch((err) => { });
    }
  }

  sportSelected(sport: any) {
    localStorage.super_cur_sportId = sport._id;
    localStorage.super_cur_sport = sport.db_name;
    localStorage.super_cur_sportName = sport.sport_name;
    localStorage.super_cur_sportLogo = sport.logo;
    if (sport.logo !== "") {
      this.sportLogo = `${environment.imageUrl}${sport.logo}`;
    } else {
      this.sportLogo = "assets/no_logo.png";
    }
  }

  panelClose(panel1: any, panel2: any) {
    panel1.close();
    panel2.close();
  }

  top(t) {
    t.scrollTo(0, 0);
    window.scroll(0, 0);
  }
}
