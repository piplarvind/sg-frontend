import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SharedService } from '@app/shared/shared.service';
import { ClubsService } from '@app/clubs/clubs.service';
import { ReportsService } from '../reports.service';
import { ProfilesService } from '@app/profiles/profiles.service';

@Component({
  selector: 'app-successfulltrans',
  templateUrl: './successfulltrans.component.html',
  styleUrls: ['./successfulltrans.component.scss']
})
export class SuccessfulltransComponent implements OnInit {
  keyup: boolean = false;
  dataSource = new MatTableDataSource();
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  clubList: any = [];
  roleAthletes: any;
  athleteList: any = [];
  parentList: any = [];
  paymentSearch: any = {
    club: "",
    behalf: "",
    payer:"",
    fromDate: "",
    toDate: "",
    searchBy:""
  }
  displayedColumns: any = [
    'date',
    'athlete',
    'payer',
    'amount',
    'paymentmethod',
    'card',
    'transacationId',
    'Description',
    'Notes',
    'Actions'
    // 'contact_no_athlete',

    // 'contact_no_payer',
    // 'is_estore_transaction',
    // 'is_event_transaction'
  ];
  curclub: string;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  tabledataloaded: boolean = false;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private reportService: ReportsService,
    private clubService: ClubsService,
    private profilesService: ProfilesService
  ) {}

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.curclub = localStorage.super_cur_clubId;
    } else {
      this.curclub = localStorage.club_id;
    }
    if (!this.curclub) {
      this.sharedService
        .loginDialog('Select the club')
        .subscribe(() => this.router.navigateByUrl('/home'));
    }
    this.clubService
      .getClubList()
      .then((res: any) => {
        this.clubList = res['data'];
      })
      .catch((err: any) => { });
    
    this.getAthleteList();
    this.getParentList();
    
    this.getSuccessFullTransaction();
  }

  private getAthleteList = () => {
    
    
      this.profilesService.getProfileListByRole('6485561beadeb63f8ce8b311','64855543eadeb63f8ce8965e')
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
        this.athleteList = newres;
        console.log('this.athleteList', this.athleteList);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  private getParentList = () => {
    
    this.profilesService.getProfileListByRole('6485561beadeb63f8ce8b311','64855543eadeb63f8ce89660')
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
      this.parentList = newres;
      console.log('this.parentList', this.parentList);
    })
    .catch((err: any) => {
      console.log(err);
    });
}


  public searchPayment = () => {
    this.sharedService.showLoader = true;
    let tmp = this.paymentSearch;
    console.log('asaa', tmp);
    
    let value = tmp.searchBy;
    value = value.split(' ').join('_');
    let data:any;
      let url = '?clubId='+tmp.club+'&payer='+tmp.payer+'&behalf='+tmp.behalf+'&searchBy=name&values=' + value+'&startDate='+moment(tmp.fromDate).format('YYYY-MM-DD')+'&endDate='+moment(tmp.toDate).format('YYYY-MM-DD');
      this.reportService
        .getAllPaymentSuccessTransReportFilter(url)
        .subscribe((res: any) => {
          data = res;
          const newres = res.data.map(prop => {
            let name: any = {
              fname: '',
              lname: '',
              moblie: ''
            };

            if (prop.payer) {
              for (let i = 0; i < prop.payer.profile_fields.length; i++) {
                if (prop.behalf.profile_fields) {
                  if (prop.payer.profile_fields[i].field.name === 'first_name') {
                    name.fname = prop.payer.profile_fields[i].value;
                  }
                  if (prop.payer.profile_fields[i].field.name === 'last_name') {
                    name.lname = prop.payer.profile_fields[i].value;
                  }
                  if (
                    prop.payer.profile_fields[i].field.name === 'mobile_phone'
                  ) {
                    name.moblie = prop.payer.profile_fields[i].value;
                  }
                }
              }
            }

            let Afname = '',
              Alname = '',
              Amoblie = '';
            if (prop.behalf) {
              for (let i = 0; i < prop.behalf.profile_fields.length; i++) {
                if (prop.behalf.profile_fields) {
                  if (
                    prop.behalf.profile_fields[i].field.name === 'first_name'
                  ) {
                    Afname = prop.behalf.profile_fields[i].value;
                  }
                  if (prop.behalf.profile_fields[i].field.name === 'last_name') {
                    Alname = prop.behalf.profile_fields[i].value;
                  }
                  if (
                    prop.behalf.profile_fields[i].field.name === 'mobile_phone'
                  ) {
                    Amoblie = prop.behalf.profile_fields[i].value;
                  }
                }
              }
            }

            return {
              ...prop,
              date: new Date(prop.created_on),
              card: prop.ccnum,
              athlete: Afname + ' ' + Alname,
              contact_no_athlete: Amoblie,
              payer: name.fname + ' ' + name.lname,
              contact_no_payer: name.moblie
            };
          });
          this.tabledata = newres;

          // this.tabledata.length = res.pagination;
          // this.paginator.length = res.pagination;
          // this.tabledata = newres;
          res.data = this.tabledata;

          data = res;
          // this.totalLength = res.pagination;
          // setTimeout(() => {

          this.dataSource.data = data['data'];
        });
  }
  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      value = value.split(' ').join('_');
      let data;
      let url = '?searchBy=name&values=' + value;
      this.reportService
        .getSuccessTransReportfilter(this.curclub, url)
        .subscribe((res: any) => {
          data = res;
          const newres = res.data.map(prop => {
            let name: any = {
              fname: '',
              lname: '',
              moblie: ''
            };

            if (prop.payer) {
              for (let i = 0; i < prop.payer.profile_fields.length; i++) {
                if (prop.behalf.profile_fields) {
                  if (prop.payer.profile_fields[i].field.name === 'first_name') {
                    name.fname = prop.payer.profile_fields[i].value;
                  }
                  if (prop.payer.profile_fields[i].field.name === 'last_name') {
                    name.lname = prop.payer.profile_fields[i].value;
                  }
                  if (
                    prop.payer.profile_fields[i].field.name === 'mobile_phone'
                  ) {
                    name.moblie = prop.payer.profile_fields[i].value;
                  }
                }
              }
            }

            let Afname = '',
              Alname = '',
              Amoblie = '';
            if (prop.behalf) {
              for (let i = 0; i < prop.behalf.profile_fields.length; i++) {
                if (prop.behalf.profile_fields) {
                  if (
                    prop.behalf.profile_fields[i].field.name === 'first_name'
                  ) {
                    Afname = prop.behalf.profile_fields[i].value;
                  }
                  if (prop.behalf.profile_fields[i].field.name === 'last_name') {
                    Alname = prop.behalf.profile_fields[i].value;
                  }
                  if (
                    prop.behalf.profile_fields[i].field.name === 'mobile_phone'
                  ) {
                    Amoblie = prop.behalf.profile_fields[i].value;
                  }
                }
              }
            }

            return {
              ...prop,
              date: new Date(prop.created_on),
              card: prop.ccnum,
              athlete: Afname + ' ' + Alname,
              contact_no_athlete: Amoblie,
              payer: name.fname + ' ' + name.lname,
              contact_no_payer: name.moblie
            };
          });
          this.tabledata = newres;

          // this.tabledata.length = res.pagination;
          // this.paginator.length = res.pagination;
          // this.tabledata = newres;
          res.data = this.tabledata;

          data = res;
          // this.totalLength = res.pagination;
          // setTimeout(() => {

          this.dataSource.data = data['data'];
        });
    } else {
      this.keyup = true;
    }
  };
  namesort(event) {
    let value;
    if (event.direction === 'desc') {
      value = '-' + event.active;
    } else {
      value = event.active;
    }
    let data;
    this.reportService
      .sortgetSuccessTransReports(this.curclub, this.skip, this.limit, value)
      .subscribe((res: any) => {
        const newres = res.data.map(prop => {
          let name: any = {
            fname: '',
            lname: '',
            moblie: ''
          };

          if (prop.payer) {
            for (let i = 0; i < prop.payer.profile_fields.length; i++) {
              if (prop.payer.profile_fields[i].field.name === 'first_name') {
                name.fname = prop.payer.profile_fields[i].value;
              }
              if (prop.payer.profile_fields[i].field.name === 'last_name') {
                name.lname = prop.payer.profile_fields[i].value;
              }
              if (prop.payer.profile_fields[i].field.name === 'mobile_phone') {
                name.moblie = prop.payer.profile_fields[i].value;
              }
            }
          }

          let Aname: any = {
            fname: '',
            lname: '',
            moblie: ''
          };
          if (prop.behalf) {
            for (let i = 0; i < prop.behalf.profile_fields.length; i++) {
              if (prop.behalf.profile_fields[i].field.name === 'first_name') {
                Aname.fname = prop.behalf.profile_fields[i].value;
              }
              if (prop.behalf.profile_fields[i].field.name === 'last_name') {
                Aname.lname = prop.behalf.profile_fields[i].value;
              }
              if (prop.behalf.profile_fields[i].field.name === 'mobile_phone') {
                Aname.moblie = prop.behalf.profile_fields[i].value;
              }
            }
          }
          return {
            ...prop,
            date: new Date(prop.created_on),
            card: prop.ccnum,
            athlete: Aname.fname + ' ' + Aname.lname,
            contact_no_athlete: Aname.moblie,
            payer: name.fname + ' ' + name.lname,
            contact_no_payer: name.moblie
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;
        // this.totalLength = res.pagination;
        // setTimeout(() => {

        this.dataSource.data = data['data'];
      });
  }

  changePage(event) {
    if (
      this.totalLength > this.dataSource.data.length ||
      event.pageSize !== this.limit
    ) {
      if (this.pageIndex <= event.pageIndex) {
        // next page
        this.limit = event.pageSize;
        this.skip = event.pageIndex * this.limit;

        this.getSuccessFullTransaction();
      }
    }
  }

  getSuccessFullTransaction() {
    this.sharedService.showLoader = true;
    let data;
    this.reportService
      .getSuccessTransReports(this.curclub, this.skip, this.limit)
      .subscribe(
        (res: any) => {
          const newres = res.data.map(prop => {
            let name: any = {
              fname: '',
              lname: '',
              moblie: ''
            };
            if (prop.payer) {
              for (let i = 0; i < prop.payer.profile_fields.length; i++) {
                if (prop.payer.profile_fields[i].field.name === 'first_name') {
                  name.fname = prop.payer.profile_fields[i].value;
                }
                if (prop.payer.profile_fields[i].field.name === 'last_name') {
                  name.lname = prop.payer.profile_fields[i].value;
                }
                if (prop.payer.profile_fields[i].field.name === 'mobile_phone') {
                  name.moblie = prop.payer.profile_fields[i].value;
                }
              }
            }

            let Afname = '',
              Alname = '',
              Amoblie = '';
            if (prop.behalf) {
              for (let i = 0; i < prop.behalf.profile_fields.length; i++) {
                if (prop.behalf.profile_fields) {
                  if (
                    prop.behalf.profile_fields[i].field.name === 'first_name'
                  ) {
                    Afname = prop.behalf.profile_fields[i].value;
                  }
                  if (prop.behalf.profile_fields[i].field.name === 'last_name') {
                    Alname = prop.behalf.profile_fields[i].value;
                  }
                  if (
                    prop.behalf.profile_fields[i].field.name === 'mobile_phone'
                  ) {
                    Amoblie = prop.behalf.profile_fields[i].value;
                  }
                }
              }
            }

            return {
              ...prop,
              date: new Date(prop.created_on),
              card: prop.ccnum,
              athlete: Afname + ' ' + Alname,
              contact_no_athlete: Amoblie,
              payer: name.fname + ' ' + name.lname,
              contact_no_payer: name.moblie
            };
          });
          this.tabledata = newres;

          res.data = this.tabledata;

          data = res;

          this.dataSource.data = data['data'];

          if (
            this.totalLength === 0 ||
            this.totalLength !== data['pagination']
          ) {
            this.totalLength = data['pagination'];
          }
          this.tabledataloaded = true;
          this.sharedService.showLoader = false;
        },
        (err: any) => {
          console.log('error occured', err);
          this.sharedService.showLoader = false;
        }
      );
  }
}
