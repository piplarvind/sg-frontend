import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { ResourceRoutingModule } from '@app/resource/resource-routing.module';
import { ResourceComponent } from '@app/resource/resource.component';
import { FormsModule } from '@angular/forms';
import { AddResourceComponent } from '@app/resource/add-resource/add-resource.component';
import { ResourceService } from '@app/resource/resource.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    ResourceRoutingModule,
    FormsModule
  ],
  declarations: [ResourceComponent, AddResourceComponent],
  providers: [
    ResourceService
  ]
})
export class ResourceModule { }
