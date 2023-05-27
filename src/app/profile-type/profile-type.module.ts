import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { ProfileTypeRoutingModule } from './profile-type-routing.module';
import { SearchSelectModule } from '@app/search-select/search-select.module';
import { ProfileTypeComponent } from './profile-type.component';
import { AddProfileTypeComponent } from './add-profile-type/add-profile-type.component'
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ProfileTypeRoutingModule,
    FormsModule,
    SearchSelectModule
  ],
  declarations: [ProfileTypeComponent, AddProfileTypeComponent]
})
export class ProfileTypeModule { }
