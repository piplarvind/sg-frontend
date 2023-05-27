import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { CoachComponent } from '@app/coach/coach.component';
import { AddCoachComponent } from '@app/coach/add-coach/add-coach.component';

const routes: Routes = [
  { path: '', component: CoachComponent, data: { title: extract('Coach') } },
  { path: 'add', component: AddCoachComponent, data: { title: extract('Add coach') } },
  { path: 'edit/:id', component: AddCoachComponent, data: { title: extract('Edit coach') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CoachRoutingModule { }
