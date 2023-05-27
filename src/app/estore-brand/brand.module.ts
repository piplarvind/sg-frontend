import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrandRoutingModule } from '@app/estore-brand/brand-routing.module';
import { AddBrandComponent } from '@app/estore-brand/add-brand/add-brand.component' ;
import { MaterialModule } from '@app/material.module';
import { EstoreBrandComponent } from '@app/estore-brand/estore-brand.component';
import { SharedModule } from '@app/shared/shared.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormsModule } from '@angular/forms';
import { SearchSelectModule } from '@app/search-select/search-select.module';
import { BrandService } from '@app/estore-brand/brand.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    GooglePlaceModule,
    SearchSelectModule,
    SharedModule,
    FormsModule,
    BrandRoutingModule
  ],
  declarations: [
  AddBrandComponent, EstoreBrandComponent],
  providers: [BrandService]
})
export class BrandModule { }
