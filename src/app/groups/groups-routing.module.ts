import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { GroupsComponent } from '@app/groups/groups.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddMutiplegroupComponent } from './add-mutiplegroup/add-mutiplegroup.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
    data: { title: extract('Groups') }
  },
  {
    path: 'add',
    component: AddMutiplegroupComponent,
    data: { title: extract('Add Groups') }
  },
  {
    path: 'edit/:id',
    component: AddMutiplegroupComponent,
    data: { title: extract('Edit Groups') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}
