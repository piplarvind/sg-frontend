import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { ClubsComponent } from '@app/clubs/clubs.component';
import { AddClubComponent } from '@app/clubs/add-club/add-club.component';

const routes: Routes = [
  { path: '', component: ClubsComponent, data: { title: extract('Clubs') } },
  { path: 'add', component: AddClubComponent, data: { title: extract('Add Club') } },
  { path: 'edit/:id', component: AddClubComponent, data: { title: extract('Edit Club') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClubsRoutingModule { }
