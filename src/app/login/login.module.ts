import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { LoginRoutingModule } from '@app/login/login-routing.module';
import { LoginComponent } from '@app/login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PolicyComponent } from './policy/policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { EualIosComponent } from './eual-ios/eual-ios.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent, ResetPasswordComponent, PolicyComponent, EualIosComponent, PrivacyPolicyComponent, MessageComponent]
})
export class LoginModule {}
