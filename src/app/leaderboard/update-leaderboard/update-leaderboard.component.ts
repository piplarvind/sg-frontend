import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '@app/leaderboard/leaderboard.service';
@Component({
  selector: 'app-update-leaderboard',
  templateUrl: './update-leaderboard.component.html',
  styleUrls: ['./update-leaderboard.component.scss']
})
export class UpdateLeaderboardComponent implements OnInit {

  eventList: any;
  selectedEvent: any;

  eventLocation: string;
  eventTime: string;
  eventDate: any;
  eventWinner: any;
  tableData: any = [];

  showDetails = true;

  athletesList: any;
  selectedAthlete: any;
  athleteIndex = 0;

  stats = {
    'serving': {
      'attempts': 0,
      'success': 0,
      'error': 0,
    },
    'serveRecieve': {
      'attempts': 0,
      'average': 0,
    },
    'setting': {
      'assists': 0,
      'setAssist': 0,
    },
    'attacking': {
      'attempts': 0,
      'kills': 0,
      'errors': 0,
      'blocks': 0,
    },
    'blocking': {
      'blocks': 0,
      'errors': 0,
    },
    'digging': {
      'diggs': 0,
      'errors': 0
    }
  };

  // players: Array<{
  //   stats: {
  //     serving: {
  //       attempts: 0
  //     }
  //   }
  // }>;

  // players: Array<{
  //   stats: {
  //     serving: {
  //       attempts: number,
  //       success: number,
  //       error: number
  //     },
  //     serveRecieve: {
  //       attempts: number,
  //       average: number,
  //     },
  //     setting: {
  //       assists: number,
  //       setAssist: number,
  //     },
  //     attacking: {
  //       attempts: number,
  //       kills: number,
  //       errors: number,
  //       blocks: number,
  //     },
  //     blocking: {
  //       blocks: number,
  //       errors: number,
  //     },
  //     digging: {
  //       diggs: number,
  //       errors: number
  //     }
  //   }
  // }> = [];

  players: Array<Object> = [];
  userList: any;

  // test: Array<{}> = [];

  // test: Array<Test> = [];
  // stats: Array<{ name: string }> = [];
  constructor(private leaderboardService: LeaderboardService) {
    // for (let i = 0; i < 10; i++) {
    //   this.players[i] = {
    //     stats: {
    //       'serving': {
    //         'attempts': 0,
    //         'success': 0,
    //         'error': 0,
    //       },
    //       'serveRecieve': {
    //         'attempts': 0,
    //         'average': 0,
    //       },
    //       'setting': {
    //         'assists': 0,
    //         'setAssist': 0,
    //       },
    //       'attacking': {
    //         'attempts': 0,
    //         'kills': 0,
    //         'errors': 0,
    //         'blocks': 0,
    //       },
    //       'blocking': {
    //         'blocks': 0,
    //         'errors': 0,
    //       },
    //       'digging': {
    //         'diggs': 0,
    //         'errors': 0
    //       }
    //     }
    //   };
    // }
  }

  ngOnInit() {
    this.getAllEvents();
    this.getUsersByRole();

    // this.stats[0]['name'] = 'fsadf';
    // console.log('test obj ::', this.stats);
    // console.log('typeof ::', JSON.stringify(this.stats));
  }

  getAllEvents() {
    this.leaderboardService.getAllEvents()
      .then((result: any) => {
        // console.log('get all events ::', result);
        this.eventList = result.obj;
      });
  }
  setEvent(row: any) {
    console.log('selected event ::', row);
    this.showDetails = true;
    this.selectedEvent = row;
    this.eventLocation = row.location;
    this.eventTime = row.eventTime;

    let date = new Date(row.eventDate);
    console.log(date);
    this.eventDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    this.tableData.push(row.team1);
    this.tableData.push(row.team2);
    console.log('sdfsdf', this.tableData);
  }
  getUsersByRole() {
    this.leaderboardService.getUsersByRole()
      .then((result: any) => {
        console.log('get user by role ::', result);
        this.athletesList = result.obj;
        // for (let i = 0; i < this.athletesList.length; i++) {
        //   this.players[i] = { stats: this.stats };
        // }
      });
  }
  selectAthlete(row: any, i: any) {
    // console.log(i);
    this.selectedAthlete = row;
    this.athleteIndex = i;
    // console.log(this.stats);
    // this.players.push({ stats: this.stats });
    // setTimeout(() => {
    //   // this.stats.serving.attempts = 0;
    //   this.stats.serving.success = 0;
    //   this.stats.serving.error = 0;
    // }, 3000);

    // this.players[i].playerId = this.selectedAthlete;
  }

  updateEvent() {
    const stats = this.stats;
    // this.players.pu
    this.players.push({ stats: stats, playerId: this.selectedAthlete._id });
    const data = {
      userId: '5b02ba1509c48b48675d4b48',
      hashedId: 'tg_wehsVbUNydLP',
      eventName: this.selectedEvent.name,
      eventDesc: this.selectedEvent.Desc,
      location: this.selectedEvent.location,
      eventDate: this.selectedEvent.eventDate,
      eventTime: this.selectedEvent.eventTime,
      _id: this.selectedEvent.team1.teamDetails._id,
      team1: this.selectedEvent.team1.teamDetails._id,
      team2: this.selectedEvent.team2.teamDetails._id,
      // userId : this.selectedEvent._id,
      // players: [{ stats: this.stats }]
      players: this.players
    };
    this.leaderboardService.updateEventById(data)
      .then(response => {
        console.log('update event by id :: ', response);
        this.stats = {
          'serving': {
            'attempts': 0,
            'success': 0,
            'error': 0,
          },
          'serveRecieve': {
            'attempts': 0,
            'average': 0,
          },
          'setting': {
            'assists': 0,
            'setAssist': 0,
          },
          'attacking': {
            'attempts': 0,
            'kills': 0,
            'errors': 0,
            'blocks': 0,
          },
          'blocking': {
            'blocks': 0,
            'errors': 0,
          },
          'digging': {
            'diggs': 0,
            'errors': 0
          }
        };
      });
    // setTimeout(() => {
    //   this.stats.serving.attempts = 0;
    //   this.stats.serving.success = 0;
    //   this.stats.serving.error = 0;
    // }, 3000);
    console.log(this.players);
    // this.players[0].stats = 5;

    // console.log(':: object :: ', this.players);
    // [(ngModel)] = "players[athleteIndex]['stats']['serving']['attempts']"
  }

}
