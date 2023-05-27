import { NgModule } from '@angular/core';
import { extract } from '@app/core';
import { Routes, RouterModule } from '@angular/router';
import { EstoreProductsComponent } from '@app/estore-products/estore-products.component';
import { AddProductComponent } from '@app/estore-products/add-product/add-product.component';

const routes: Routes = [
  { path: '', component: EstoreProductsComponent, data: { title: extract('Category') } },
  { path: 'add', component: AddProductComponent, data: { title: extract('Add Category') } },
  { path: 'edit/:id', component: AddProductComponent, data: { title: extract('Edit Category') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProductsRoutingModule {}
