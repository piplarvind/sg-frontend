import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeesCollectionComponent } from './fees-collection.component';
import { extract } from '@app/core';

const routes: Routes = [
  {
    path:'', component:FeesCollectionComponent, data: { title: extract('Fees Collection') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesCollectionRoutingModule { }
