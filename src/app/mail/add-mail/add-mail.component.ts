import { Component, OnInit } from '@angular/core';
import { ResourceService } from '@app/resource/resource.service';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '@app/shared/shared.service';
import { UsersService } from '@app/users/users.service';
import { MailService } from '@app/mail/mail.service';
import { ProfilesService } from '@app/profiles/profiles.service';
import { TeamsService } from '@app/teams/teams.service';

// import { SearchSelectComponent } from '@app/shared/search-select/search-select.component';
@Component({
  selector: 'app-add-mail',
  templateUrl: './add-mail.component.html',
  styleUrls: ['./add-mail.component.scss']
})
export class AddMailComponent implements OnInit {
  isTeamSelected: boolean = false;
  isRoleSelected: boolean = false;
  recVal: string = 'all';
  removable: boolean = true;
  selectedUsers: Array<any>;
  curClub: string;
  selectedTeams: Array<any>;
  recipients = [];
  title = 'Compose Mail';
  rolesList: Array<any> = [];
  roleUserList: Array<any>;
  mailSub: string;
  htmlContent: any;
  teamsList: Array<any> = [];
  constructor(
    public resourceService: ResourceService,
    public sharedService: SharedService,
    public mailService: MailService,
    public userService: UsersService,
    public teamService: TeamsService,
    private router: Router,
    public ProfilesService: ProfilesService
  ) {}

  ngOnInit() {
    this.recipients = [{ name: 'All' }];
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.curClub = localStorage.super_cur_clubId;
    } else {
      this.curClub = localStorage.club_id;
    }
    if (this.router.url === '/mail/add') {
    }
  }

  recipientChanged(e: any) {
    if (e.value === 'team') {
      this.getAllTeams();
      this.recipients = [];
      this.isTeamSelected = true;
      this.isRoleSelected = false;
    } else if (e.value === 'role') {
      this.isTeamSelected = false;
      this.isRoleSelected = true;
      this.getAllRoles();
      this.recipients = [];
    } else {
      this.recipients = [{ name: 'All' }];
      this.isTeamSelected = false;
      this.isRoleSelected = false;
      return 0;
    }
  }

  remove(recipient: any): void {
    const index = this.recipients.indexOf(recipient);
    if (index >= 0) {
      this.recipients.splice(index, 1);
    }
  }

  getAllRoles() {
    this.ProfilesService.getRoles()
      .then((res: any) => {
        this.rolesList = res.data;
      })
      .catch((err: any) => {
        console.log('err happened', err);
      });
  }

  sendClubMail() {
    let temp = {
      club: this.curClub,
      subject: this.mailSub,
      content: this.htmlContent
    };
    this.mailService.sendMailToAll(temp).subscribe(
      (res: any) => {
        this.sharedService.showMessage(res.message);
        this.router.navigate(['/mail']);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  sendRoleMail() {
    let idArray = [];
    for (let i = 0; i < this.recipients.length; i++) {
      idArray.push(this.recipients[i].id);
    }
    let temp = {
      club: this.curClub,
      users: idArray,
      subject: this.mailSub,
      content: this.htmlContent
    };
    this.mailService.sendMailToRole(temp).subscribe(
      (res: any) => {
        this.sharedService.showMessage(res.message);
        this.router.navigate(['/mail']);
      },
      (err: any) => {
        console.log('error', err);
      }
    );
  }

  sendToTeams() {
    let idArray = [];
    for (let i = 0; i < this.recipients.length; i++) {
      idArray.push(this.recipients[i].id);
    }
    let temp = {
      club: this.curClub,
      teams: idArray,
      subject: this.mailSub,
      content: this.htmlContent
    };
    this.mailService.sendMailToTeams(temp).subscribe(
      (res: any) => {
        this.sharedService.showMessage(res.message);
        this.router.navigate(['/mail']);
      },
      (err: any) => {
        console.log('error', err);
      }
    );
  }

  sendMail() {
    if (this.isTeamSelected === false && this.isRoleSelected === false) {
      this.sendClubMail();
    } else if (this.isRoleSelected === true && this.isTeamSelected === false) {
      this.sendRoleMail();
    } else if (this.isTeamSelected === true && this.isRoleSelected === false) {
      this.sendToTeams();
    }
  }

  getUsersbyRole(event: any) {
    this.ProfilesService.getRoleList(this.curClub, event.value.name, '', '')
      .then((res: any) => {
        const newres = res.data.map(prop => {
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
        this.roleUserList = newres;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  getUserRecipient(event: any) {
    let newList = [];
    for (let i = 0; i < event.value.length; i++) {
      let temp = {
        id: event.value[i]._id,
        name: event.value[i].name
      };
      newList.push(temp);
    }

    this.recipients = newList;
  }

  selectRole(role: any) {
    let temp = {
      hashedId: '',
      //
      role: role._id
    };
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
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
        console.log('error occured in fetching data for this role');
      });
  }

  getAllTeams() {
    this.teamService
      .getTeamList(this.curClub, '', '')
      .then((res: any) => {
        this.teamsList = res.data;
      })
      .catch((err: any) => {
        console.log('error occured in fetching data for this role', err);
      });
  }

  getTeamsRecipient(event: any) {
    let newList = [];
    for (let i = 0; i < event.value.length; i++) {
      let temp = {
        id: event.value[i]._id,
        name: event.value[i].name
      };
      newList.push(temp);
    }
    this.recipients = newList;
  }
}
