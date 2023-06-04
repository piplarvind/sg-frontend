import { Component, OnInit } from '@angular/core';
import { SeasonsService } from '@app/seasons/seasons.service';
import { TeamsService } from '@app/teams/teams.service';
import { SharedService } from '@app/shared/shared.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
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
  selector: 'app-add-season',
  templateUrl: './add-season.component.html',
  styleUrls: ['./add-season.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class AddSeasonComponent implements OnInit {
  title = 'Create Season';

  temp: any;
  today: any = new Date();
  showSubmit: Boolean = true;
  season: any = {
    season_name: '',
    start_date: '',
    end_date: ''
  };
  team1List: any;
  team2List: any;

  isEdit = false;
  constructor(
    private router: Router,
    private seasonService: SeasonsService,
    private teamService: TeamsService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.today = new Date();
    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      this.temp = localStorage.super_cur_club;
    } else {
      this.temp = localStorage.dbName;
    }
    if (this.router.url === '/seasons/edit') {
      this.title = 'Edit Season';
      this.isEdit = true;
      this.showSubmit = false;
      let get_sea = JSON.parse(sessionStorage.curSeason);
      this.season._id = get_sea._id;
      this.fetchOneseason(this.season._id);
    }
  }
  fetchOneseason(season_id) {
    this.sharedService.showLoader = true;
    this.isEdit = true;

    this.title = 'Edit Season';
    this.seasonService
      .getOneSeason(season_id)
      .then((res: any) => {
        this.season = res.data;
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

  createSeason() {
    let credentials: any = {};
    credentials.season_name = this.season.season_name;

    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      // credentials.db_name = localStorage.super_cur_club;
      credentials.club = localStorage.super_cur_clubId;
    } else {
      // credentials.db_name = localStorage.dbName;
      credentials.club = localStorage.club_id;
    }

    credentials.start_date = moment(this.season.start_date).format(
      'YYYY-MM-DD HH:mm'
    );
    credentials.end_date = moment(this.season.end_date).format(
      'YYYY-MM-DD HH:mm'
    );

    this.seasonService
      .newSeason(credentials)
      .then((res: any) => {
        if (res.status === 'Success') {
          this.sharedService.loginDialog(res.message);
        }

        if (res.data === 'null') {
          this.sharedService.loginDialog(res.message);
        }
        this.router.navigateByUrl('/seasons');
      })
      .catch((err: any) => {
        console.log('inside the error function', err);
        // this.sharedService.loginDialog(err.error.message);
      });
  }

  seasonSubmit() {
    this.sharedService
      .showDialog(
        'Fields cannot be empty, enter data in all the fields and then click on submit.'
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/seasons');
        }
      });
  }

  cancelSeason() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
      Confirm if you want to leave this page?`
      )
      .subscribe(response => {
        if (response === true) {
          this.router.navigate(['/seasons']);
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
          this.router.navigateByUrl('/seasons');
        }
      });
  }

  updateSeason() {
    this.sharedService.showLoader = true;
    let temp: any = {};
    temp._id = this.season._id;
    temp.season_name = this.season.season_name;

    temp.start_date = moment(this.season.start_date).format('YYYY-MM-DD HH:mm');
    temp.end_date = moment(this.season.end_date).format('YYYY-MM-DD HH:mm');

    if (
      localStorage.user_role === `${environment.Super_Admin}` ||
      localStorage.user_role === `${environment.Platform_Admin}`
    ) {
      temp.club = localStorage.super_cur_clubId;
    } else {
      temp.club = localStorage.club_id;
    }
    if (temp.club) {
      this.seasonService
        .updateSeason(temp)
        .then((e: any) => {
          this.sharedService.showMessage(e.message);
          this.sharedService.showLoader = false;
          this.router.navigateByUrl('/seasons');
        })
        .catch((err: any) => {
          console.log('err in event creation');
        });
    }
  }
}
