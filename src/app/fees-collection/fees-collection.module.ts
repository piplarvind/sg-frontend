import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkColumnDef } from '@angular/cdk/table';
import { FeesCollectionRoutingModule } from './fees-collection-routing.module';
import { FeesCollectionComponent } from './fees-collection.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [
    FeesCollectionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FeesCollectionRoutingModule
  ],
  providers:[CdkColumnDef]
})
export class FeesCollectionModule { }
