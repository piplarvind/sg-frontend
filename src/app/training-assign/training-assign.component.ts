import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingAssignService } from '@app/training-assign/training-assign.service';
import { SharedService } from '@app/shared/shared.service';
import { ResourceService } from '@app/resource/resource.service';

import * as moment from 'moment';
@Component({
  selector: 'app-training-assign',
  templateUrl: './training-assign.component.html',
  styleUrls: ['./training-assign.component.scss']
})
export class TrainingAssignComponent implements OnInit, AfterViewInit {
  keyup: boolean = false;
  dataSource = new MatTableDataSource();
  status: Boolean;
  buttontext: any;
  athName: Array<any> = [];
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  displayedColumns: any = [
    'task_name',
    'assignment_type',
    'interval',
    'team',
    'athlete',
    'start_date',
    'end_date',
    'created_on',
    'assigned_by',
    'deleted',
    'Actions'
  ];
  roleCoach: any;
  curClub: any;
  data: any;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public sharedService: SharedService,
    vcr: ViewContainerRef,
    public trainingService: TrainingAssignService,
    private resourceService: ResourceService
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
        .loginDialog('Please select sport & club from header')
        .subscribe(() => this.router.navigateByUrl('/home'));
    }

    this.getTrainings();
    this.buttontext = 'Show Inactive';
  }

  ngAfterViewInit() {}
  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      let url = '&searchBy=task_name&values=';
      if (this.buttontext === 'Show Active') {
        url = '&active=false&searchBy=task_name&values=';
      }
      value = value.split(' ').join('_');
      let data;
      this.trainingService
        .getfilterTraningAssingment(this.curClub, url + value)
        .then((res: any) => {
          data = res;
          const newres = res.data.map(prop => {
            const arr = [];
            if (prop.atheletes.length) {
              for (let i = 0; i < prop.atheletes.length; i++) {
                let h: any = {
                  fname: '',
                  lname: ''
                };
                for (
                  let j = 0;
                  j < prop.atheletes[i].profile_fields.length;
                  j++
                ) {
                  if (prop.atheletes[i].profile_fields[j].field) {
                    if (
                      prop.atheletes[i].profile_fields[j].field.name === 'first_name'
                    ) {
                      h.fname = prop.atheletes[i].profile_fields[j].value;
                    }
                    if (
                      prop.atheletes[i].profile_fields[j].field.name === 'last_name'
                    ) {
                      h.lname = prop.atheletes[i].profile_fields[j].value;
                    }
                  }
                }
                h = h.fname + ' ' + h.lname;
                arr.push(h);
              }
            }
            let name: any = {
              fname: '',
              lname: ''
            };
            if (prop.coach) {
              for (let i = 0; i < prop.coach.profile_fields.length; i++) {
                if (prop.coach.profile_fields[i].field) {
                  if (prop.coach.profile_fields[i].field.name === 'first_name') {
                    name.fname = prop.coach.profile_fields[i].value;
                  }
                  if (prop.coach.profile_fields[i].field.name === 'last_name') {
                    name.lname = prop.coach.profile_fields[i].value;
                  }
                }
              }

              name = name.fname + ' ' + name.lname;
            }

            if (prop.library) {
              return {
                ...prop,

                task_name: prop.library.task_name,
                assignment_type: prop.library.assignment_type.AssignmentType,
                interval: prop.library.task_type.task_type,
                assigned_by: name,
                athlete: arr,
                team: prop.team_id.name
              };
            }
            if (!prop.library) {
              return {
                ...prop,

                task_name: prop.library.task_name,
                assignment_type: prop.library.assignment_type.AssignmentType,
                interval: prop.library.task_type.task_type,
                assigned_by: name,
                athlete: arr,
                team: prop.team_id.name
              };
            }
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
    this.trainingService.getSortedTrainingAssingment(url).then((res: any) => {
      const newres = res.data.map(prop => {
        if (prop.start_date) {
          var date = prop.start_date.split('T')[0];

          prop.start_date = moment(date).format('MM/DD/YYYY');
        }
        if (prop.end_date) {
          var date = prop.end_date.split('T')[0];

          prop.end_date = moment(date).format('MM/DD/YYYY');
        }
        const arr = [];
        if (prop.atheletes.length) {
          for (let i = 0; i < prop.atheletes.length; i++) {
            let h: any = {
              fname: '',
              lname: ''
            };
            for (let j = 0; j < prop.atheletes[i].profile_fields.length; j++) {
              if (prop.atheletes[i].profile_fields[j].field) {
                if (
                  prop.atheletes[i].profile_fields[j].field.name === 'first_name'
                ) {
                  h.fname = prop.atheletes[i].profile_fields[j].value;
                }
                if (
                  prop.atheletes[i].profile_fields[j].field.name === 'last_name'
                ) {
                  h.lname = prop.atheletes[i].profile_fields[j].value;
                }
              }
            }
            h = h.fname + ' ' + h.lname;
            arr.push(h);
          }
        }
        let name: any = {
          fname: '',
          lname: ''
        };
        if (prop.coach) {
          for (let i = 0; i < prop.coach.profile_fields.length; i++) {
            if (prop.coach.profile_fields[i].field) {
              if (prop.coach.profile_fields[i].field.name === 'first_name') {
                name.fname = prop.coach.profile_fields[i].value;
              }
              if (prop.coach.profile_fields[i].field.name === 'last_name') {
                name.lname = prop.coach.profile_fields[i].value;
              }
            }
          }
          name = name.fname + ' ' + name.lname;
        }

        if (prop.library) {
          return {
            ...prop,

            task_name: prop.library.task_name,
            assignment_type: prop.library.assignment_type.AssignmentType,
            interval: prop.library.task_type.task_type,
            assigned_by: name,
            athlete: arr,
            team: prop.team_id.name
          };
        }
        if (!prop.library) {
          return {
            ...prop,

            task_name: prop.library.task_name,
            assignment_type: prop.library.assignment_type.AssignmentType,
            interval: prop.library.task_type.task_type,
            assigned_by: name,
            athlete: arr,
            team: prop.team_id.name
          };
        }
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

  getTrainings() {
    this.sharedService.showLoader = true;
    let data;
    this.trainingService
      .getAssignedTraining(this.curClub, this.skip, this.limit)
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
          if (this.data.data) {
            const newres = this.data.data.map(prop => {
              const arr = [];
              if (prop.atheletes.length) {
                for (let i = 0; i < prop.atheletes.length; i++) {
                  let afname = '',
                    alname = '';

                  for (
                    let j = 0;
                    j < prop.atheletes[i].profile_fields.length;
                    j++
                  ) {
                    if (prop.atheletes[i].profile_fields[j].field) {
                      if (
                        prop.atheletes[i].profile_fields[j].field.name ===                        'first_name'
                      ) {
                        afname = prop.atheletes[i].profile_fields[j].value;
                      }
                      if (
                        prop.atheletes[i].profile_fields[j].field.name ===                        'last_name'
                      ) {
                        alname = prop.atheletes[i].profile_fields[j].value;
                      }
                    }
                  }

                  arr.push(afname + ' ' + alname);
                }
              }
              let cfname = '',
                clname = '';

              if (prop.coach) {
                for (let i = 0; i < prop.coach.profile_fields.length; i++) {
                  if (prop.coach.profile_fields[i].field) {
                    if (
                      prop.coach.profile_fields[i].field.name === 'first_name'
                    ) {
                      cfname = prop.coach.profile_fields[i].value;
                    }
                    if (
                      prop.coach.profile_fields[i].field.name === 'last_name'
                    ) {
                      clname = prop.coach.profile_fields[i].value;
                    }
                  }
                }
              }

              if (prop.library) {
                return {
                  ...prop,

                  task_name: prop.library.task_name,
                  assignment_type: prop.library.assignment_type.AssignmentType,
                  interval: prop.library.task_type.task_type,
                  assigned_by: cfname + ' ' + clname,
                  athlete: arr,
                  team: prop.team_id.name
                };
              }
              if (!prop.library) {
                return {
                  ...prop,

                  task_name: prop.library.task_name,
                  assignment_type: prop.library.assignment_type.AssignmentType,
                  interval: prop.library.task_type.task_type,
                  assigned_by: cfname + ' ' + clname,
                  athlete: arr,
                  team: prop.team_id.name
                };
              }
            });
            this.tabledata = newres;
          }

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
  getAllTrainings() {
    this.sharedService.showLoader = true;
    let data;
    this.trainingService
      .getAllAssignedTraining(this.curClub, this.skip, this.limit)
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
          const newres = this.data.data.map(prop => {
            const arr = [];
            if (prop.atheletes.length) {
              for (let i = 0; i < prop.atheletes.length; i++) {
                let h: any = {
                  fname: '',
                  lname: ''
                };
                for (
                  let j = 0;
                  j < prop.atheletes[i].profile_fields.length;
                  j++
                ) {
                  if (prop.atheletes[i].profile_fields[j].field) {
                    if (
                      prop.atheletes[i].profile_fields[j].field.name === 'first_name'
                    ) {
                      h.fname = prop.atheletes[i].profile_fields[j].value;
                    }
                    if (
                      prop.atheletes[i].profile_fields[j].field.name === 'last_name'
                    ) {
                      h.lname = prop.atheletes[i].profile_fields[j].value;
                    }
                  }
                  h = h.fname + ' ' + h.lname;
                  arr.push(h);
                }
              }
            }
            let name: any = {
              fname: '',
              lname: ''
            };
            if (prop.coach) {
              for (let i = 0; i < prop.coach.profile_fields.length; i++) {
                if (prop.coach.profile_fields[i].field) {
                  if (prop.coach.profile_fields[i].field.name === 'first_name') {
                    name.fname = prop.coach.profile_fields[i].value;
                  }
                  if (prop.coach.profile_fields[i].field.name === 'last_name') {
                    name.lname = prop.coach.profile_fields[i].value;
                  }
                }
              }
              name = name.fname + ' ' + name.lname;
            }

            if (prop.library) {
              return {
                ...prop,

                task_name: prop.library.task_name,
                assignment_type: prop.library.assignment_type.AssignmentType,
                interval: prop.library.task_type.task_type,
                assigned_by: name,
                athlete: arr,
                team: prop.team_id.name
              };
            }
            if (!prop.library) {
              return {
                ...prop,

                task_name: prop.library.task_name,
                assignment_type: prop.library.assignment_type.AssignmentType,
                interval: prop.library.task_type.task_type,
                assigned_by: name,
                athlete: arr,
                team: prop.team_id.name
              };
            }
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
    this.router.navigate(['training_assign/edit/{{row._id}}'], {
      queryParams: { editTrainAssId: row._id }
    });
  }

  deleteTraining(row: any) {
    this.sharedService.showLoader = true;
    return this.trainingService.removeTraining(row).subscribe((e: any) => {
      this.sharedService.showLoader = false;
      this.sharedService.showMessage(
        'Training Assignment deleted successfully'
      );
      this.buttontext = 'Show Inactive';
      this.getTrainings();
    });
  }
  openDialog() {}

  getStatus(status: boolean) {
    if (status) {
      this.status = true;
      return 'ACTIVE';
    } else {
      this.status = true;
      return 'EXPIRED';
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
