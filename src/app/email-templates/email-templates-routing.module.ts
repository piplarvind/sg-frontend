import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { EmailTemplatesComponent } from '@app/email-templates/sports.component';
import { AddEmailTemplateComponent } from '@app/email-templates/add-email-template/add-email-template.component';

const routes: Routes = [
  { path: '', component: EmailTemplatesComponent, data: { title: extract('EmailTemplates') } },
  { path: 'add', component: AddEmailTemplateComponent, data: { title: extract('Add EmailTemplate') } },
  { path: 'edit/:id', component: AddEmailTemplateComponent, data: { title: extract('Edit EmailTemplate') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EmailTemplatesRoutingModule { }
