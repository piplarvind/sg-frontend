import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { AthletesComponent } from '@app/athletes/athletes.component';
import { AddAthleteComponent } from '@app/athletes/add-athlete/add-athlete.component';

import { EditInstallmentComponent } from '@app/athletes/edit-installment/edit-installment.component';

  const routes: Routes = [
  {
    path: '',
    component: AthletesComponent,
    data: { title: extract('Athletes') }
  },
  {
    path: 'add',
    component: AddAthleteComponent,
    data: { title: extract('Add Athlete') }
  },
  {
    path: 'edit/:id',
    component: AddAthleteComponent,
    data: { title: extract('Edit Athlete') }
  },
  {
    path: 'installment/edit/:paymentId/:installmentId',
    component: EditInstallmentComponent,
    data: { title: extract('Edit Installment') }
  },
  {
    path: 'installment/pay/:paymentId/:installmentId',
    component: EditInstallmentComponent,
    data: { title: extract('Pay Installment') }
  },
  {
    path: 'installment/delete/:userduesId',
    component: EditInstallmentComponent,
    data: { title: extract('Delete Installment') }
  }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AthletesRoutingModule {}
