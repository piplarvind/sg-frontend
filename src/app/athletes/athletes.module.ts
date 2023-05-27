import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSortModule } from '@angular/material/sort';
import { MaterialModule } from '@app/material.module';
import { AthletesService } from '@app/athletes/athletes.service';

import { SearchSelectModule } from '@app/search-select/search-select.module';
import { AthletesRoutingModule } from '@app/athletes/athletes-routing.module';
import { AthletesComponent } from '@app/athletes/athletes.component';
import { AddAthleteComponent } from '@app/athletes/add-athlete/add-athlete.component';
import { FormsModule } from '@angular/forms';
import { EditInstallmentComponent } from './edit-installment/edit-installment.component';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    AthletesRoutingModule,
    MatSortModule,
    SearchSelectModule,
    // SharedModule,
    FormsModule
  ],
  declarations: [AthletesComponent, AddAthleteComponent, EditInstallmentComponent],
  providers: [AthletesService]
})
export class AthletesModule {}
