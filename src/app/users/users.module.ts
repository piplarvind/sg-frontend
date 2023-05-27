import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { UsersRoutingModule } from '@app/users/users-routing.module';
import { UsersComponent } from '@app/users/users.component';
import { AddUserComponent } from '@app/users/add-user/add-user.component';

import { UsersService } from '@app/users/users.service';
import { FormsModule } from '@angular/forms';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    UsersRoutingModule,
    FormsModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule
  ],
  declarations: [UsersComponent, AddUserComponent],
  providers: [UsersService]
})
export class UsersModule { }
