import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { FeeCollectionService } from "@app/fees-collection/fee-collection.service";

@Component({
  selector: "app-fees-collection",
  templateUrl: "./fees-collection.component.html",
  styleUrls: ["./fees-collection.component.scss"],
})
export class FeesCollectionComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  planType: string = "subscription";

  tabledataloaded: boolean = true;
  dataSource = new MatTableDataSource();
  eventTypes: Array<any>;
  activeEventType: string = "";
  displayedColumns: string[] = [];
  // displayedColumns: any = ["season_name", "pro", "basic", "fff", "total"];
  dynamicColumns: string[] = [];
  staticColumn: string = "Season Name";
  staticValue: any = "Subscriptions";
  tabledata: any = [];
  tnbColumns = [
    /* { season_name: "Subscriptions", pro: 25, basic: 434, fff: 322, total: 634 },
    {
      season_name: "Revenue Share",
      pro: "$5",
      basic: "$3",
      fff: "$1.5",
      total: "",
    },
    {
      season_name: "Total",
      pro: "$5456.45",
      basic: "$334.43",
      fff: "$453",
      total: "$9876.45",
    }, */
  ];

  constructor(private feeCollectionService: FeeCollectionService) {}

  ngOnInit(): void {
    // this.tabledata = this.tnbColumns;
    this.dataSource.data = this.tabledata;

    let url = `?club=${localStorage.curentSelectedClub}&type=${this.planType}`;
    this.feeCollectionService
      .getEventTypes(url)
      .then((e: any) => {
        this.eventTypes = e.data;
        this.activeEventType = e?.data[0]?._id;
        console.log("e.data", e.data);
        let dataUrl = `?club=${localStorage.curentSelectedClub}&type=${this.planType}&event_type=${e?.data[0]?._id}`;
        // Fetch fee collections
        this.getFeeCollections(dataUrl);
      })
      .catch((err: any) => {
        console.log("err in statics data", err);
      });
    
  }

  toggleActive(tab: string) {
    this.planType = tab;

    let url = `?club=${localStorage.curentSelectedClub}&type=${tab}&event_type=${this.activeEventType}`;
    // Fetch fee collections
    this.getFeeCollections(url);
  }

  toggleEventType(tab: string) {
    this.activeEventType = tab;
    let url = `?club=${localStorage.curentSelectedClub}&type=${this.planType}&event_type=${tab}`;
    // Fetch fee collections
    this.getFeeCollections(url);
  }

  hasData(): boolean {
    return this.dataSource.data.length > 0;
  }

  getFeeCollections(url: string) {
    this.feeCollectionService
      .getFeeCollections(url)
      .then((e: any) => {
        let jsonData = e.data;

        // Set the values for dynamic columns and calculate the total
        let total = 0;
        this.dynamicColumns = [];
        jsonData.forEach((item) => {
          const column = item.name;
          if (!this.dynamicColumns.includes(column)) {
            this.dynamicColumns.push(column);
          }
          total += item.total_package_amount;
        });

        // Create an empty row object
        const row: any = {};

        // Set the value for the static column
        row["Season Name"] = this.staticValue;

        // Set the values for dynamic columns
        jsonData.forEach((item) => {
          const column = item.name;
          row[column] = item.total_package_amount;
        });

        // Set the value for the total column and total row
        row["Total"] = total;

        const totalRow: any = {};
        totalRow["Season Name"] = "";
        this.dynamicColumns.forEach((column) => {
          totalRow[column] = jsonData.reduce(
            (acc, item) =>
              acc + (item.name === column ? item.total_package_amount : 0),
            0
          );
        });
        totalRow["Total"] = jsonData.reduce(
          (acc, item) => acc + item.total_package_amount,
          0
        );

        // Create an array with the row data
        if (totalRow.Total > 0) {
          const rowData = [row, totalRow];

          // Set the data source with the row array
          this.dataSource.data = rowData; // Assign data to the existing dataSource

          // Paginator and sort
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource.data = [];
        }
      })
      .catch((err: any) => {
        console.log("err in statics data", err);
      });
  }

  

}
