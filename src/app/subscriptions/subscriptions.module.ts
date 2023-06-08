import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxEditorModule } from 'ngx-editor';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { SubscriptionsRoutingModule } from '@app/subscriptions/subscriptions-routing.module';
import { SubscriptionsComponent } from '@app/subscriptions/subscriptions.component';
import { SubscriptionsService } from '@app/subscriptions/subscriptions.service';
import { AddSubscriptionComponent } from '@app/subscriptions/add-subscription/add-subscription.component';
import { FormsModule } from '@angular/forms';
import { SearchSelectModule } from '@app/search-select/search-select.module';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    NgxEditorModule,
    MaterialModule,
    FormsModule,
    SearchSelectModule,
    SubscriptionsRoutingModule
  ],
  declarations: [SubscriptionsComponent, AddSubscriptionComponent],
  providers: [
    SubscriptionsService
  ]
})
export class SubscriptionsModule { }
