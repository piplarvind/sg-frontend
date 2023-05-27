import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { SportsRoutingModule } from '@app/sports/sports-routing.module';
import { SportsComponent } from '@app/sports/sports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SportsService } from '@app/sports/sports.service';
import { AddSportComponent } from '@app/sports/add-sport/add-sport.component';
import { SharedModule } from '@app/shared';
import { SearchSelectModule } from '@app/search-select/search-select.module';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    SearchSelectModule,
    SportsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // NgxMatSelectSearchModule 
    SharedModule
  ],
  declarations: [
    SportsComponent,
    AddSportComponent,
    // SearchSelectComponent
  ],
  providers: [SportsService]
})
export class SportsModule { }
