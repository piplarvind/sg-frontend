import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { SportsComponent } from '@app/sports/sports.component';
import { AddSportComponent } from '@app/sports/add-sport/add-sport.component';

const routes: Routes = [
  { path: '', component: SportsComponent, data: { title: extract('Sports') } },
  { path: 'add', component: AddSportComponent, data: { title: extract('Add Sport') } },
  { path: 'edit/:id', component: AddSportComponent, data: { title: extract('Edit Sport') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SportsRoutingModule { }
