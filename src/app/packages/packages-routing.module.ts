import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { PackagesComponent } from '@app/packages/packages.component';
import { AddPackageComponent } from './add-package/add-package.component';

const routes: Routes = [
  { path: '', component: PackagesComponent, data: { title: extract('Packages') } },
  { path: 'add', component: AddPackageComponent, data: { title: extract('Add Package') } },
  { path: 'edit', component: AddPackageComponent, data: { title: extract('Edit Package') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PackagesRoutingModule { }
