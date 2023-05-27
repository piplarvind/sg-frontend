import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { LeaderboardComponent } from '@app/leaderboard/leaderboard.component';
import { UpdateLeaderboardComponent } from '@app/leaderboard/update-leaderboard/update-leaderboard.component';

const routes: Routes = [
  { path: '', component: LeaderboardComponent, data: { title: extract('Leaderboard') } },
  { path: 'update', component: UpdateLeaderboardComponent, data: { title: extract('update Leaderboard') } },
  // { path: 'edit/:id', component: AddLeaderboardComponent, data: { title: extract('Edit Leaderboard') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LeaderboardRoutingModule { }
