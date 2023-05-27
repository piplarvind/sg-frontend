import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GroupsService } from './groups.service';
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { ProfilesService } from '@app/profiles/profiles.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  keyup: boolean = false;
  dataSource = new MatTableDataSource();

  displayedColumns: any = ['name', 'types', 'Actions'];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  constructor(
    public groupsService: GroupsService,
    public sharedService: SharedService,
    public ProfilesService: ProfilesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllProfile();
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
      this.ProfilesService.getFilterGroup(
        '?searchBy=name&values=' + value
      ).then((res: any) => {
        const newres = res.data.map(prop => {
          let type = [];
          for (let i = 0; i < prop.groups.length; i++) {
            if (prop.groups[i]) {
              if (prop.groups[i].type) {
                if (prop.groups[i].type.name) {
                  type.push(prop.groups[i].type.name);
                }

                // console.log('typfriufirugfiurgfi', prop.groups[i].type.name);
              }
            }
          }

          //   let fieldList=[];
          //    for(let i=0;i<prop.fields.length;i++) {
          // fieldList.push(prop.fields[i].name);
          //    }

          // console.log("field list",fieldList );

          return {
            ...prop,
            types: type
          };
        });
        // this.tabledata = this.tabledata.concat(newres);
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
  changePage(event) {
    if (
      this.totalLength > this.dataSource.data.length ||
      event.pageSize !== this.limit
    ) {
      if (this.pageIndex <= event.pageIndex) {
        // next page
        this.limit = event.pageSize;
        this.skip = event.pageIndex * this.limit;

        this.getAllProfile();
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
    this.ProfilesService.getSortedGruop(this.skip, this.limit, value).then(
      (res: any) => {
        const newres = res.data.map(prop => {
          let type = [];
          for (let i = 0; i < prop.groups.length; i++) {
            if (prop.groups[i]) {
              if (prop.groups[i].type) {
                if (prop.groups[i].type.name) {
                  type.push(prop.groups[i].type.name);
                }
              }
            }
          }

          return {
            ...prop,
            types: type
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data['data'];
      }
    );
  }

  editProfiles(row: any) {
    this.router.navigate(['groups/edit/{{row._id}}'], {
      queryParams: { groupsId: row._id }
    });
  }
  getAllProfile() {
    this.sharedService.showLoader = true;
    let data;
    this.ProfilesService.getGroups(this.skip, this.limit).then(
      (res: any) => {
        this.sharedService.showLoader = false;
        const newres = res.data.map(prop => {
          let type = [];
          for (let i = 0; i < prop.groups.length; i++) {
            if (prop.groups[i]) {
              if (prop.groups[i].type) {
                if (prop.groups[i].type.name) {
                  type.push(prop.groups[i].type.name);
                }

                // console.log('typfriufirugfiurgfi', prop.groups[i].type.name);
              }
            }
          }

          //   let fieldList=[];
          //    for(let i=0;i<prop.fields.length;i++) {
          // fieldList.push(prop.fields[i].name);
          //    }

          // console.log("field list",fieldList );

          return {
            ...prop,
            types: type
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data['data'];
        if (this.totalLength === 0) {
          this.totalLength = data['pagination'];
        }
      },
      (err: any) => {
        console.log('error', err);
      }
    );
  }
}
