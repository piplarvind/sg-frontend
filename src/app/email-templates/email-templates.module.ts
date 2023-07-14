import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { EmailTemplatesRoutingModule } from '@app/email-templates/sports-routing.module';
import { EmailTemplatesComponent } from '@app/email-templates/sports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailTemplatesService } from '@app/email-templates/sports.service';
import { AddEmailTemplateComponent } from '@app/email-templates/add-email-template/add-email-template.component';
import { SharedModule } from '@app/shared';
import { SearchSelectModule } from '@app/search-select/search-select.module';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    SearchSelectModule,
    EmailTemplatesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // NgxMatSelectSearchModule 
    SharedModule
  ],
  declarations: [
    EmailTemplatesComponent,
    AddEmailTemplateComponent,
    // SearchSelectComponent
  ],
  providers: [EmailTemplatesService]
})
export class EmailTemplatesModule { }
