import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { FeeCollectionService } from "@app/fees-collection/fee-collection.service";

export interface SubscriptionData {
  name: string;
  [key: string]: number | string;
}

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
  // dataSource = new MatTableDataSource();
  dataSource: MatTableDataSource<SubscriptionData>;
  displayedColumns: string[] = []; // Initialize the array here
  eventTypes: Array<any>;
  activeEventType: string = "";
  dynamicColumns: string[] = [];
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
    // this.dataSource.data = this.tabledata;

    let url = `?club=${localStorage.curentSelectedClub}&type=${this.planType}`;
    this.feeCollectionService
      .getEventTypes(url)
      .then((e: any) => {
        this.eventTypes = e.data;
        // this.activeEventType = e?.data[0]?._id;
        //console.log("e.data", e.data);
        // let dataUrl = `?club=${localStorage.curentSelectedClub}&type=${this.planType}&event_type=${e?.data[0]?._id}`;
        let dataUrl = `?club=${localStorage.curentSelectedClub}&event_type=${e?.data[0]?._id}`;
        // Fetch fee collections
        this.getFeeCollections(dataUrl);
      })
      .catch((err: any) => {
        console.log("err in statics data", err);
      });
  }

  toggleActive(tab: string) {
    this.planType = tab;

    // let url = `?club=${localStorage.curentSelectedClub}&type=${tab}&event_type=${this.activeEventType}`;
    let url = `?club=${localStorage.curentSelectedClub}&type=${tab}`;
    // Fetch fee collections
    this.getFeeCollections(url);
  }

  toggleEventType(tab: string) {
    this.activeEventType = tab;
    let url = `?club=${localStorage.curentSelectedClub}&event_type=${tab}`;
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
        let apiData = e.data;
        const dynamicColumns: string[] = apiData.map((data) =>
          data.name.toLowerCase()
        );
        const subscriptions: SubscriptionData = {
          name: "Subscriptions",
        };
        const revenueShare: SubscriptionData = {
          name: "Revenue Share",
        };
        const total: SubscriptionData = {
          name: "Total",
        };

        dynamicColumns.forEach((column) => {
          subscriptions[column] = 0;
          revenueShare[column] = 0;
          total[column] = 0;
        });

        const transformedData: SubscriptionData[] = [
          subscriptions,
          revenueShare,
          total,
        ];

        apiData.forEach((data) => {
          const columnName = data.name.toLowerCase();
          subscriptions[columnName] = data.total_amount;
          revenueShare[columnName] = this.roundToDecimal(
            (data.total_amount as number) * 0.05,
            2
          ); // Calculate revenue share as 5% and round to 2 decimal places
          total[columnName] = this.roundToDecimal(
            (data.total_amount as number) +
              (revenueShare[columnName] as number),
            2
          ); // Round the total to 2 decimal places
        });

        this.displayedColumns = ["name", ...dynamicColumns];
        this.dataSource = new MatTableDataSource<SubscriptionData>(
          transformedData
        );
        this.dataSource.data = transformedData;
      })
      .catch((err: any) => {
        console.log("err in statics data", err);
      });
  }

  roundToDecimal(value: number, decimalPlaces: number): number {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(value * factor) / factor;
  }
}
