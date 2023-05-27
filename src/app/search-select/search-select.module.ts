import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MaterialModule } from '@app/material.module';
// import { NgxEditorModule } from 'ngx-editor';
import { SearchSelectComponent } from '@app/search-select/search-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    // NgxEditorModule,
    FormsModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule
  ],
  declarations: [
    SearchSelectComponent
  ],
  exports: [
    SearchSelectComponent,
    FormsModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule
  ]
})
export class SearchSelectModule { }
