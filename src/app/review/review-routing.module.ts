import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { ReviewComponent } from '@app/review/review.component';
// import { AddReviewComponent } from './add-review/add-review.component';

const routes: Routes = [
  { path: '', component: ReviewComponent, data: { title: extract('Review') } },
  // { path: 'add', component: AddReviewComponent, data: { title: extract('Add Review') } },
  // { path: 'edit/:id', component: AddReviewComponent, data: { title: extract('Edit Review') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReviewRoutingModule { }
