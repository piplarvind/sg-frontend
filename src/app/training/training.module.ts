import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from '@app/training/training.component';
import { TrainingService } from '@app/training/training.service';
import { TrainingRoutingModule } from '@app/training/training-routing.module';
import { MaterialModule } from '@app/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddTrainingComponent } from '@app/training/add-training/add-training.component';
import { SearchSelectModule } from '@app/search-select/search-select.module';
@NgModule({
  imports: [
    CommonModule,
    TrainingRoutingModule,
    MaterialModule,
    SearchSelectModule,
    FormsModule,
    FlexLayoutModule
  ],
  declarations: [TrainingComponent, AddTrainingComponent],
  providers: [TrainingService]
})
export class TrainingModule { }
