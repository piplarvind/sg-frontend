import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { ReviewRoutingModule } from '@app/review/review-routing.module';
import { ReviewComponent } from '@app/review/review.component';
import { FormsModule } from '@angular/forms';
// import { AddReviewComponent } from './add-review/add-review.component';
// import { ReviewService } from '@app/review/review.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    SharedModule,
    MaterialModule,
    ReviewRoutingModule,
    FormsModule
  ],
  declarations: [ReviewComponent],
  providers: []
})
export class ReviewModule { }
