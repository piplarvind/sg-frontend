import { NgModule } from '@angular/core';
import { extract } from '@app/core';
import { Routes, RouterModule } from '@angular/router';
import { EstoreOrdersComponent } from '@app/estore-orders/estore-orders.component';

const routes: Routes = [
    { path: '', component: EstoreOrdersComponent, data: { title: extract('Category') } },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OrdersRoutingModule { }
