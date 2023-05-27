import { NgModule } from '@angular/core';
import { extract } from '@app/core';
import { Routes, RouterModule } from '@angular/router';
import { EstoreCategoriesComponent } from '@app/estore-categories/estore-categories.component';
import { AddCategoryComponent } from '@app/estore-categories/add-category/add-category.component';

const routes: Routes = [
  {
    path: '',
    component: EstoreCategoriesComponent,
    data: { title: extract('Category') }
  },
  {
    path: 'add',
    component: AddCategoryComponent,
    data: { title: extract('Add Category') }
  },
  {
    path: 'edit/:id',
    component: AddCategoryComponent,
    data: { title: extract('Edit Category') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CategoryRoutingModule {}
