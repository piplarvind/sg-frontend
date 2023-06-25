import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { LoginComponent } from '@app/login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PolicyComponent } from './policy/policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { EualIosComponent } from './eual-ios/eual-ios.component';
import { MessageComponent} from './message/message.component';
import { CmsPageComponent } from '@app/cms-page/cms-page.component';
import { PublicCmsPageComponent } from './public-cms-page/public-cms-page.component';

const routes: Routes = [
 
  { path: 'login', component: LoginComponent, data: { title: extract('Login') } },
  { path: 'message', component: MessageComponent, data: { title: extract('Meassage') } },
  { path: 'forgotPassword', component: ResetPasswordComponent, data: { title: extract('Reset Passsword') } },
  { path: 'forgotPassword_Web', component: ResetPasswordComponent, data: { title: extract('Reset Passsword') } },
  { path: 'androidPrivacyPolicy', component: PolicyComponent, data: { title: extract('Android Privacy Policy') } },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent, data: { title: extract('Privacy Policy') } },
  { path: 'eula_ios', component: EualIosComponent, data: { title: extract('End User License Agreement') } },

  { path: 'cms-page/:slug', component: PublicCmsPageComponent, data: { title: extract('CMS Page') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutingModule {}
