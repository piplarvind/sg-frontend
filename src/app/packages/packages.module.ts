import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { PackagesRoutingModule } from '@app/packages/packages-routing.module';
import { PackagesComponent } from '@app/packages/packages.component';
import { PackagesService } from '@app/packages/packages.service';
import { AddPackageComponent } from '@app/packages/add-package/add-package.component';
import { FormsModule } from '@angular/forms';
import { SearchSelectModule } from '@app/search-select/search-select.module';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    SearchSelectModule,
    PackagesRoutingModule
  ],
  declarations: [PackagesComponent, AddPackageComponent],
  providers: [
    PackagesService
  ]
})
export class PackagesModule { }
