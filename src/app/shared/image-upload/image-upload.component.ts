import { Component, OnInit, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
// import { Croppie } from 'croppie/croppie';
// import * as Croppie from 'croppie';
// import { CroppieDirective } from 'angular-croppie-module';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @ViewChild('croppie')
  popupHeader: String;
  cropResult: any;
  ratio: any;
  cropContainer: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ImageUploadComponent>
  ) {}

  ngOnInit() {
    if (this.data.team !== true) {
      // this.ratio = 1 / 1;
      this.ratio = 16 / 9;
    }
    if (this.data.title) {
      this.popupHeader = this.data.title;
    }
    if (this.data.file) {
      this.fileChangeEvent(this.data.file);
    }
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  //Usage example:
  base64ImageToBlob(str) {
    // extract content type and base64 payload from original string
    var pos = str.indexOf(';base64,');
    var type = str.substring(5, pos);
    var b64 = str.substr(pos + 8);

    // decode base64
    var imageContent = atob(b64);

    // create an ArrayBuffer and a view (as unsigned 8-bit)
    var buffer = new ArrayBuffer(imageContent.length);
    var view = new Uint8Array(buffer);

    // fill the view, using the decoded base64
    for (var n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }

    // convert ArrayBuffer to Blob
    var blob = new File([buffer], 'club.jpg', { type: 'image/png' });
    this.dialogRef.close(blob);
    // return blob;
  }
  uploading() {
    this.base64ImageToBlob(this.croppedImage);
  }
  onCancel() {
    this.dialogRef.close(this.croppedImage);
  }
}
