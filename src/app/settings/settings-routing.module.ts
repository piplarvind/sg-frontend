import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { SettingsComponent } from '@app/settings/settings.component';
import { AddEditSettingComponent } from '@app/settings/add-edit-setting/add-edit-setting.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    data: { title: extract('Settings') }
  },
  {
    path: 'add',
    component: AddEditSettingComponent,
    data: { title: extract('Add Setting') }
  },
  {
    path: 'edit/:id',
    component: AddEditSettingComponent,
    data: { title: extract('Edit Setting') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SettingRoutingModule {}
