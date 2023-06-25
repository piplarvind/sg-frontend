import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageComponent } from './cms-page.component';
import { extract } from '@app/core';
import { AddCmsPageComponent } from './add-cms-page/add-cms-page.component';

const routes: Routes = [
  {
    path: '', component: CmsPageComponent, data: { title: extract('CMS Pages') }
  },
  { path: 'edit', component: AddCmsPageComponent, data: { title: extract('Edit CMS Page') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsPageRoutingModule { }
