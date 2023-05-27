import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { EstoreComponent } from '@app/estore/estore.component';
import { AddColorComponent } from '@app/estore/add-color/add-color.component';

const routes: Routes = [
  { path: '', component: EstoreComponent, data: { title: extract('Estore') } },
  {
    path: 'add',
    component: AddColorComponent,
    data: { title: extract('Add Colors') }
  },
  {
    path: 'edit/:id',
    component: AddColorComponent,
    data: { title: extract('Edit Colors') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EStoreRoutingModule {}
