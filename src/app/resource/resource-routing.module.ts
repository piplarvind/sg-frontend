import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { ResourceComponent } from '@app/resource/resource.component';
import { AddResourceComponent } from '@app/resource/add-resource/add-resource.component';

const routes: Routes = [
  { path: '', component: ResourceComponent, data: { title: extract('Resources') } },
  { path: 'add', component: AddResourceComponent, data: { title: extract('Add Resource') } },
  { path: 'edit/:id', component: AddResourceComponent, data: { title: extract('Edit Resource') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ResourceRoutingModule {}
