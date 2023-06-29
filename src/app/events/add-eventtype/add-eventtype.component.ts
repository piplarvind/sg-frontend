import { Component, OnInit } from '@angular/core';
import { SharedService } from '@app/shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-add-eventtype',
  templateUrl: './add-eventtype.component.html',
  styleUrls: ['./add-eventtype.component.scss']
})
export class AddEventtypeComponent implements OnInit {
  title = 'Add Event Type';
  isEdit: boolean = false;
  event_type: any;
  editEventTypeId: any;
  activeRouteSubscriber: any;
  // eventtype: {
  //   club: any;
  //   event_type: '';
  // };
  curclub: any;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private eventService: EventsService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.curclub = localStorage.super_cur_clubId;
    } else {
      this.curclub = localStorage.club_id;
    }
    if (this.curclub) {
      // this.getAllEvents();
      // this.getSeasons();
    }
    if (!this.curclub) {
      this.sharedService
        .loginDialog('Please select sport & club from header')
        .subscribe(() => this.router.navigateByUrl('/home'));
    }
    if (this.router.url !== '/event/eventtype/addeventtype') {
      this.isEdit = false;
    }
    if (this.router.url !== '/event/eventtype/addeventtype') {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.editEventTypeId = param.eventId;
          this.isEdit = true;
          this.getOneEvenType(this.editEventTypeId);
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  submitEventType() {
    let temp: any = {};
    if (!this.isEdit) {
      temp.event_type = this.event_type;
      temp.club = this.curclub;
      this.eventService
        .createeventType(temp)
        .then((res: any) => {
          this.sharedService.showLoader = false;
          this.sharedService.showMessage('event type saved Successfully');
          this.router.navigateByUrl('/events/eventtype');
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    if (this.isEdit) {
      temp.event_type = this.event_type;

      this.eventService
        .UpdateeeventType(this.editEventTypeId, temp)
        .then((res: any) => {
          this.sharedService.showLoader = false;
          this.sharedService.showMessage('event type saved Successfully');
          this.router.navigateByUrl('/events/eventtype');
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }
  UpdateEventType() {
    let temp: any = {};
    temp.event_type = this.event_type;

    this.eventService
      .UpdateeeventType(this.editEventTypeId, temp)
      .then((res: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('event type saved Successfully');
        this.router.navigateByUrl('/events/eventtype');
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  getOneEvenType(id) {
    this.eventService
      .getOneeventType(id)
      .then((res: any) => {
        this.event_type = res.data.event_type;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
