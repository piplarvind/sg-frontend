import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { FFFComponent } from '@app/friends-family-fans/fff.component';
const routes: Routes = [
  { path: '', component: FFFComponent, data: { title: extract('Friends Family Fans') } },
  { path: 'add', component: FFFComponent, data: { title: extract('Add Friends Family Fans') } },
  { path: 'edit/:id', component: FFFComponent, data: { title: extract('Edit Friends Family Fans') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FFFRoutingModule { }
