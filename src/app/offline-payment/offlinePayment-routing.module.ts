import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfflinePaymentComponent } from '@app/offline-payment/offline-payment.component';
import { extract } from '@app/core';
import { AddPaymentComponent } from '@app/offline-payment/add-payment/add-payment.component';
import { AddOfflinePaymentComponent } from '@app/offline-payment/add-offline-payment/add-offline-payment.component';

const routes: Routes = [
  { path: '', component: OfflinePaymentComponent, data: { title: extract('Offline Payment') } },
  { path: 'addPayment', component: AddPaymentComponent, data: { title: extract('Add Offline Payment') } },
  { path: 'edit/:id', component: AddPaymentComponent, data: { title: extract('Edit Offline Payment') } },
  { path: 'addOfflinePayment', component: AddOfflinePaymentComponent, data: { title: extract('Add Offline Payment') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OfflinePaymentRoutingModule {}
