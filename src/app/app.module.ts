import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/material.module';
import { environment } from '../environments/environment';
import { CoreModule } from '@app/core';
//
import { SharedModule } from '@app/shared';
import { HomeModule } from '@app/home/home.module';
import { LoginModule } from '@app/login/login.module';
import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { UsersModule } from '@app/users/users.module';
import { SportsModule } from '@app/sports/sports.module';
import { ClubsModule } from '@app/clubs/clubs.module';
import { TeamsModule } from '@app/teams/teams.module';
import { CoachModule } from '@app/coach/coach.module';
import { RecruiterModule } from '@app/recruiter/recruiter.module';
import { ParentModule } from '@app/parent/parent.module';
import { AthletesModule } from '@app/athletes/athletes.module';
import { TrainingModule } from '@app/training/training.module';
import { GroupsModule } from '@app/groups/groups.module';
import { TrainingAssignModule } from '@app/training-assign/training-assign.module';
import { ResourceModule } from '@app/resource/resource.module';
import { LeaderboardModule } from '@app/leaderboard/leaderboard.module';
import { EventsModule } from '@app/events/events.module';
import { EStoreModule } from '@app/estore/estore.module';
import { BrandModule } from '@app/estore-brand/brand.module';
import { CategoryModule } from '@app/estore-categories/category.module';
import { TransactionModule } from '@app/estore-transaction/transaction.module';
import { ProductsModule } from '@app/estore-products/products.module';
import { PackagesModule } from '@app/packages/packages.module';
import { ProfileModule } from '@app/profile/profile.module';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { MailModule } from '@app/mail/mail.module';
import { ReviewModule } from '@app/review/review.module';
import { MessagingService } from '../messaging.service';
import { OfflinePaymentModule } from '@app/offline-payment/offlinePayment.module';
import { FeedsModule } from '@app/feeds/feeds.module';
// import { ProfilesComponent } from './profiles/profiles.component';
// import { ProfileTypeComponent } from './profile-type/profile-type.component';
import { ProfilesModule } from '@app/profiles/profiles.module';
import { ProfileTypeModule } from '@app/profile-type/profile-type.module';
import { SubscriptionsModule } from '@app/subscriptions/subscriptions.module';
import { FeesCollectionModule } from './fees-collection/fees-collection.module';
import { SettingsModule } from '@app/settings/settings.module';
import { ClubAdminModule } from '@app/club-admin/club-admin.module';

import { JwtInterceptor } from './core/http/jwt.interceptor';
import { CmsPageModule } from './cms-page/cms-page.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    //
    CoreModule,
    SharedModule,
    HomeModule,
    LoginModule,
    AppRoutingModule,
    UsersModule,
    SportsModule,
    ClubsModule,
    TeamsModule,
    CoachModule,
    MailModule,
    RecruiterModule,
    ParentModule,
    AthletesModule,
    TrainingModule,
    GroupsModule,
    TrainingAssignModule,
    ResourceModule,
    LeaderboardModule,
    EventsModule,
    EStoreModule,
    BrandModule,
    CategoryModule,
    TransactionModule,
    ProductsModule,
    PackagesModule,
    ProfileModule,
    OfflinePaymentModule,
    FeedsModule,
    FeesCollectionModule,
    SettingsModule,
    ClubAdminModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    ReviewModule,
    BrowserModule,
    FormsModule,
    ProfilesModule,
    ProfileTypeModule,
    SubscriptionsModule,
    CmsPageModule,
    HttpClientModule
  ],
  declarations: [AppComponent],
  providers: [
    MessagingService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    //{ provide: LocationStrategy, useClass: HashLocationStrategy },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
