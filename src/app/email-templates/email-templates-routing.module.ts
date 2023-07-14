import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailTemplateComponent } from './email-templates.component';
import { extract } from '@app/core';
import { AddEmailTemplateComponent } from './add-email-template/add-email-template.component';

const routes: Routes = [
  {
    path: '', component: EmailTemplateComponent, data: { title: extract('Email Templates') }
  },
  { path: 'edit', component: AddEmailTemplateComponent, data: { title: extract('Edit Email Template') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailTemplateRoutingModule { }
