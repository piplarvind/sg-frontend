import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material';

import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { I18nService } from '@app/core/i18n.service';
import { ClubsService } from '@app/clubs/clubs.service';
import { SharedService } from '@app/shared/shared.service';

import { environment } from '../../../../environments/environment';

let ref = null;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  user_role: any;
  storedVal: any;
  id: any;
  @Input()
  sidenav: MatSidenav;
  coachClubId: any;
  quote: string;
  clubLogo = './assets/ClubV_logo.png';
  isLoading: boolean;
  isSuperAdmin = false;
  clubsList: Array<any>;
  selectedClub = '';
  // selectedClub = localStorage.super_cur_clubName ? localStorage.super_cur_clubName : '';

  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService,
    private clubService: ClubsService,
    private sharedService: SharedService
  ) {
    // ref = this;
  }

  ngOnInit() {
    const obj = JSON.parse(localStorage.userDetails);

    this.id = obj._id;
    ref = this;
    this.selectedClub = localStorage.super_cur_clubId
      ? localStorage.super_cur_clubId
      : '';
    this.clubLogo =
      localStorage.getItem('super_cur_clubLogo') ||
      localStorage.getItem('updatedLogo') ||
      'assets/no_logo.png';
    if (this.clubLogo === 'assets/no_logo.png') {
      this.clubLogo = `${this.clubLogo}`;
    } else {
      this.clubLogo = `${environment.imageUrl}/${this.clubLogo}`;
    }

    this.user_role = localStorage.user_role;
    this.storedVal = localStorage;

    this.sharedService.clubStatus.subscribe((res: any) => {
      this.getAllCLubs();
    });

    // this.sharedService.clubUpdateLogo.subscribe((res: any) => {
    // });

    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.isSuperAdmin = true;
      this.getAllCLubs();
    }

    if (localStorage.user_role === 'Club Admin') {
      const obj = JSON.parse(localStorage.userDetails);
      this.storedVal.super_cur_clubName = obj.club.club_name;
    }

    if (
      localStorage.user_role === 'Coach' ||
      localStorage.user_role === 'Club Admin'
    ) {
      this.getAllCLubs();
      const obj = JSON.parse(localStorage.userDetails);
      this.storedVal.super_cur_clubName = obj.club.club_name;
      const clubId = obj.club._id;
      this.clubService
        .getClubList()
        .then((e: any) => {
          if (
            localStorage.user_role === 'Coach' ||
            localStorage.user_role === 'Club Admin'
          ) {
            const clubDetails = e.data.filter(club => club._id === clubId);

            this.clubLogo = `${environment.imageUrl}/${clubDetails[0].logo}`;
          }
        })
        .catch(err => {});
    }

    this.getClubList();
  }

  ngAfterViewInit() {
    //   this.getClubLogo();
  }

  selectClub() {}

  getClubList() {
    this.clubService
      .getClubList()
      .then((e: any) => {
        this.clubsList = e.data;
      })
      .catch(err => {});
  }

  getAllCLubs() {
    this.clubService
      .getClubList()
      .then((e: any) => {
        this.clubsList = e.data;
      })
      .catch(err => {});
  }

  clubSelected(club: any) {
    localStorage.super_cur_clubId = club._id;
    localStorage.super_cur_club = club.db_name;
    localStorage.super_cur_clubName = club.club_name;
    localStorage.super_cur_clubLogo = club.logo;
    if (club.logo !== '') {
      this.clubLogo = `${environment.imageUrl}/${club.logo}`;
    } else {
      this.clubLogo = 'assets/no_logo.png';
    }
  }

  public changeLogo(logo: string, club_id) {
    if (club_id === localStorage.super_cur_clubId) {
      this.clubLogo = `${environment.imageUrl}/${logo}`;
    }

    // this.clubLogo = 'https://clubs.inc.com/sg/' + logo;
  }

  dropdownChange(id: any) {
    localStorage.curentSelectedClub = id;
    const clubData = this.clubsList.filter(f => f._id === id)[0];
    switch (this.router.url) {
      case '/clubs/add':
      case '/clubs/edit':
      case '/users/add':
      case '/users/edit':
      case '/teams/add':
      case '/teams/edit':
      case '/coach/add':
      case '/coach/edit':
      case '/athletes/add':
      case '/athletes/edit':
      case '/resources/add':
      case '/resources/edit':
      case '/training/add':
      case '/training/edit':
        this.sharedService
          .showDialog({ name: 'sdfaads' })
          .subscribe((response: any) => {
            if (response) {
              this.router.navigate(['/clubs']);
            }
          });
        break;
      default:
        this.router.navigate(['/clubs']);
    }

    localStorage.super_cur_clubId = clubData._id;
    localStorage.super_cur_club = clubData.db_name;
    localStorage.super_cur_clubName = clubData.club_name;
    localStorage.super_cur_clubLogo = clubData.logo;
    // this.clubLogo = clubData.logo;
    this.clubLogo = `${environment.imageUrl}/${clubData.logo}`;
    this.getClubLogo();
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    // this.sharedService.showDialog('Are you sure you want to logout?').subscribe((res: any) => {
    //   if (res) {
    this.authenticationService
      .logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
    //   }
    // });
  }
  UpdatePassword() {
    this.router.navigate(['/forgotPassword_Web'], {
      queryParams: { user: this.id }
    });
    // this.router.navigate(['/forgotPassword', { id: this.id }]);
  }
  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.username : null;
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  showDropdown() {
    const dom: any = document.querySelector('.dropdown');
    const status: any = dom.style.display;
    if (status === 'block') {
      dom.style.display = 'none';
    } else {
      dom.style.display = 'block';
    }
  }

  getClubLogo() {
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      return (this.clubLogo =
        localStorage.getItem('super_cur_clubLogo') || 'assets/no_logo.png');
    } else {
      return (this.clubLogo = 'assets/no_logo.png');
    }
  }
}

export function headerCompRef() {
  return ref;
}
