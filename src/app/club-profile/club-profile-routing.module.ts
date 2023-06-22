import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubProfileComponent } from './club-profile.component';
import { extract } from '@app/core';
import { AddClubProfileComponent } from './add-club-profile/add-club-profile.component';

const routes: Routes = [{
  path: '', component: ClubProfileComponent,
  data: { title: extract('Club Profile Title') }
},
{
  path: 'add',
  component: AddClubProfileComponent,
  data: { title: extract('Add Club Profile Title') }
},
{
  path: 'edit/:id',
  component: AddClubProfileComponent,
  data: { title: extract('Edit Club Profile Title') }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubProfileRoutingModule { }
