import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { FormsModule } from '@angular/forms';
import { SearchSelectModule } from '@app/search-select/search-select.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { AgeingComponent } from './ageing/ageing.component';
import { UnpaidComponent } from './unpaid/unpaid.component';
import { DeclinedComponent } from './declined/declined.component';
import { SuccessfulltransComponent } from './successfulltrans/successfulltrans.component';
import { ReportsService } from './reports.service';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    SearchSelectModule,
    ReportsRoutingModule
  ],
  declarations: [
    AgeingComponent,
    UnpaidComponent,
    DeclinedComponent,
    SuccessfulltransComponent
  ],
  providers: [ReportsService]
})
export class ReportsModule {}
