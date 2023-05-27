import { Component, OnInit, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UsersService } from '@app/users/users.service';
import { SharedService } from '@app/shared/shared.service';
import { ClubsService } from '@app/clubs/clubs.service';

// import { map, EMPTY as empty } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  buttontext: any = 'All';
  dataSource = new MatTableDataSource();
  isSuperAdmin = false;
  curSelectClub: String;
  clubsList: Array<any> = [];
  displayedColumns: any = ['name', 'role', 'email','mobile_phone', 'createdAt', 'createdBy', 'deleted', 'Actions'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public userService: UsersService,
    public sharedService: SharedService,
    public clubService: ClubsService
  ) {}

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    if (localStorage.user_role === 'Club Admin') {
      this.getUsers();
      this.buttontext = 'Show All';
    } else if (localStorage.user_role === 'Super Admin' || localStorage.user_role === 'Platform Admin') {
      this.isSuperAdmin = true;
      this.curSelectClub = localStorage.super_cur_clubId;
      if (!this.curSelectClub) {
        this.sharedService.loginDialog('Select the club').subscribe(() => this.router.navigateByUrl('/home'));
      }
      this.getUsers();
      this.buttontext = 'Show All';
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  getAllUsers() {
    this.sharedService.showLoader = true;
    let tempUserDetails;
    if (localStorage.user_role === 'Club Admin') {
      tempUserDetails = {
        clubId: localStorage.club_id
      };
    } else if (localStorage.user_role === 'Super Admin' || localStorage.user_role === 'Platform Admin') {
      tempUserDetails = {
        clubId: this.curSelectClub
      };
    }
    this.userService.getAllUserList(tempUserDetails, true).then((e: any) => {
      this.sharedService.showLoader = false;
      console.log('All uesrs',e.data);
      const newres = e.data.map(prop => {
        if (prop.user_id) {
          return {
            ...prop,
            name: prop.user_id.first_name + ' ' + prop.user_id.last_name,
            role: prop.user_id.role.user_role,
            email: prop.user_id.email,
            createdAt: prop.user_id.createdAt.split('T')[0],
            deleted: prop.user_id.deleted
          };
        }
        if (prop.last_name) {
          return {
            ...prop,
            name: prop.first_name + ' ' + prop.last_name,
            role: prop.user_id.role.user_role,
            email: prop.user_id.email,
            createdAt: prop.createdAt.split('T')[0],
            deleted: prop.user_id.deleted,
            createdBy: prop.createdBy.first_name + prop.createdBy.last_name + '-' + prop.createdBy.role.user_role
          };
        }
      });

      this.dataSource.data = newres.reverse();
    });
  }

  getUsers() {
    this.sharedService.showLoader = true;
    let tempUserDetails;
    if (localStorage.user_role === 'Club Admin') {
      tempUserDetails = {
        clubId: localStorage.club_id
      };
    } else if (localStorage.user_role === 'Super Admin' || localStorage.user_role === 'Platform Admin') {
      tempUserDetails = {
        clubId: this.curSelectClub
      };
    }
    this.userService.getUserList(tempUserDetails).then((e: any) => {
      this.sharedService.showLoader = false;
      console.log('uesrs');
      const newres = e.data.map(prop => {
        if (prop.user_id) {
          return {
            ...prop,
            name: prop.user_id.first_name + ' ' + prop.user_id.last_name,
            role: prop.user_id.role.user_role,
            email: prop.user_id.email,
            createdAt: prop.user_id.createdAt.split('T')[0],
            deleted: prop.user_id.deleted,
            mobile_phone:
              '(' +
              prop.user_id.mobile_phone.substr(0, 3) +
              ')' +
              ' ' +
              prop.user_id.mobile_phone.substr(3, 3) +
              '-' +
              prop.user_id.mobile_phone.substr(6, 4)
          };
        }
        if (prop.last_name) {
          return {
            ...prop,
            name: prop.first_name + ' ' + prop.last_name,
            role: prop.user_id.role.user_role,
            email: prop.user_id.email,
            createdAt: prop.createdAt.split('T')[0],
            deleted: prop.user_id.deleted,
            createdBy: prop.createdBy.first_name + prop.createdBy.last_name + '-' + prop.createdBy.role.user_role,
            mobile_phone:
              '(' +
              prop.user_id.mobile_phone.substr(0, 3) +
              ')' +
              ' ' +
              prop.user_id.mobile_phone.substr(3, 3) +
              '-' +
              prop.user_id.mobile_phone.substr(6, 4)
          };
        }
      });

      this.dataSource.data = newres.reverse();
    });
  }

  editUser(user: any) {
    this.router.navigate(['/users/edit/{{user.user_id._id}}'], {
      queryParams: { userId: user.user_id._id }
    });
  }

  deleteUser(row: any) {
    console.log("row", row);
    
    this.sharedService.showDialog('This action will delete the user permanently. Are you sure to continue?').subscribe(response => {
      if (response !== '') {
    this.sharedService.showLoader = true;
    row.hashedId = localStorage.dbName;
  
    this.userService.userdelete(row).then((e: any) => {
      this.getUsers();
      this.buttontext = 'Show All';
      this.sharedService.showLoader = false;
      this.sharedService.showMessage(e.message);
    });
  }
});
  }
  InactiveUser(row: any) {
    console.log("row", row);
    
  
    this.sharedService.showLoader = true;
    row.hashedId = localStorage.dbName;
  
    this.userService.userinactive(row).then((e: any) => {
      this.getUsers();
      this.buttontext = 'Show All';
      this.sharedService.showLoader = false;
      this.sharedService.showMessage(e.message);
    });
 
  }

  getStatus(status: boolean) {
    if (status) {
      return 'INACTIVE';
    } else {
      return 'ACTIVE';
    }
  }

  ShowAll(event: any) {
    if (this.buttontext === 'Show All') {
      this.getAllUsers();
      this.buttontext = 'Show Active';
    } else {
      this.buttontext = 'Show All';
      this.getUsers();
    }
  }
}
