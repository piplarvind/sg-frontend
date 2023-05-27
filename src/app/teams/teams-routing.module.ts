import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { TeamsComponent } from '@app/teams/teams.component';
import { AddTeamComponent } from '@app/teams/add-team/add-team.component';

const routes: Routes = [
  { path: '', component: TeamsComponent, data: { title: extract('Teams') } },
  { path: 'add', component: AddTeamComponent, data: { title: extract('Add team') } },
  { path: 'edit/:id', component: AddTeamComponent, data: { title: extract('Edit team') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TeamsRoutingModule { }
