import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '@app/shared/shared.service';
import { FeedsService } from '@app/feeds/feeds.service';
import { environment } from '../../environments/environment';
import { SeasonsService } from '@app/seasons/seasons.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  keyup: boolean = false;
  curclub: any;
  dataSource = new MatTableDataSource();
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  displayedColumns: any = [
    'date',
    'feedType',
    'target',
    'post_text',
    'post_image',
    'post_video',
    'status'
  ];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public sharedService: SharedService,
    public feedsService: FeedsService,
    public seasonService: SeasonsService
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
    this.fetchAllFeeds();
    if (!this.curclub) {
      this.sharedService
        .loginDialog('Select the club')
        .subscribe(() => this.router.navigateByUrl('/home'));
    }
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      value = value.split(' ').join('_');
      let data;
      this.feedsService
        .getFilterFeed(this.curclub, '?searchBy=post&values=' + value)
        .then((res: any) => {
          const newres = res.data.map(prop => {
            return {
              ...prop,
              date: prop.createdOn.split('T')[0],
              post_text: prop.post
              // post_image: prop.abusive_content_reported_by.image
            };
          });
          // this.tabledata = this.tabledata.concat(newres);
          this.tabledata = newres;

          res.data = this.tabledata;

          data = res;

          this.dataSource.data = data['data'];
        });
    } else {
      this.keyup = true;
    }
  };
  changePage(event) {
    if (
      this.totalLength > this.dataSource.data.length ||
      event.pageSize !== this.limit
    ) {
      if (this.pageIndex <= event.pageIndex) {
        // next page
        this.limit = event.pageSize;
        this.skip = event.pageIndex * this.limit;
        this.fetchAllFeeds();
      }
    }
  }
  namesort(event) {
    let data;
    let value;
    if (event.direction === 'desc') {
      value = '-' + event.active;
    } else {
      value = event.active;
    }
    this.feedsService
      .getSortFeed(this.curclub, this.skip, this.limit, value)
      .then((res: any) => {
        const newres = res.data.map(prop => {
          return {
            ...prop,
            date: prop.createdOn.split('T')[0],
            post_text: prop.post
            // post_image: prop.abusive_content_reported_by.image
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data['data'];
      });
  }
  fetchAllFeeds() {
    this.sharedService.showLoader = true;
    let data;
    this.feedsService
      .getAllFlagPost(this.curclub, this.skip, this.limit)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        const newres = e.data.map(prop => {
          return {
            ...prop,
            date: prop.createdOn.split('T')[0],
            post_text: prop.post
            // post_image: prop.abusive_content_reported_by.image
          };
        });
        this.tabledata = newres;

        e.data = this.tabledata;

        data = e;

        this.dataSource.data = data['data'];
        if (this.totalLength === 0) {
          this.totalLength = data['pagination'];
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  updatePostStatus(value: any) {
    this.sharedService.showLoader = true;
    const reqObj = {
      clubId: this.curclub,
      abusive_post: false
    };
    this.feedsService
      .updateFeed(value, reqObj)
      .then((e: any) => {
        this.sharedService.showMessage('Post is Enabled');
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  updateUserStatus(value: any) {
    this.sharedService.showLoader = true;
    const reqObj = {
      clubId: this.curclub,
      abusive_user: false
    };
    this.feedsService
      .updateFeed(value, reqObj)
      .then((e: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage('User is  Enabled');
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  getStatus1(status: boolean) {
    if (!status) {
      return 'DISABLE';
    } else {
      return 'ENABLE';
    }
  }

  getStatus2(status: boolean) {
    if (status) {
      return 'DISABLE';
    } else {
      return 'ENABLE';
    }
  }

  openImage(row: any) {
    window.open(`${environment.imageUrl}${row.image}`);
  }

  playVideo(row: any) {
    const selVideo = 'https://vimeo.com/' + row.vimeoData.vimeoId;
    window.open(selVideo, '_blank');
  }
}
