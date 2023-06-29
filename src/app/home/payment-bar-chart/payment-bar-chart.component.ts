import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { BaseChartDirective } from "ng2-charts";
import { DashboardService } from "../dashboard.service";
import { ClubsService } from "@app/clubs/clubs.service";

@Component({
  selector: "app-payment-bar-chart",
  templateUrl: "./payment-bar-chart.component.html",
  styleUrls: ["./payment-bar-chart.component.scss"],
})
  
  
export class PaymentBarChartComponent implements OnInit {

  @ViewChild("chartContainer") chartContainer: ElementRef;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  graphData: any;
  clubList: any = [];
  // club: string = "";
  // year = new Date().getFullYear();
  startYear = new Date().getFullYear();
  yearRange = [];
  searchForm: any = {
    club: '',
    year: new Date().getFullYear()
  };
  barChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
  };
  barChartLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  barChartType = "bar";
  barChartLegend = true;
  barChartPlugins = [];
  barChartData = [];

  constructor(
    private clubService: ClubsService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.searchForm.club = localStorage.curentSelectedClub;
    for (let i = 0; i < 5; i++) {
      this.yearRange.push(this.startYear - i);
    }
    this.clubService
      .getClubList()
      .then((res: any) => {
        this.clubList = res["data"];
      })
      .catch((err: any) => {});
    let url = "?club=" + this.searchForm.club + "&year="+this.searchForm.year;
    this.dashboardService
      .getPaymentGraphData(url)
      .then((e: any) => {
        this.graphData = e.data;
        this.barChartData = [...e.data];
      })
      .catch((err: any) => {
        console.log("err in graph data", err);
      });
  }

  ngAfterViewInit() {
    this.resizeChart(); // Resize the chart initially
  }

  resizeChart() {
    const container = this.chartContainer.nativeElement;
    const canvas = container.querySelector("canvas");
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Trigger chart update after resizing
    if (this.chart && this.chart.chart) {
      this.chart.chart.update();
    }
  }

  changeClub = (club:string) => {
    this.searchForm.club = club;
    let url = "?club=" + club + "&year="+this.searchForm.year;
    this.dashboardService
      .getPaymentGraphData(url)
      .then((e: any) => {
        this.barChartData = e.data;
      })
      .catch((err: any) => {
        console.log("err in statics data", err);
      });
  };
  changeYear = (year:number) => {
    this.searchForm.year = year;
    let url = "?club=" + this.searchForm.club + "&year="+year;
    this.dashboardService
      .getPaymentGraphData(url)
      .then((e: any) => {
        this.barChartData = e.data;
      })
      .catch((err: any) => {
        console.log("err in statics data", err);
      });
  };
}
