import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';


import { FormsModule } from '@angular/forms';
import { SearchSelectModule } from '@app/search-select/search-select.module';
import { FFFRoutingModule } from './fff-routing.module';
import { FFFComponent } from './fff.component';
@NgModule({
  imports: [
    CommonModule,
     CommonModule,
    TranslateModule,
    SearchSelectModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    FFFRoutingModule
  ],
  declarations: [FFFComponent]
})
export class FFFModule { }
