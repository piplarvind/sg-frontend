import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { TrainingAssignComponent } from '@app/training-assign/training-assign.component';
import { AddTrainingAssignComponent } from '@app/training-assign/add-training-assign/add-training-assign.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingAssignComponent,
    data: { title: extract('Training') }
  },
  {
    path: 'add',
    component: AddTrainingAssignComponent,
    data: { title: extract('Add Training') }
  },
  {
    path: 'edit/:id',
    component: AddTrainingAssignComponent,
    data: { title: extract('Edit Training') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TrainingAssignRoutingModule {}
