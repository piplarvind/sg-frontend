import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { TrainingComponent } from '@app/training/training.component';
import { AddTrainingComponent } from '@app/training/add-training/add-training.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingComponent,
    data: { title: extract('Training') }
  },
  {
    path: 'add',
    component: AddTrainingComponent,
    data: { title: extract('Add Training') }
  },
  {
    path: 'edit/:id',
    component: AddTrainingComponent,
    data: { title: extract('Edit Training') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TrainingRoutingModule {}
