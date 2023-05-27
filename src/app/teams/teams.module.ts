import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { SeasonsService } from '@app/seasons/seasons.service';
import { TeamsRoutingModule } from '@app/teams/teams-routing.module';
import { TeamsService } from '@app/teams/teams.service';
import { TeamsComponent } from '@app/teams/teams.component';
import { AddTeamComponent } from '@app/teams/add-team/add-team.component';
import { FormsModule } from '@angular/forms';
import { SearchSelectModule } from '@app/search-select/search-select.module';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SearchSelectModule,
    FlexLayoutModule,
    MaterialModule,
    TeamsRoutingModule,
    FormsModule
  ],
  declarations: [TeamsComponent, AddTeamComponent],
  providers: [TeamsService, SeasonsService]
})
export class TeamsModule {}
