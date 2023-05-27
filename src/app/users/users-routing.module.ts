import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { UsersComponent } from '@app/users/users.component';
import { AddUserComponent } from '@app/users/add-user/add-user.component';

const routes: Routes = [
  { path: '', component: UsersComponent, data: { title: extract('Users') } },
  { path: 'add', component: AddUserComponent, data: { title: extract('Add User') } },
  { path: 'edit/:id', component: AddUserComponent, data: { title: extract('Edit User') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UsersRoutingModule { }
