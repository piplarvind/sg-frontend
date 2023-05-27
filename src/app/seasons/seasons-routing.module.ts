import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { SeasonsComponent } from '@app/seasons/seasons.component';
import { AddSeasonComponent } from '@app/seasons/add-season/add-season.component';

const routes: Routes = [
  { path: '', component: SeasonsComponent, data: { title: extract('Seasons') } },
  { path: 'update', component: SeasonsComponent, data: { title: extract('Seasons') } },
  { path: 'add', component: AddSeasonComponent, data: { title: extract('Add Season') } },
  { path: 'edit', component: AddSeasonComponent, data: { title: extract('Edit Season') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SeasonsRoutingModule {}
