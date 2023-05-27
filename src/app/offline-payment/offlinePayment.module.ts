import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { OfflinePaymentComponent } from '@app/offline-payment/offline-payment.component';
import { AddPaymentComponent } from '@app/offline-payment/add-payment/add-payment.component';
import { OfflinePaymentRoutingModule } from '@app/offline-payment/offlinePayment-routing.module';
import { SearchSelectModule } from '@app/search-select/search-select.module';
import { AddOfflinePaymentComponent } from './add-offline-payment/add-offline-payment.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    OfflinePaymentRoutingModule,
    SearchSelectModule
  ],
  declarations: [OfflinePaymentComponent, AddPaymentComponent, AddOfflinePaymentComponent]
})
export class OfflinePaymentModule {}
