import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"],
})
export class BarChartComponent implements OnInit, AfterViewInit {
  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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

  barChartData = [
    { data: [65, 59, 80, 81, 56, 55], label: "Category A" },
    { data: [28, 48, 40, 19, 86, 27], label: "Category B" },
    { data: [45, 25, 16, 36, 67, 18], label: "Category C" },
  ];

  constructor() {}

  ngOnInit() {}

  @ViewChild("chartContainer") chartContainer: ElementRef;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  // ...

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

  // ...
}
