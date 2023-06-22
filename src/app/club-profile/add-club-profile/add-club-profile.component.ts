import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-add-club-profile',
  templateUrl: './add-club-profile.component.html',
  styleUrls: ['./add-club-profile.component.scss']
})
export class AddClubProfileComponent implements OnInit {
  title: any = 'Create Club Profle Title';
  sportLogo = '';
  tempFile: any = '';
  sport_img: any;
  districtList: any;
  invalidEmail: any;
  invalidNumber: Boolean;
  clubProfileTitle: any = {
    club_profile_title: '',
    label:''
  };
  
  selectedValidity: any;
  editSportId: any;
  activeRouteSubscriber: any;
  isEdit = false;
  showImage: Boolean = false;
  dataSource = new MatTableDataSource();
  constructor(
    private router: Router,
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
  }

  createClubProfileTitle() {
    
  }

  clubProfileTitleSubmit() {
    
  }

  updateClubProfileTitle() {
    
  }

  cancelClubProfileTitle() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
      Confirm if you want to leave this page?`
      )
      .subscribe(response => {
        if (response === true) {
          this.router.navigate(['/club-profiles']);
        }
      });
  }

}
