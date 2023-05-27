import { Component, OnInit } from '@angular/core';
import { EventsService } from '@app/events/events.service';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { UsersService } from '@app/users/users.service';
import { SharedService } from '@app/shared/shared.service';
import { AthletesService } from '@app/athletes/athletes.service';
// import { EventsService } from '@app/events/events.service';
const EDIT_MODE: String = 'edit';
const READ_MODE: String = 'read';
@Component({
  selector: 'app-event-stats',
  templateUrl: './event-stats.component.html',
  styleUrls: ['./event-stats.component.scss']
})
export class EventStatsComponent implements OnInit {
  athleteChange: Array<any>;
  homeTeamWinner: Boolean;
  dataSource = new MatTableDataSource();
  positionList: Array<any> = [];
  eventList: any;
  currentAthlete: any = {};
  saveAthlete: Boolean;
  updateAthlete: Boolean;
  selectedEvent: any;
  eventLocation: string;
  eventTime: string;
  eventDate: any;
  eventWinner: any;
  editStat: Boolean = false;
  updateStat: Boolean = false;
  saveStat: Boolean = true;
  tableData: any = [];
  selectedWinnerTeam2: any;
  showDetails = true;
  athletesList: any;
  selectedAthlete: any;
  athleteIndex = 0;
  setId: any;
  roleAthlete: any;
  curSelectClub: any;
  updateMatchScore: any = {};
  athleteList: Array<any>;
  athleteName: any;
  stats = {
    no_of_set: '',
    position: '',
    serving_attempts: '',
    serving_aces: '',
    serving_errors: '',
    serve_receive_0: '',
    serve_receive_1: '',
    serve_receive_2: '',
    serve_receive_3: '',
    setting_assists: '',
    attacking_attempts: '',
    attacking_kills: '',
    attacking_errors: '',
    attacking_blocks: '',
    blocking_blocks: '',
    blocking_errors: '',
    digging_digs: '',
    digging_errors: ''
  };
  players: Array<Object> = [];
  selectedPosition: any;
  userList: any;
  mode: String;
  curclub: string;
  teamId: any;
  score: any = {};
  displayedColumns: any = [
    'name',
    'setsWon',
    'set1',
    'set2',
    'set3',
    'set4',
    'set5',
    'Actions'
  ];
  athleteId: any;
  eventType1: any;
  teamList: Array<any>;
  eventType2: any;
  clubId: any;
  is_winner: any;
  startDate: any;
  startTime: any;
  selectedWinner: any;
  matchScore: any = {};
  playerData: any = {};
  positionAbbr: any;
  dataS = [
    {
      name: '',
      setsWon: '-',
      set_1: '-',
      set_2: '-',
      set_3: '-',
      set_4: '-',
      set_5: '-'
    },
    {
      name: '',
      setsWon: '-',
      set_1: '-',
      set_2: '-',
      set_3: '-',
      set_4: '-',
      set_5: '-'
    }
  ];
  event: any = {
    name: '',
    location: '',
    start_date: '',
    start_time: '',
    home_team: '',
    opponent_team: ''
  };
  winningTeam: any;
  playerList: any;

  constructor(
    private eventService: EventsService,
    private router: Router,
    private userService: UsersService,
    public sharedService: SharedService,
    public athletesService: AthletesService
  ) {}

