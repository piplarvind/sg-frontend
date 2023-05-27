import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { GroupsRoutingModule } from './groups-routing.module';
import { SearchSelectModule } from '@app/search-select/search-select.module';
import { GroupsComponent } from './groups.component';

import { AddSectionComponent } from './add-section/add-section.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddMutiplegroupComponent } from './add-mutiplegroup/add-mutiplegroup.component';
import { FilterProfileTypePipe } from './filter-profile-type.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    GroupsRoutingModule,
    FormsModule,
    SearchSelectModule
  ],
  declarations: [GroupsComponent, AddSectionComponent, AddGroupComponent, AddMutiplegroupComponent, FilterProfileTypePipe]
})
export class GroupsModule {}
