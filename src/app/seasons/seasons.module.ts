import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { SeasonsRoutingModule } from '@app/seasons/seasons-routing.module';
import { SeasonsComponent } from '@app/seasons/seasons.component';
import { SeasonsService } from '@app/seasons/seasons.service';
import { FormsModule } from '@angular/forms';
import { AddSeasonComponent } from '@app/seasons/add-season/add-season.component';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    SeasonsRoutingModule,
    FormsModule
  ],
  declarations: [SeasonsComponent, AddSeasonComponent],
  providers: [
    SeasonsService
  ]
})
export class SeasonsModule { }
