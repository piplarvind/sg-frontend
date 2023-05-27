import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { AgeingComponent } from '@app/reports/ageing/ageing.component';
import { DeclinedComponent } from '@app/reports/declined/declined.component';
import { UnpaidComponent } from '@app/reports/unpaid/unpaid.component';
import { SuccessfulltransComponent } from './successfulltrans/successfulltrans.component';
// import { AddReviewComponent } from './add-review/add-review.component';

const routes: Routes = [
  {
    path: 'ageing',
    component: AgeingComponent,
    data: { title: extract('Ageing Reports') }
  },
  {
    path: 'declined',
    component: DeclinedComponent,
    data: { title: extract('Declined Cards') }
  },
  {
    path: 'unpaid',
    component: UnpaidComponent,
    data: { title: extract('Unpaid Athletes') }
  },
  {
    path: 'successtrans',
    component: SuccessfulltransComponent,
    data: { title: extract('SuccessFull Transcation') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReportsRoutingModule {}
