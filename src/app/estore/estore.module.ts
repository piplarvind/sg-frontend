import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { EStoreRoutingModule } from '@app/estore/estore-routing.module';
import { FormsModule } from '@angular/forms';
import { SearchSelectModule } from '@app/search-select/search-select.module';
import { EstoreComponent } from '@app/estore/estore.component';
import { AddColorComponent } from '@app/estore/add-color/add-color.component';
import { ColorService } from '@app/estore/color.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    GooglePlaceModule,
    SearchSelectModule,
    EStoreRoutingModule,
    FormsModule
  ],
  declarations: [
    EstoreComponent,
    AddColorComponent,
  ],
  providers: [ColorService]
})
export class EStoreModule { }
// ng g c name --skip-import