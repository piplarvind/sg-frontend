import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SeasonsService } from '@app/seasons/seasons.service';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { EventsRoutingModule } from '@app/events/events-routing.module';
import { EventsComponent } from '@app/events/events.component';
import { EventsService } from '@app/events/events.service';
import { FormsModule } from '@angular/forms';
import { AddEventComponent } from '@app/events/add-event/add-event.component';
import { EventStatsComponent } from '@app/events/event-stats/event-stats.component';
import { SearchSelectModule } from '@app/search-select/search-select.module';
import { AgepipePipe } from './agepipe.pipe';
import { EventtypeComponent } from './eventtype/eventtype.component';
import { AddEventtypeComponent } from './add-eventtype/add-eventtype.component';
import { EventRepeatedDialogComponent } from './event-repeated-dialog/event-repeated-dialog.component';
import { RegisterUserEditComponent } from './register-user-edit/register-user-edit.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    GooglePlaceModule,
    SearchSelectModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatFormFieldModule,
    EventsRoutingModule,
    FormsModule
  ],
  declarations: [
    EventsComponent,
    EventtypeComponent,
    AddEventComponent,
    EventStatsComponent,
    AgepipePipe,
    AddEventtypeComponent,
    EventRepeatedDialogComponent,
    RegisterUserEditComponent
  ],
  //entryComponents: [EventRepeatedDialogComponent, RegisterUserEditComponent],
  providers: [EventsService, SeasonsService]
})
export class EventsModule {}
