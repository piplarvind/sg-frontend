import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
// import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfilesService } from '@app/profiles/profiles.service';
import { FormsModule } from '@angular/forms';
import { SearchSelectModule } from '@app/search-select/search-select.module';
// import { PhoneMaskDirective } from './phone-mask.directive';
import { AddProfileComponent } from './add-profile/add-profile.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SearchSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ProfilesRoutingModule
  ],
  declarations: [ProfilesComponent, AddProfileComponent],
  exports: [],
  providers: [ProfilesService]
})
export class ProfilesModule {}
