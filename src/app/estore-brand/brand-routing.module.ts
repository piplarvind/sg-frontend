import { NgModule } from '@angular/core';
import { extract } from '@app/core';
import { Routes, RouterModule } from '@angular/router';
import { EstoreBrandComponent } from '@app/estore-brand/estore-brand.component';
import { AddBrandComponent } from '@app/estore-brand/add-brand/add-brand.component';

const routes: Routes = [
  {
    path: '',
    component: EstoreBrandComponent,
    data: { title: extract('Brand') }
  },
  {
    path: 'add',
    component: AddBrandComponent,
    data: { title: extract('Add Brand') }
  },
  {
    path: 'edit/:id',
    component: AddBrandComponent,
    data: { title: extract('Edit Brand') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BrandRoutingModule {}
