import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { SubscriptionsComponent } from '@app/subscriptions/subscriptions.component';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';

const routes: Routes = [
  { path: '', component: SubscriptionsComponent, data: { title: extract('Subscriptions') } },
  { path: 'add', component: AddSubscriptionComponent, data: { title: extract('Add Subscription') } },
  { path: 'edit', component: AddSubscriptionComponent, data: { title: extract('Edit Subscription') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SubscriptionsRoutingModule { }
