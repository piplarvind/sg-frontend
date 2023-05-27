import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { EventsComponent } from '@app/events/events.component';
import { EventStatsComponent } from '@app/events/event-stats/event-stats.component';
import { AddEventComponent } from '@app/events/add-event/add-event.component';
import { EventtypeComponent } from './eventtype/eventtype.component';
import { AddEventtypeComponent } from './add-eventtype/add-eventtype.component';
// import { UpdateStatsComponent } from '@app/events/update-stats/update-stats.component';

const routes: Routes = [
  { path: '', component: EventsComponent, data: { title: extract('Events') } },
  {
    path: 'eventtype/addeventtype',
    component: AddEventtypeComponent,
    data: { title: extract('Add Eventtype') }
  },
  {
    path: 'eventtype',
    component: EventtypeComponent,
    data: { title: extract('Eventtype') }
  },
  {
    path: 'eventtype/editeventtype/:id',
    component: AddEventtypeComponent,
    data: { title: extract('Edit Event Type') }
  },
  {
    path: 'add',
    component: AddEventComponent,
    data: { title: extract('Add Event') }
  },
  {
    path: 'edit/:id',
    component: AddEventComponent,
    data: { title: extract('Edit Event') }
  },
  {
    path: 'stats',
    component: EventStatsComponent,
    data: { title: extract('Event Stats') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EventsRoutingModule {}
