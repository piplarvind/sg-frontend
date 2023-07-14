import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubAdminRoutingModule } from './club-admin-routing.module';
import { ClubAdminComponent } from './club-admin.component';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { AddClubAdminComponent } from './add-club-admin/add-club-admin.component';


@NgModule({
  declarations: [
    ClubAdminComponent,
    AddClubAdminComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ClubAdminRoutingModule,
    Ng2TelInputModule
  ]
})
export class ClubAdminModule { }
