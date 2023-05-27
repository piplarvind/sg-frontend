import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { MailComponent } from '@app/mail/mail.component';
import { AddMailComponent } from '@app/mail/add-mail/add-mail.component';
import { MailDetailComponent } from '@app/mail/mail-detail/mail-detail.component';

const routes: Routes = [
  { path: '', component: MailComponent, data: { title: extract('Mails') } },
  { path: 'add', component: AddMailComponent, data: { title: extract('Compose') } },
  { path: 'view', component: MailDetailComponent, data: { title: extract('Compose') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MailRoutingModule { }
