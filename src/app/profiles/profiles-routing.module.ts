import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { ProfilesComponent } from '@app/profiles/profiles.component';

import { AddProfileComponent } from './add-profile/add-profile.component';
const routes: Routes = [
  { path: '', component: ProfilesComponent, data: { title: extract('Users') } },

    { path: 'add', component: AddProfileComponent, data: { title: extract('Add Profile') } },
    { path: 'edit/:id', component: AddProfileComponent, data: { title: extract('Edit Profile') } }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
