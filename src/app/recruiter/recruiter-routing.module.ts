import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import {RecruiterComponent} from '@app/recruiter/recruiter.component';
import { AddrecruiterComponent } from '@app/recruiter/addrecruiter/addrecruiter.component';
const routes: Routes = [
  { path: '', component: RecruiterComponent, data: { title: extract('Recruiter') } },
  { path: 'add', component: AddrecruiterComponent, data: { title: extract('Add Recruiter') } },
  { path: 'edit/:id', component: AddrecruiterComponent, data: { title: extract('Edit Recruiter') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
