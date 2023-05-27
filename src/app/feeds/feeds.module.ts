import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormsModule } from '@angular/forms';
import { SearchSelectModule } from '@app/search-select/search-select.module';
import { FeedsService } from '@app/feeds/feeds.service';
import { FeedsComponent } from '@app/feeds/feeds.component';
import { FeedsRoutingModule } from '@app/feeds/feeds-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    GooglePlaceModule,
    SearchSelectModule,
    FormsModule,
    FeedsRoutingModule,
    SharedModule
  ],
  declarations: [FeedsComponent],
  providers: [FeedsService]
})
export class FeedsModule {}
