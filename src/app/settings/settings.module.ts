import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from '@app/settings/settings.component';
import { SettingsService } from '@app/settings/settings.service';
import { SettingRoutingModule } from '@app/settings/settings-routing.module';
import { MaterialModule } from '@app/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddEditSettingComponent } from '@app/settings/add-edit-setting/add-edit-setting.component';
import { SearchSelectModule } from '@app/search-select/search-select.module';
@NgModule({
  imports: [
    CommonModule,
    SettingRoutingModule,
    MaterialModule,
    SearchSelectModule,
    FormsModule,
    FlexLayoutModule
  ],
  declarations: [SettingsComponent, AddEditSettingComponent],
  providers: [SettingsService]
})
export class SettingsModule { }
