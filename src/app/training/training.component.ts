import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  AfterViewInit
} from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { SeasonsService } from '@app/seasons/seasons.service';
import { take } from 'rxjs/operators';
import { TrainingService } from '@app/training/training.service';
import { ResourceService } from '@app/resource/resource.service';
import { SharedService } from '@app/shared/shared.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  keyup: boolean = false;
  dataSource = new MatTableDataSource();
  curClub: any;
  data: any;
  buttontext: any;
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  displayedColumns: any = [
    'task_name',
    'assignment',
    'created_by',
    'created_on',
    // 'deleted',
    'Actions'
  ];
  roleCoach: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public sharedService: SharedService,
    vcr: ViewContainerRef,
    public trainingService: TrainingService,
    private resourceService: ResourceService,
    public seasonService: SeasonsService
  ) {}

  ngOnInit() {
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      this.curClub = localStorage.super_cur_clubId;
    } else {
      this.curClub = localStorage.club_id;
    }
    if (!this.curClub) {
      this.sharedService
        .loginDialog('Select the club')
        .subscribe(() => this.router.navigateByUrl('/home'));
    }
    if (this.curClub) {
      this.getSeasons(this.curClub);
    }

    this.buttontext = 'Show Inactive';
  }

  ngAfterViewInit() {}
  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];

      value = value.split(' ').join('_');
      let url = '&searchBy=task_name&values=';
      if (this.buttontext === 'Show Active') {
        url = '&active=false&searchBy=task_name&values=';
      }
      let data;
      this.trainingService
        .getfilterTraning(this.curClub, url + value)
        .then((res: any) => {
          data = res;
          const newres = res.data.map(prop => {
            let h: any = {
              fname: '',
              lname: ''
            };
            if (prop.created_by) {
              for (let i = 0; i < prop.created_by.profile_fields.length; i++) {
                if (prop.created_by.profile_fields[i].field) {
                  if (
                    prop.created_by.profile_fields[i].field.name === 'first_name'
                  ) {
                    h.fname = prop.created_by.profile_fields[i].value;
                  }
                  if (
                    prop.created_by.profile_fields[i].field.name === 'last_name'
                  ) {
                    h.lname = prop.created_by.profile_fields[i].value;
                  }
                }
              }
              h = h.fname + ' ' + h.lname;
            }
            return {
              ...prop,

              created_by: h
            };
          });
          this.tabledata = newres;

          res.data = this.tabledata;

          data = res;

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
    let url =
      this.curClub +
      '&skip=' +
      this.skip +
      '&limit=' +
      this.limit +
      '&sort=' +
      value;
    if (this.buttontext === 'Show Active') {
      url =
        this.curClub +
        '&active=false&skip=' +
        this.skip +
        '&limit=' +
        this.limit +
        '&sort=' +
        value;
    }

    let data;
    this.trainingService.getSortedTraining(url).then((res: any) => {
      const newres = res.data.map(prop => {
        let h: any = {
          fname: '',
          lname: ''
        };
        if (prop.created_by) {
          for (let i = 0; i < prop.created_by.profile_fields.length; i++) {
            if (prop.created_by.profile_fields[i].field) {
              if (
                prop.created_by.profile_fields[i].field.name === 'first_name'
              ) {
                h.fname = prop.created_by.profile_fields[i].value;
              }
              if (prop.created_by.profile_fields[i].field.name === 'last_name') {
                h.lname = prop.created_by.profile_fields[i].value;
              }
            }
          }
          h = h.fname + ' ' + h.lname;
        }
        return {
          ...prop,

          created_by: h
        };
      });
      this.tabledata = newres;

      res.data = this.tabledata;

      data = res;

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

        if (this.buttontext === 'Show Inactive') {
          this.getTrainings();
        } else {
          this.getAllTrainings();
        }
      }
    }
  }
  getAllTrainings() {
    // console.log('asdf');
    this.sharedService.showLoader = true;
    let data;
    this.trainingService
      .getAllTraining(this.curClub, this.skip, this.limit)
      .subscribe(
        e => {
          // Handle result
          this.data = e;
          this.sharedService.showLoader = false;
        },
        error => {
          console.log('error', error);
          this.sharedService.showLoader = false;
        },
        () => {
          this.sharedService.showLoader = false;
          const newres = this.data.data.map(prop => {
            let h: any = {
              fname: '',
              lname: ''
            };
            if (prop.created_by) {
              for (let i = 0; i < prop.created_by.profile_fields.length; i++) {
                if (prop.created_by.profile_fields[i].field) {
                  if (
                    prop.created_by.profile_fields[i].field.name === 'first_name'
                  ) {
                    h.fname = prop.created_by.profile_fields[i].value;
                  }
                  if (
                    prop.created_by.profile_fields[i].field.name === 'last_name'
                  ) {
                    h.lname = prop.created_by.profile_fields[i].value;
                  }
                }
              }
              h = h.fname + ' ' + h.lname;
            }
            return {
              ...prop,
              // name: prop.club_name,
              created_by: h
              // assignment: prop.assignment_type.AssignmentType
            };
          });

          this.tabledata = newres;

          this.data.data = this.tabledata;

          data = this.data;

          this.dataSource.data = data['data'];
          if (
            this.totalLength === 0 ||
            this.totalLength !== data['pagination']
          ) {
            this.totalLength = data['pagination'];
          }
        }
      );
  }

  getSeasons(id) {
    this.sharedService.showLoader = true;

    this.seasonService
      .getSeasonList(id)
      .then((e: any) => {
        if (!e.data.length) {
          this.sharedService
            .loginDialog('Please create a season before proceeding')
            .subscribe(() => this.router.navigateByUrl('/seasons'));
        }
        for (let i = 0; i < e.data.length; i++) {
          if (e.data[i].status === 1) {
            localStorage.curRunningSeason = JSON.stringify(e.data[i]);

            this.getTrainings();
            this.buttontext = 'Show Inactive';
            if (
              !localStorage.curRunningSeason ||
              localStorage.curRunningSeason === 'undefined' ||
              localStorage.curRunningSeason === 'null'
            ) {
              this.sharedService
                .loginDialog('Please create a season before proceeding')
                .subscribe(() => this.router.navigateByUrl('/seasons'));
            }
          }
        }
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {
        this.sharedService.showLoader = false;
        console.log(err);
        if (err) {
          {
            this.sharedService
              .loginDialog('Please create a season before proceeding')
              .subscribe(() => this.router.navigateByUrl('/seasons'));
          }
        }
      });
  }
  getTrainings() {
    // console.log('asdf');
    this.sharedService.showLoader = true;
    let data;
    this.trainingService
      .getTraining(this.curClub, this.skip, this.limit)
      .subscribe(
        e => {
          // Handle result
          this.data = e;
          this.sharedService.showLoader = false;
        },
        error => {
          console.log('error', error);
          this.sharedService.showLoader = false;
        },
        () => {
          this.sharedService.showLoader = false;
          const newres = this.data.data.map(prop => {
            let h: any = {
              fname: '',
              lname: ''
            };
            if (prop.created_by) {
              for (let i = 0; i < prop.created_by.profile_fields.length; i++) {
                if (prop.created_by.profile_fields[i].field) {
                  if (
                    prop.created_by.profile_fields[i].field.name === 'first_name'
                  ) {
                    h.fname = prop.created_by.profile_fields[i].value;
                  }
                  if (
                    prop.created_by.profile_fields[i].field.name === 'last_name'
                  ) {
                    h.lname = prop.created_by.profile_fields[i].value;
                  }
                }
              }
              h = h.fname + ' ' + h.lname;
            }
            return {
              ...prop,
              // name: prop.club_name,
              created_by: h
              // assignment: prop.assignment_type.AssignmentType
            };
          });
          this.tabledata = newres;

          this.data.data = this.tabledata;

          data = this.data;

          this.dataSource.data = data['data'];
          if (
            this.totalLength === 0 ||
            this.totalLength !== data['pagination']
          ) {
            this.totalLength = data['pagination'];
          }
        }
      );
  }
  editTraining(row: any) {
    this.router.navigate(['training/edit/{{row._id}}'], {
      queryParams: { editTrainId: row._id }
    });

    // sessionStorage.selected_training = JSON.stringify(row);
    // this.router.navigate(['/training/edit']);
  }

  deleteTraining(row: any) {
    this.sharedService.showLoader = true;

    this.trainingService.removeTraining(row._id).subscribe((e: any) => {
      this.sharedService.showLoader = false;

      this.sharedService.showMessage('Training library deleted successfully');
      this.getTrainings();
      this.buttontext = 'Show Inactive';
    });
  }
  openDialog() {}

  getStatus(status: boolean) {
    if (status) {
      return 'ACTIVE';
    } else {
      return 'INACTIVE';
    }
  }
  ShowAll(event: any) {
    if (this.buttontext === 'Show Inactive') {
      this.getAllTrainings();
      this.buttontext = 'Show Active';
    } else {
      this.buttontext = 'Show Inactive';
      this.getTrainings();
    }
  }
}
