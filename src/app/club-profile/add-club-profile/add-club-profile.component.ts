import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@app/shared/shared.service';
import { ClubProfileService } from '../club-profile.service';

@Component({
  selector: 'app-add-club-profile',
  templateUrl: './add-club-profile.component.html',
  styleUrls: ['./add-club-profile.component.scss']
})
export class AddClubProfileComponent implements OnInit {
  title: any = 'Create Club Admin Sub Role';
  sportLogo = '';
  tempFile: any = '';
  sport_img: any;
  districtList: any;
  invalidEmail: any;
  invalidNumber: Boolean;
  clubProfileTitle: any = {
    club_profile_title: '',
    active:''
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
    public clubProfileService: ClubProfileService,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.router.url !== '/club-profiles/add') {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.editSportId = param.editSportId;
        }
      );
      this.getOneClubProfileTitle(this.editSportId);
    }
  }

  getOneClubProfileTitle(id: any) {
    this.sharedService.showLoader = true;
    this.isEdit = true;
    this.showImage = true;
    this.title = 'Edit Club Admin Sub Role';
    this.clubProfileService
      .getOneClubProfileTitle(id)
      .then((res: any) => {
        this.clubProfileTitle = res.data; 
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {});
  }

  clubProfileTitleSubmit() {
    this.sharedService
      .showDialog(
        'Fields cannot be empty, enter data in all the fields and then click on submit.'
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/club-profiles');
        }
      });
  }

  createClubProfileTitle() {
    this.sharedService.showLoader = true;
    this.clubProfileService
      .newClubTitle(this.clubProfileTitle)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('club admin sub role created successfully.');
        this.router.navigateByUrl('/club-profiles');
      })
      .catch((err: any) => {
        this.sharedService.loginDialog(err.error.message);
      });
  }

  updateClubProfileTitle() {
    this.sharedService.showLoader = true;
    this.clubProfileService
      .updateClubTitle(this.editSportId, this.clubProfileTitle)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService
          .showMessage('club admin sub role updated successfully')
          .subscribe(() => this.router.navigate(['/club-profiles']));
      })
      .catch((err: any) => {
        this.sharedService.loginDialog(err.error.message);
      });
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
