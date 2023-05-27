import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from '@app/shared/loader/loader.component';

import { SharedService } from '@app/shared/shared.service';
import { LoginDialogComponent } from '@app/shared/login-dialog/login-dialog.component';
import { DialogComponent } from '@app/shared/dialog/dialog.component';
import { ImageUploadComponent } from '@app/shared/image-upload/image-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstoreDateComponent } from './estore-date/estore-date.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    ImageCropperModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoaderComponent,
    DialogComponent,
    LoginDialogComponent,
    ImageUploadComponent,
    EstoreDateComponent
  ],
  exports: [LoaderComponent, FormsModule, ReactiveFormsModule],
  entryComponents: [
    DialogComponent,
    LoginDialogComponent,
    ImageUploadComponent,
    EstoreDateComponent
  ],
  providers: [SharedService]
})
export class SharedModule {}
