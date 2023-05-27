import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TransactionRoutingModule } from '@app/estore-transaction/transaction-routing.module';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormsModule } from '@angular/forms';
import { SearchSelectModule } from '@app/search-select/search-select.module';
import { EstoreTransactionComponent } from '@app/estore-transaction/estore-transaction.component';
import { AddTransactionComponent } from '@app/estore-transaction/add-transaction/add-transaction.component';
import { TransactionService } from '@app/estore-transaction/transaction.service';

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
    TransactionRoutingModule
  ],
  declarations: [ EstoreTransactionComponent, AddTransactionComponent],
  providers: [ TransactionService ]
})
export class TransactionModule { }
