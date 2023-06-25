import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsPageRoutingModule } from './cms-page-routing.module';
import { AddCmsPageComponent } from './add-cms-page/add-cms-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxEditorModule } from 'ngx-editor';
import { MaterialModule } from '@app/material.module';
import { FormsModule } from '@angular/forms';
import { CmsPageComponent } from './cms-page.component';
import { CmsPageService } from './cms-page.service';


@NgModule({
  declarations: [
    CmsPageComponent,
    AddCmsPageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    NgxEditorModule,
    MaterialModule,
    FormsModule,
    CmsPageRoutingModule
  ],
  providers:[CmsPageService]
})
export class CmsPageModule { }
