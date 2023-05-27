import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { ClubsRoutingModule } from '@app/clubs/clubs-routing.module';
import { ClubsComponent } from '@app/clubs/clubs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClubsService } from '@app/clubs/clubs.service';
import { AddClubComponent } from '@app/clubs/add-club/add-club.component';
import { SharedModule } from '@app/shared';
import { SearchSelectModule } from '@app/search-select/search-select.module';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    SearchSelectModule,
    ClubsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // NgxMatSelectSearchModule 
    SharedModule
  ],
  declarations: [
    ClubsComponent,
    AddClubComponent,
    // SearchSelectComponent
  ],
  providers: [ClubsService]
})
export class ClubsModule { }
