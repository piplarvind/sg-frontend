import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubAdminComponent } from './club-admin.component';
import { extract } from '@app/core';
import { AddClubAdminComponent } from './add-club-admin/add-club-admin.component';

const routes: Routes = [{
  path: '', component: ClubAdminComponent,
  data: { title: extract('Club Profile Title') }
},
{
  path: 'add',
  component: AddClubAdminComponent,
  data: { title: extract('Add Club Profile Title') }
},
{
  path: 'edit/:id',
  component: AddClubAdminComponent,
  data: { title: extract('Edit Club Profile Title') }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubAdminRoutingModule { }
