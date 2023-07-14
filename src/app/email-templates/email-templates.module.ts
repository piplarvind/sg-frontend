import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailTemplateRoutingModule } from './email-templates-routing.module';
import { AddEmailTemplateComponent } from './add-email-template/add-email-template.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxEditorModule } from 'ngx-editor';
import { MaterialModule } from '@app/material.module';
import { FormsModule } from '@angular/forms';
import { EmailTemplateComponent } from './email-templates.component';
import { EmailTemplateService } from './email-templates.service';


@NgModule({
  declarations: [
    EmailTemplateComponent,
    AddEmailTemplateComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    NgxEditorModule,
    MaterialModule,
    FormsModule,
    EmailTemplateRoutingModule
  ],
  providers:[EmailTemplateService]
})
export class EmailTemplateModule { }
