import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkColumnDef } from '@angular/cdk/table';
import { FeesCollectionRoutingModule } from './fees-collection-routing.module';
import { FeesCollectionComponent } from './fees-collection.component';
import { MaterialModule } from '@app/material.module';
import { FeeCollectionService } from './fee-collection.service';


@NgModule({
  declarations: [
    FeesCollectionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FeesCollectionRoutingModule
  ],
  providers:[CdkColumnDef, FeeCollectionService]
})
export class FeesCollectionModule { }
