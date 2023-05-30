import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSortModule } from '@angular/material/sort';
import { MaterialModule } from '@app/material.module';

import { NgxEditorModule } from 'ngx-editor';

import { MailRoutingModule } from '@app/mail/mail-routing.module';
import { MailComponent } from '@app/mail/mail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMailComponent } from '@app/mail/add-mail/add-mail.component';
import { MailDetailComponent } from '@app/mail/mail-detail/mail-detail.component';
import { MailService } from '@app/mail/mail.service';
import { SearchSelectModule } from '@app/search-select/search-select.module';

// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


@NgModule({
  imports: [
    CommonModule,
    MatSortModule,
    TranslateModule,
    FlexLayoutModule,
    SearchSelectModule,
    MaterialModule,
    MailRoutingModule,
    NgxEditorModule,
    FormsModule,
    // NgxMatSelectSearchModule,
    ReactiveFormsModule,
    // SharedModule
  ],
  declarations: [
    MailComponent, 
    // SearchSelectComponent,
    AddMailComponent,
    MailDetailComponent
  ],
  // exports:[SearchSelectComponent],
  providers: [
    MailService
  ]
})
export class MailModule { }
