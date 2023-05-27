import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { FeedsComponent } from '@app/feeds/feeds.component';

const routes: Routes = [{ path: '', component: FeedsComponent, data: { title: extract('Feeds') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FeedsRoutingModule {}
