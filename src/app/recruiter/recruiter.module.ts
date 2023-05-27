import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { FormsModule } from '@angular/forms';
import { SearchSelectModule } from '@app/search-select/search-select.module'
import { AddrecruiterComponent } from '@app/recruiter/addrecruiter/addrecruiter.component.ts';
import { RecruiterRoutingModule } from './recruiter-routing.module';
import { RecruiterComponent } from './recruiter.component';

@NgModule({
  imports: [
  
    CommonModule,
   TranslateModule,
   SearchSelectModule,
   FlexLayoutModule,
   MaterialModule,
 
   FormsModule,
    RecruiterRoutingModule
  ],
  declarations: [RecruiterComponent, AddrecruiterComponent]
})
export class RecruiterModule { }
