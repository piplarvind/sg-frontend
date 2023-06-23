import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgChartsModule } from 'ng2-charts';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from '@app/home/home-routing.module';
import { HomeComponent } from '@app/home/home.component';
import { DashboardService } from '@app/home/dashboard.service';
import { QuoteService } from '@app/home/quote.service';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PaymentBarChartComponent } from './payment-bar-chart/payment-bar-chart.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    NgChartsModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    BarChartComponent,
    PaymentBarChartComponent
  ],
  providers: [
    DashboardService,
    QuoteService
  ]
})
export class HomeModule { }
