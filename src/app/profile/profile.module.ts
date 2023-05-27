import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { ProfileRoutingModule } from '@app/profile/profile-routing.module';
import { ProfileComponent } from '@app/profile/profile.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    ProfileRoutingModule,
    FormsModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
