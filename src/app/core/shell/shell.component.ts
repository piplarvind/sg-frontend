import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatSidenav, MatExpansionPanelTitle } from '@angular/material';
import { filter } from 'rxjs/operators';
import { SharedService } from '../../shared/shared.service';

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
  constructor(
    private media: ObservableMedia,
    private sharedService: SharedService
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
