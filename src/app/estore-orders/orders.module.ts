import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrdersRoutingModule } from '@app/estore-orders/orders-routing.module';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormsModule } from '@angular/forms';
import { SearchSelectModule } from '@app/search-select/search-select.module';
import { EstoreOrdersComponent } from '@app/estore-orders/estore-orders.component';
import { OrdersService } from '@app/estore-orders/orders.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    GooglePlaceModule,
    SearchSelectModule,
    SharedModule,
    FormsModule,
    OrdersRoutingModule
  ],
  declarations: [
    EstoreOrdersComponent],
  providers: [ OrdersService ]
})
export class OrdersModule { }
