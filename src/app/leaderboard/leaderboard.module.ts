import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { LeaderboardRoutingModule } from '@app/leaderboard/leaderboard-routing.module';
import { LeaderboardComponent } from '@app/leaderboard/leaderboard.component';
import { FormsModule } from '@angular/forms';
import { UpdateLeaderboardComponent } from '@app/leaderboard/update-leaderboard/update-leaderboard.component';
import { LeaderboardService } from '@app/leaderboard/leaderboard.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    LeaderboardRoutingModule,
    FormsModule
  ],
  declarations: [LeaderboardComponent, UpdateLeaderboardComponent],
  providers: [LeaderboardService]
})
export class LeaderboardModule { }
