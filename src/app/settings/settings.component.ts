import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
} from "@angular/core";
import { Routes, RouterModule, ActivatedRoute, Router } from "@angular/router";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { SeasonsService } from "@app/seasons/seasons.service";
import { take } from "rxjs/operators";
import { SettingsService } from "@app/settings/settings.service";
import { ResourceService } from "@app/resource/resource.service";
import { SharedService } from "@app/shared/shared.service";
import { Subscriber } from "rxjs";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
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
    "type",
    "key",
    'value',
    'active',
    "createdAt",
    // 'deleted',
    "Actions",
  ];
  roleCoach: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public sharedService: SharedService,
    vcr: ViewContainerRef,
    public settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.getAllSettings();
  }

  ngAfterViewInit() {}
  public doFilter = (event: Event) => {
    if (event["keyCode"] === 13) {
      //  value can't be send with white space in url
      let value = event.target["value"];

      // value = value.split(" ").join("_");
      let url = `?key=${value}`;
      if (this.buttontext === "Show Active") {
        url = `?active=false&key=${value}`;
      }
      let data;
      this.settingsService
        .getFilterSetting(url)
        .then((res: any) => {
          data = res;
          const newres = res.data.map((prop) => {
            let h: any = {
              fname: "",
              lname: "",
            };
            if (prop.created_by) {
              for (let i = 0; i < prop.created_by.profile_fields.length; i++) {
                if (prop.created_by.profile_fields[i].field) {
                  if (
                    prop.created_by.profile_fields[i].field.name ===
                    "first_name"
                  ) {
                    h.fname = prop.created_by.profile_fields[i].value;
                  }
                  if (
                    prop.created_by.profile_fields[i].field.name === "last_name"
                  ) {
                    h.lname = prop.created_by.profile_fields[i].value;
                  }
                }
              }
              h = h.fname + " " + h.lname;
            }
            return {
              ...prop,

              created_by: h,
            };
          });
          this.tabledata = newres;

          res.data = this.tabledata;

          data = res;

          this.dataSource.data = data["data"];
        });
    } else {
      this.keyup = true;
    }
  };
  namesort(event) {
    let value;
    if (event.direction === "desc") {
      value = "-" + event.active;
    } else {
      value = event.active;
    }
    let url =
      this.curClub +
      "&skip=" +
      this.skip +
      "&limit=" +
      this.limit +
      "&sort=" +
      value;
    if (this.buttontext === "Show Active") {
      url =
        this.curClub +
        "&active=false&skip=" +
        this.skip +
        "&limit=" +
        this.limit +
        "&sort=" +
        value;
    }
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

        if (this.buttontext === "Show Inactive") {
          this.getSettings();
        } else {
          this.getAllSettings();
        }
      }
    }
  }
  getAllSettings() {
    // console.log('asdf');
    this.sharedService.showLoader = true;
    let data = '?';
    this.settingsService
      .getAllSettings(data, this.skip, this.limit)
      .then((res: any) => {
        // this.dataSource.data = e.data.reverse();

        const newres = res.data.map((prop) => {
          return {
            ...prop,
            createdAt: prop.createdAt.split("T")[0],
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data["data"];
        if (this.totalLength === 0) {
          this.totalLength = data["pagination"];
        }

        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {});
  }

  getSettings() {
    // console.log('asdf');
    this.sharedService.showLoader = true;
    let data;
    this.settingsService
      .getAllSettings(this.curClub, this.skip, this.limit)
      .then((res: any) => {
        // this.dataSource.data = e.data.reverse();

        const newres = res.data.map((prop) => {
          return {
            ...prop,
            createdAt: prop.createdAt.split("T")[0],
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data["data"];
        if (this.totalLength === 0) {
          this.totalLength = data["pagination"];
        }

        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {});
  }
  editSetting(row: any) {
    this.router.navigate(["settings/edit/{{row._id}}"], {
      queryParams: { id: row._id },
    });

    // sessionStorage.selected_setting = JSON.stringify(row);
    // this.router.navigate(['/setting/edit']);
  }

  deleteSetting(row: any) {
    this.sharedService.showLoader = true;

    this.settingsService.deleteSetting(row._id)
    .then((e: any) => {
      this.getAllSettings();
      this.sharedService.showLoader = false;
      this.sharedService.showMessage('Setting deleted Successfully');
    })
    .catch((err: any) => {});
  }
  openDialog() {}

  getStatus(status: boolean) {
    if (status) {
      return "ACTIVE";
    } else {
      return "INACTIVE";
    }
  }
  ShowAll(event: any) {
    if (this.buttontext === "Show Inactive") {
      this.getAllSettings();
      this.buttontext = "Show Active";
    } else {
      this.buttontext = "Show Inactive";
      this.getSettings();
    }
  }
}
