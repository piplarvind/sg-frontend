import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { CoachRoutingModule } from '@app/coach/coach-routing.module';
import { CoachComponent } from '@app/coach/coach.component';
import { AddCoachComponent } from '@app/coach/add-coach/add-coach.component';
import { FormsModule } from '@angular/forms';
import { SearchSelectModule } from '@app/search-select/search-select.module';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SearchSelectModule,
    FlexLayoutModule,
    MaterialModule,
    CoachRoutingModule,
    FormsModule
  ],
  declarations: [CoachComponent, AddCoachComponent]
})
export class CoachModule { }
