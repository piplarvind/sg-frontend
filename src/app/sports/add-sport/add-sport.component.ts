import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import { SportsService } from '@app/sports/sports.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
// import { UsersService } from '@app/users/users.service';
import { SharedService } from '@app/shared/shared.service';
import { headerCompRef } from '@app/core/shell/header/header.component';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { ResourceService } from '@app/resource/resource.service';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';
import { ProfilesService } from '@app/profiles/profiles.service';
@Component({
  selector: 'app-add-sport',
  templateUrl: './add-sport.component.html',
  styleUrls: ['./add-sport.component.scss']
})
export class AddSportComponent implements OnInit {
  title: any = 'Create Sport';
  sportLogo = '';
  tempFile: any = '';
  sport_img: any;
  districtList: any;
  invalidEmail: any;
  invalidNumber: Boolean;
  sport: any = {
    sport_code: '',
    sport_name: '',
    description: '',
    color: ''
  };
  
  selectedValidity: any;
  editSportId: any;
  activeRouteSubscriber: any;
  isEdit = false;
  showImage: Boolean = false;
  dataSource = new MatTableDataSource();

  // isLoading = true;
  constructor(
    private router: Router,
    private sportService: SportsService,
    private ProfilesService: ProfilesService,
    // public service: UsersService,
    // public userService: UsersService,
    public sharedService: SharedService,
    public activatedRoute: ActivatedRoute,
    public _DomSanitizationService: DomSanitizer,
    public resourceService: ResourceService,
    private ref: ChangeDetectorRef // private headerComp: HeaderComponent
  ) {}

  ngOnInit() {
    if (this.router.url !== '/sports/add') {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.editSportId = param.editSportId;
        }
      );
      this.getOneSport(this.editSportId);
    }
  }
  
  getOneSport(id: any) {
    this.sharedService.showLoader = true;
    this.isEdit = true;
    this.showImage = true;
    this.title = 'Edit Sport';
    this.sportService
      .getOneSport(id)
      .then((res: any) => {
        this.sport = res.data;      
        if (res.data.logo.length > 3) {
          this.sport_img = `${environment.imageUrl}${res.data.logo}`;
          this.tempFile = res.data.logo;
        }
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {});
  }

  validateUsername(value: any) {
    if (value.search(/^[0-9]{10}$/) === 0) {
      this.invalidNumber = false;
    } else {
      this.invalidNumber = true;
    }
  }

  sportSubmit() {
    this.sharedService
      .showDialog(
        'Fields cannot be empty, enter data in all the fields and then click on submit.'
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/sports');
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
          this.router.navigateByUrl('/sports');
        }
      });
  }

  createSport() {
    this.sharedService.showLoader = true;
    const temp = this.sport;
    delete temp.logo;
    temp.logo = this.tempFile;
    
    this.sportService
      .newSport(temp)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('sport created successfully.');
        this.router.navigateByUrl('/sports');
      })
      .catch((err: any) => {
        this.sharedService.loginDialog(err.error.message);
      });
  }

  updateSport() {
    this.sharedService.showLoader = true;
    const temp = this.sport;
    temp.logo = this.tempFile;
    delete temp.created_by;
    // console.log('temp', temp); return;
    this.sportService
      .updateSport(this.editSportId, temp)
      .then((e: any) => {
        // this.formatMobile();
        this.sharedService.showLoader = false;
        this.sharedService.updatedStatus('changed');
        localStorage.super_cur_sportLogo = e.data.logo;
        const headerRef = headerCompRef();
        headerRef.changeLogo(e.data.logo, this.editSportId);
        // this.sharedService.updatedSportData(localStorage.super_cur_sportLogo);
        this.sharedService
          .showMessage('sport updated successfully')
          .subscribe(() => this.router.navigate(['/sports']));
      })
      .catch((err: any) => {
        this.sharedService.loginDialog(err.error.message);
      });
  }

  cancelSport() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
      Confirm if you want to leave this page?`
      )
      .subscribe(response => {
        if (response === true) {
          this.router.navigate(['/sports']);
        }
      });
  }

  uploadImageFile($event: any, type: any) {}

  inputChanged(e: any) {
    if (e.length <= 10 && e.length > 0) {
      const first = e.substring(0, 3);
      const mid = e.substring(3, 6);
      const last = e.substring(6, 10);
      e = '(' + first + ') ' + mid + '-' + last;
      return e;
    } else if (e.length === 0) {
    }
  }

  extraxtNo(e: any) {
    if (e !== '') {
      e = e.replace(/[^A-Z0-9]+/gi, '');
      return e;
    }
  }

  getSportImage(e: any) {
    let image = e.target.files[0];
    if (image.name) {
      const imageType = image.name.split('.')[1];
      const that = this;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function(event: any) {
        image = event.target.result;
        const msg = 'Upload Team Logo';
        that.sharedService.showImageDialog(msg, e).subscribe(
          result => {
            let objectURL1 = URL.createObjectURL(result);
            that.sport_img = objectURL1;

            if (result.name) {
              that.sport.logo = result.name;
            }
            that.tempFile = result;
          },
          err => {}
        );
      };

      // } else {
      // this.sharedService.loginDialog('Upload an image of type .png/.jpeg/.jpg');
      // }
    }
  }

  uploadBannerImage() {
    if (this.tempFile) {
      const formData = new FormData();
      formData.append('image', this.tempFile);

      this.sharedService.showLoader = true;
      this.resourceService.uploadProfileImage(formData).subscribe(event => {
        if (event.type === HttpEventType.Response) {
          let a: any = event.body;
          this.sharedService.showLoader = false;
          this.tempFile = a.data;
          this.sport.logo = a.data;
          // this.sharedService.showMessage('image updated successfully');
        }
      });
    }
  }
  validateForm(email: any) {
    const x = email;
    const atpos = x.indexOf('@');
    const dotpos = x.lastIndexOf('.');
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
      alert('Not a valid e-mail address');
      return false;
    }
  }

  submitFunction() {}
}
