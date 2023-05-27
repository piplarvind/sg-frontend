import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { ProfileTypeComponent } from '@app/profile-type/profile-type.component';
import { AddProfileTypeComponent } from '@app/profile-type/add-profile-type/add-profile-type.component';
const routes: Routes = [
  {
    path: '',
    component: ProfileTypeComponent,
    data: { title: extract('ProfileType') }
  },
  {
    path: 'add',
    component: AddProfileTypeComponent,
    data: { title: extract('Add ProfileType') }
  },
  {
    path: 'edit/:id',
    component: AddProfileTypeComponent,
    data: { title: extract('Edit Profile') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileTypeRoutingModule {}
