import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { ProfileComponent } from '@app/profile/profile.component';
const routes: Routes = [
  { path: '', component: ProfileComponent, data: { title: extract('Profile') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProfileRoutingModule { }
