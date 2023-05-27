import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingAssignComponent } from '@app/training-assign/training-assign.component';
import { TrainingAssignService } from '@app/training-assign/training-assign.service';
import { TrainingAssignRoutingModule } from './training-assign-routing.module';
import { MaterialModule } from '@app/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddTrainingAssignComponent } from '@app/training-assign/add-training-assign/add-training-assign.component';
import { SearchSelectModule } from '@app/search-select/search-select.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingAssignRoutingModule,
    SearchSelectModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
  declarations: [TrainingAssignComponent, AddTrainingAssignComponent],
  providers: [TrainingAssignService]
})
export class TrainingAssignModule {}
