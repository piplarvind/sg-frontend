import { NgModule } from '@angular/core';
import { extract } from '@app/core';
import { Routes, RouterModule } from '@angular/router';
import { EstoreTransactionComponent } from '@app/estore-transaction/estore-transaction.component';
import { AddTransactionComponent } from '@app/estore-transaction/add-transaction/add-transaction.component';

const routes: Routes = [
  {
    path: '',
    component: EstoreTransactionComponent,
    data: { title: extract('Transaction') }
  },
  {
    path: 'add',
    component: AddTransactionComponent,
    data: { title: extract('Add Transaction') }
  },
  {
    path: 'edit/:id',
    component: AddTransactionComponent,
    data: { title: extract('Edit Transaction') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TransactionRoutingModule {}