  ngOnInit() {
    this.mode = READ_MODE;
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.curclub = localStorage.super_cur_clubId;
    } else {
      this.curclub = localStorage.club_id;
    }
    this.fetchPosition();
    if (this.router.url === '/events/stats') {
      let id = JSON.parse(sessionStorage.curClub);
      // console.log('update stat event data----check here', this.event);
      this.getOneStat(id._id);
      this.fetchPosition();
    }
  }

  editMatchScore() {
    this.mode = EDIT_MODE;
    if (!this.event.home_team_stats && !this.event.opponent_team_stats) {
      this.dataS[0].set_1 = '';
      this.dataS[0].set_2 = '';
      this.dataS[0].set_3 = '';
      this.dataS[0].set_4 = '';
      this.dataS[0].set_5 = '';
      this.dataS[1].set_1 = '';
      this.dataS[1].set_2 = '';
      this.dataS[1].set_3 = '';
      this.dataS[1].set_4 = '';
      this.dataS[1].set_5 = '';
      this.dataS[1].setsWon = '';
      this.dataS[0].setsWon = '';
    }
  }
  saveMatchScore() {
    this.sharedService.showLoader = true;
    const temp = this.score;
    temp.home_team_stats = {
      set_1: this.dataS[0].set_1,
      set_2: this.dataS[0].set_2,
      set_3: this.dataS[0].set_3,
      set_4: this.dataS[0].set_4,
      set_5: this.dataS[0].set_5
    };
    temp.opponent_team_stats = {
      set_1: this.dataS[1].set_1,
      set_2: this.dataS[1].set_2,
      set_3: this.dataS[1].set_3,
      set_4: this.dataS[1].set_4,
      set_5: this.dataS[1].set_5
    };
    temp.home_team_match_point = this.dataS[0].setsWon;
    temp.opponent_team_match_point = this.dataS[1].setsWon;
    temp.clubId = this.clubId;
    temp.team_id = this.teamId;
    if (this.selectedWinner) {
      temp.is_winner = 1;
    }
    if (this.selectedWinnerTeam2) {
      temp.is_winner = 0;
    }
    this.eventService
      .updateStats(temp, this.event._id)
      .then((res: any) => {
        this.sharedService.showLoader = false;
        this.mode = READ_MODE;
        this.sharedService.showMessage('Match Scores saved successfully ');
      })
      .catch((err: any) => {
        console.log('err in match score update', err);
      });
  }

  getWinner(e: any) {
    if (e === 'team1') {
      this.selectedWinner = e;
      // this.homeTeamWinner = true;

      // if (this.event.home_team.athletes.length > 0) {
      //   this.athletesList = this.event.home_team.athletes;
      //   console.log('athlete list ::', this.event.home_team.athletes);
      // }
    }
    if (e === 'team2') {
      this.selectedWinnerTeam2 = e;
      // this.homeTeamWinner = false;
      // if (this.event.opponent_team.athletes.length > 0) {
      //   this.athletesList = this.event.opponent_team.athletes;
      //   console.log('athlete list ::', this.event.opponent_team.athletes);
      // }
    }
  }

  setEvent(row: any) {
    this.showDetails = true;
    this.selectedEvent = row;
    this.eventLocation = row.location;
    this.eventTime = row.eventTime;
    const date = new Date(row.eventDate);
    this.eventDate =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    this.tableData.push(row.team1);
    this.tableData.push(row.team2);
  }

  athleteChanged(e: any) {}

  selectAthlete(row: any, index: any) {
    this.athleteIndex = index;
    this.selectedAthlete = row;
    this.athleteId = row._id;
    this.editStat = false;
    this.saveStat = true;
    this.updateStat = false;
    this.selectedPosition = '';
    this.stats.no_of_set = '';
    this.stats.position = '';
    this.stats.serving_attempts = '';
    this.stats.serving_aces = '';
    this.stats.serving_errors = '';
    this.stats.serve_receive_0 = '';
    this.stats.serve_receive_1 = '';
    this.stats.serve_receive_2 = '';
    this.stats.serve_receive_3 = '';
    this.stats.setting_assists = '';
    this.stats.attacking_attempts = '';
    this.stats.attacking_kills = '';
    this.stats.attacking_errors = '';
    this.stats.attacking_blocks = '';
    this.stats.blocking_blocks = '';
    this.stats.blocking_errors = '';
    this.stats.digging_digs = '';
    this.stats.digging_errors = '';
    for (let i = 0; i < this.playerList.length; i++) {
      if (row._id === this.playerList[i].athlete_id) {
        const updatePlayerStat = this.playerList.filter(
          team => team.athlete_id === row._id
        );
        this.editStat = true;
        this.saveStat = false;
        this.setId = updatePlayerStat[0].set_id._id;
        this.stats.no_of_set = updatePlayerStat[0].set_id.no_of_set;
        this.selectedPosition = updatePlayerStat[0].set_id.position;
        this.stats.serving_attempts =
          updatePlayerStat[0].set_id.serving_attempts;
        this.stats.serving_aces = updatePlayerStat[0].set_id.serving_aces;
        this.stats.serving_errors = updatePlayerStat[0].set_id.serving_errors;
        this.stats.serve_receive_0 = updatePlayerStat[0].set_id.serve_receive_0;
        this.stats.serve_receive_1 = updatePlayerStat[0].set_id.serve_receive_1;
        this.stats.serve_receive_2 = updatePlayerStat[0].set_id.serve_receive_2;
        this.stats.serve_receive_3 = updatePlayerStat[0].set_id.serve_receive_3;
        this.stats.setting_assists = updatePlayerStat[0].set_id.setting_assists;
        this.stats.attacking_attempts =
          updatePlayerStat[0].set_id.attacking_attempts;
        this.stats.attacking_kills = updatePlayerStat[0].set_id.attacking_kills;
        this.stats.attacking_errors =
          updatePlayerStat[0].set_id.attacking_errors;
        this.stats.attacking_blocks =
          updatePlayerStat[0].set_id.attacking_blocks;
        this.stats.blocking_blocks = updatePlayerStat[0].set_id.blocking_blocks;
        this.stats.blocking_errors = updatePlayerStat[0].set_id.blocking_errors;
        this.stats.digging_digs = updatePlayerStat[0].set_id.digging_digs;
        this.stats.digging_errors = updatePlayerStat[0].set_id.digging_errors;
      }
    }
  }

  SavePlayerStats() {
    this.sharedService.showLoader = true;
    this.saveStat = false;
    this.editStat = true;
    this.updateStat = false;
    const temp = this.playerData;
    temp.club = this.clubId;
    temp.team_id = this.teamId;
    temp.event_id = this.event._id;
    temp.player_id = this.athleteId;
    temp.no_of_set = this.stats.no_of_set;
    temp.position = this.selectedPosition;
    temp.serving_attempts = this.stats.serving_attempts;
    temp.serving_aces = this.stats.serving_aces;
    temp.serving_errors = this.stats.serving_errors;
    temp.serve_receive_0 = this.stats.serve_receive_0;
    temp.serve_receive_1 = this.stats.serve_receive_1;
    temp.serve_receive_2 = this.stats.serve_receive_2;
    temp.serve_receive_3 = this.stats.serve_receive_3;
    temp.setting_assists = this.stats.setting_assists;
    temp.attacking_attempts = this.stats.attacking_attempts;
    temp.attacking_kills = this.stats.attacking_kills;
    temp.attacking_errors = this.stats.attacking_errors;
    temp.attacking_blocks = this.stats.attacking_blocks;
    temp.blocking_blocks = this.stats.blocking_blocks;
    temp.blocking_errors = this.stats.blocking_errors;
    temp.digging_digs = this.stats.digging_digs;
    temp.digging_errors = this.stats.digging_errors;
    this.eventService
      .savePlayerStats(temp)
      .then((res: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('Player Stats saved');
        this.router.navigateByUrl('/events');
      })
      .catch((err: any) => {
        console.log('err in match score update', err);
      });
  }

  EditPlayerStats(e: any) {
    this.updateStat = true;
    this.editStat = false;
    this.saveStat = false;
    this.router.navigateByUrl('/events/stats');
  }
  updatePlayerStats() {
    this.sharedService.showLoader = true;
    this.editStat = false;
    this.saveStat = false;
    this.updateStat = true;
    const temp = this.playerData;
    temp.club = this.clubId;

    temp.team_id = this.teamId;
    temp.event_id = this.event._id;
    temp.player_id = this.athleteId;
    temp.no_of_set = this.stats.no_of_set;
    temp.position = this.selectedPosition;
    temp.serving_attempts = this.stats.serving_attempts;
    temp.serving_aces = this.stats.serving_aces;
    temp.serving_errors = this.stats.serving_errors;
    temp.serve_receive_0 = this.stats.serve_receive_0;
    temp.serve_receive_1 = this.stats.serve_receive_1;
    temp.serve_receive_2 = this.stats.serve_receive_2;
    temp.serve_receive_3 = this.stats.serve_receive_3;
    temp.setting_assists = this.stats.setting_assists;
    temp.attacking_attempts = this.stats.attacking_attempts;
    temp.attacking_kills = this.stats.attacking_kills;
    temp.attacking_errors = this.stats.attacking_errors;
    temp.attacking_blocks = this.stats.attacking_blocks;
    temp.blocking_blocks = this.stats.blocking_blocks;
    temp.blocking_errors = this.stats.blocking_errors;
    temp.digging_digs = this.stats.digging_digs;
    temp.digging_errors = this.stats.digging_errors;
    this.eventService
      .updatePlayerStats(temp, this.setId)
      .then((res: any) => {
        this.sharedService.showLoader = false;
        this.saveStat = false;
        this.editStat = true;
        this.updateStat = false;
        this.updateAthlete = true;
        this.sharedService.showMessage('Player Stats updated');
        this.router.navigateByUrl('/events');
      })
      .catch((err: any) => {
        console.log('err in match score update', err);
      });
  }

  cancelStat() {
    if (this.saveStat || this.updateStat) {
      this.sharedService
        .showDialog(
          'All unsaved data will be lost, are you sure you want to cancel?'
        )
        .subscribe(response => {
          if (response) {
            this.router.navigate(['/events']);
          }
        });
    }
    if (this.editStat === true) {
      this.sharedService
        .showDialog('Are you sure you want to cancel?')
        .subscribe(response => {
          if (response) {
            this.router.navigate(['/events']);
          }
        });
    }
  }

  statSubmit() {
    this.sharedService
      .showDialog(
        'Fields cannot be empty, enter data in all the fields and then click on submit.'
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/events/stats');
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
          this.router.navigateByUrl('/events/stats');
        }
      });
  }

  fetchPosition() {
    this.athletesService
      .fetchPosition()
      .then((e: any) => {
        this.positionList = e.data.map(prop => {
          let positonview = '';
          if (prop.abbr) {
            positonview = prop.abbr + ' ' + prop.name;
          }

          return {
            ...prop,
            positonview: positonview
          };
        });
      })
      .catch((err: any) => {
        console.log('error while fetching position', err);
      });
  }

  getposition(position: any) {
    this.stats.position = position._id;
    this.selectedPosition = position._id;
    this.positionAbbr = position.abbr;
  }
  getOneStat(id) {
    this.sharedService.showLoader = true;
    this.eventService
      .getOneEvent(id)
      .then((res: any) => {
        this.sharedService.showLoader = false;

        this.event = res.data;
        this.playerList = this.event.player_score;
        if (this.event.home_team.athletes.length > 0) {
          const newres = this.event.home_team.athletes.map(prop => {
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

          this.athletesList = newres;
        }
        this.clubId = this.event.club;
        this.event = this.eventService.curEvent;
        if (this.event.is_winner === 1) {
          this.winningTeam = 'team1';
          this.getWinner(this.winningTeam);
        }
        if (this.event.is_winner === 0) {
          this.winningTeam = 'team2';
          this.getWinner(this.winningTeam);
        }
        if (this.event.home_team && this.event.home_team.team_id) {
          this.teamId = this.event.home_team.team_id;
        }
        if (
          this.event.home_team &&
          this.event.opponent_team &&
          this.event.home_team.name &&
          this.event.opponent_team.name
        ) {
          this.eventType1 = this.event.home_team.name;
          this.eventType2 = this.event.opponent_team.name;
        }
        // if (this.event.start_date !== '') {
        //   this.startDate = this.event.start_date.split('T')[0];
        // }
        // if (this.event.start_time) {
        //   // const start1 = this.event.start_time.split('T')[1];
        //   const start1 = `${new Date(this.event.start_time)}`;
        //   const startTime1 = start1.split(' ');
        //   const startTime2 = startTime1[4].split(':');
        //   this.startTime = startTime2[0] + ':' + startTime2[1];
        //   // const time = this.event.start_time.split('T')[1];
        //   // const t1 = time.split(':');
        //   // this.startTime = t1[0] + ':' + t1[1];
        // }
        this.startTime = this.event.start_time;
        if (this.event.start_date) {
          this.startDate = this.event.start_date.split('T')[0];
        }

        this.dataS[0].name = this.eventType1;
        this.dataS[1].name = this.eventType2;

        if (this.event.home_team_stats && this.event.opponent_team_stats) {
          this.dataS = [
            {
              name: this.eventType1,
              setsWon: this.event.home_team_match_point,
              set_1: this.event.home_team_stats.set_1,
              set_2: this.event.home_team_stats.set_2,
              set_3: this.event.home_team_stats.set_3,
              set_4: this.event.home_team_stats.set_4,
              set_5: this.event.home_team_stats.set_5
            },
            {
              name: this.eventType2,
              setsWon: this.event.opponent_team_match_point,
              set_1: this.event.opponent_team_stats.set_1,
              set_2: this.event.opponent_team_stats.set_2,
              set_3: this.event.opponent_team_stats.set_3,
              set_4: this.event.opponent_team_stats.set_4,
              set_5: this.event.opponent_team_stats.set_5
            }
          ];

          this.dataSource.data = this.dataS;
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
