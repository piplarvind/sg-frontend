import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { ParentComponent } from '@app/parent/parent.component';
import { AddparentComponent } from '@app/parent//addparent/addparent.component';
const routes: Routes = [
  { path: '', component:  ParentComponent, data: { title: extract('Parent') } },
  { path: 'add', component: AddparentComponent, data: { title: extract('Add Parent') } },
  { path: 'edit/:id', component: AddparentComponent, data: { title: extract('Edit Parent') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
