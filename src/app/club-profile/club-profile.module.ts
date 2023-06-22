import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubProfileRoutingModule } from './club-profile-routing.module';
import { ClubProfileComponent } from './club-profile.component';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AddClubProfileComponent } from './add-club-profile/add-club-profile.component';


@NgModule({
  declarations: [
    ClubProfileComponent,
    AddClubProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ClubProfileRoutingModule
  ]
})
export class ClubProfileModule { }
