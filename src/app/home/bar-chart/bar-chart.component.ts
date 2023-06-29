import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { BaseChartDirective } from "ng2-charts";
import { DashboardService } from "../dashboard.service";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"],
})
export class BarChartComponent implements OnInit, AfterViewInit {
  graphData: any;

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
  barChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  barChartType = "bar";
  barChartLegend = true;
  barChartPlugins = [];

  barChartData = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getGraphData()
      .then((e: any) => {
        this.graphData = e.data;
        this.barChartData = [...e.data];
      })
      .catch((err: any) => {
        console.log('err in graph data', err);
      });
  }

  @ViewChild("chartContainer") chartContainer: ElementRef;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;


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
  
}
