import { Component, OnInit } from '@angular/core';
import { ResourceService } from '@app/resource/resource.service';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '@app/shared/shared.service';
import { UsersService } from '@app/users/users.service';
import { MailService } from '@app/mail/mail.service';
import { TeamsService } from '@app/teams/teams.service';

@Component({
  selector: 'app-mail-detail',
  templateUrl: './mail-detail.component.html',
  styleUrls: ['./mail-detail.component.scss']
})
export class MailDetailComponent implements OnInit {
  mail={
    content:"",
    createdAt:new Date().toISOString(),
    email:"",
    names: [],
    receiver:{},
    status:true,
    subject:"No Subject"    
  }


  constructor(
    public resourceService: ResourceService,
    public sharedService: SharedService,
    public mailService: MailService,
    public userService: UsersService,
    public teamService: TeamsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    console.log(this.mail);
    this.mail = JSON.parse(sessionStorage.getItem("curSelMail"));
    if (localStorage.user_role === "Super Admin" || localStorage.user_role === "Platform Admin") {
     
    } else {
    
    }  
  }

  

}
