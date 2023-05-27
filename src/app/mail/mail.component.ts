import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef,
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
import { take } from 'rxjs/operators';
import { SharedService } from '@app/shared/shared.service';
import { MailService } from '@app/mail/mail.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { SeasonsService } from '@app/seasons/seasons.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource();
  displayedColumns: any = ['createdAt', 'names', 'subject', 'Actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  curclub: any;
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  constructor(
    private router: Router,
    public sharedService: SharedService,
    public dialog: MatDialog,
    vcr: ViewContainerRef,
    public mailService: MailService,
    public seasonService: SeasonsService
  ) {}

  ngOnInit() {
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

    if (this.curclub) {
      this.getSeasons();
    }
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  public doFilter = (value: string) => {
    value = value.split(' ').join('_');
    let data;
    this.mailService
      .getfiltermail(this.curclub, '&searchBy=sendto&values=' + value)
      .subscribe((res: any) => {
        data = res;
        const newres = res.data.map(prop => {
          let name: any;
          if (prop.names) {
            name = prop.names[0];
            // for (let i = 0; i < prop.names.length; i++) {
            //   name.push(prop.names[i]);
            // }
          }
          return {
            ...prop,

            createdAt: new Date(prop.createdAt),
            names: name
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
  };
  namesort(event) {
    let value;
    if (event.direction === 'desc') {
      value = '-' + event.active;
    } else {
      value = event.active;
    }
    let data;
    this.mailService
      .getSortedmail(this.curclub, this.skip, this.limit, value)
      .subscribe((res: any) => {
        const newres = res.data.map(prop => {
          let name: any;
          if (prop.names) {
            name = prop.names[0];
            // for (let i = 0; i < prop.names.length; i++) {
            //   name.push(prop.names[i]);
            // }
          }
          return {
            ...prop,

            createdAt: new Date(prop.createdAt),
            names: name
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

  changePage(event) {
    if (
      this.totalLength > this.dataSource.data.length ||
      event.pageSize !== this.limit
    ) {
      if (this.pageIndex <= event.pageIndex) {
        // next page
        this.limit = event.pageSize;
        this.skip = event.pageIndex * this.limit;

        this.getMails();
      }
    }
  }

  getSeasons() {
    this.sharedService.showLoader = true;
    this.seasonService
      .getSeasonList(this.curclub)
      .then((e: any) => {
        if (!e.data.length) {
          this.sharedService
            .loginDialog('Please create a season before proceeding')
            .subscribe(() => this.router.navigateByUrl('/seasons'));
        }
        for (let i = 0; i < e.data.length; i++) {
          if (e.data[i].status === 1) {
            localStorage.curRunningSeason = JSON.stringify(e.data[i]);

            this.getMails();
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
  editResource(row: any) {
    sessionStorage.selected_resource = JSON.stringify(row);
    this.router.navigate(['/resources/edit']);
  }

  getMails() {
    this.sharedService.showLoader = true;
    let data;
    this.mailService
      .getAll({ clubId: this.curclub }, this.skip, this.limit)
      .subscribe(
        (res: any) => {
          const newres = res.data.map(prop => {
            let name: any;
            if (prop.names) {
              name = prop.names;
              // for (let i = 0; i < prop.names.length; i++) {
              //   name.push(prop.names[i]);
              // }
            }
            return {
              ...prop,

              createdAt: new Date(prop.createdAt),
              names: name
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

          this.sharedService.showLoader = false;
        },
        (err: any) => {
          console.log('error', err);
        }
      );
  }

  deleteMail(row: any) {
    this.sharedService
      .showDialog(
        'This action will delete the mail permanently. Are you sure to continue?'
      )
      .subscribe(response => {
        if (response !== '') {
          // TODO:  Do something here if the answer is "Ok".
          this.sharedService.showLoader = true;
          return this.mailService.removeMail(row).subscribe((e: any) => {
            this.sharedService.showLoader = false;
            this.sharedService.showMessage(e.message);
            // this.buttontext = 'All';
            this.getMails();
          });
        }
      });
  }

  openDialog() {}

  mailDetail() {}

  getCurMail(row: any) {
    this.sharedService.showLoader = true;
    sessionStorage.setItem('curSelMail', JSON.stringify(row));
    this.router.navigate(['/mail/view']);
    this.sharedService.showLoader = false;
  }
}
