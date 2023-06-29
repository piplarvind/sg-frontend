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
  activeEventType = 0;
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
    console.log("this.dataSource", this.dataSource.data);

    let url = `?club=${localStorage.curentSelectedClub}&type=${this.planType}`;
    this.feeCollectionService
      .getEventTypes(url)
      .then((e: any) => {
        this.eventTypes = e.data;
        this.activeEventType = e?.data[0]?._id
        console.log("e.data", e.data);
      })
      .catch((err: any) => {
        console.log("err in statics data", err);
      });

    this.feeCollectionService
      .getFeeCollections(url)
      .then((e: any) => {
        // this.eventTypes = e.data;
        let jsonData = e.data;
        // Create an empty row object
        const row: any = {};

        // Set the value for the static column
        row[this.staticColumn] = this.staticValue;

        // Set the values for dynamic columns and calculate the total
        let total = 0;
        jsonData.forEach((item) => {
          const column = item.name;
          row[column] = item.total_package_amount;
          this.dynamicColumns.push(column);
          total += item.total_package_amount;
        });

        // Set the value for the total column and total row
        row["Total"] = total;
        const totalRow: any = {};
        totalRow[this.staticColumn] = "";
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
        const rowData = [row, totalRow];

        // Set the data source with the row array
        this.dataSource = new MatTableDataSource(rowData);
      })
      .catch((err: any) => {
        console.log("err in statics data", err);
      });
  }

  toggleActive(tab: string) {
    this.planType = tab;

    let url = `?club=${localStorage.curentSelectedClub}&type=${tab}`;
    this.feeCollectionService
      .getFeeCollections(url)
      .then((e: any) => {
        // this.eventTypes = e.data;
        let jsonData = e.data;
        // Create an empty row object
        const row: any = {};
        console.log('jsonData.length', jsonData.length);
        if (jsonData.length > 0) {
          // Set the value for the static column
          row[this.staticColumn] = this.staticValue;

          // Set the values for dynamic columns and calculate the total
          let total = 0;
          jsonData.forEach((item) => {
            const column = item.name;
            row[column] = item.total_package_amount;
            this.dynamicColumns.push(column);
            total += item.total_package_amount;
          });

          // Set the value for the total column and total row
          row["Total"] = total;
          const totalRow: any = {};
          totalRow[this.staticColumn] = "";
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
          const rowData = [row, totalRow];
          // Set the data source with the row array
          this.dataSource = new MatTableDataSource(rowData);
        } else {
          this.dataSource = new MatTableDataSource([]);
        }
      })
      .catch((err: any) => {
        console.log("err in statics data", err);
      });
  }

  toggleEventType(tab: string) {
    this.planType = tab;

  }
}
