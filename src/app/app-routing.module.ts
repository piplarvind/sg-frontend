import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Route } from '@app/core';

const routes: Routes = [
  Route.withShell([
    {
      path: 'profiles',
      loadChildren: 'app/profiles/profiles.module#ProfilesModule'
    },
    {
      path: 'profile_type',
      loadChildren: 'app/profile-type/profile-type.module#ProfileTypeModule'
    },
    { path: 'about', loadChildren: 'app/about/about.module#AboutModule' },
    { path: 'users', loadChildren: 'app/users/users.module#UsersModule' },
    { path: 'clubs', loadChildren: 'app/clubs/clubs.module#ClubsModule' },
    { path: 'sports', loadChildren: 'app/sports/sports.module#SportsModule' },
    { path: 'teams', loadChildren: 'app/teams/teams.module#TeamsModule' },
    { path: 'coach', loadChildren: 'app/coach/coach.module#CoachModule' },
    { path: 'groups', loadChildren: 'app/groups/groups.module#GroupsModule' },
    {
      path: 'athletes',
      loadChildren: 'app/athletes/athletes.module#AthletesModule'
    },
    { path: 'parent', loadChildren: 'app/parent/parent.module#ParentModule' },
    {
      path: 'recruiter',
      loadChildren: 'app/recruiter/recruiter.module#RecruiterModule'
    },
    {
      path: 'training',
      loadChildren: 'app/training/training.module#TrainingModule'
    },
    {
      path: 'training_assign',
      loadChildren:
        'app/training-assign/training-assign.module#TrainingAssignModule'
    },
    {
      path: 'resources',
      loadChildren: 'app/resource/resource.module#ResourceModule'
    },
    { path: 'review', loadChildren: 'app/review/review.module#ReviewModule' },
    {
      path: 'leaderboard',
      loadChildren: 'app/leaderboard/leaderboard.module#LeaderboardModule'
    },
    { path: 'events', loadChildren: 'app/events/events.module#EventsModule' },
    { path: 'event', loadChildren: 'app/events/events.module#EventsModule' },
    { path: 'estore', loadChildren: 'app/estore/estore.module#EStoreModule' },
    {
      path: 'brand',
      loadChildren: 'app/estore-brand/brand.module#BrandModule'
    },
    {
      path: 'category',
      loadChildren: 'app/estore-categories/category.module#CategoryModule'
    },
    {
      path: 'products',
      loadChildren: 'app/estore-products/products.module#ProductsModule'
    },
    {
      path: 'transaction',
      loadChildren:
        'app/estore-transaction/transaction.module#TransactionModule'
    },
    {
      path: 'order',
      loadChildren: 'app/estore-orders/orders.module#OrdersModule'
    },
    {
      path: 'seasons',
      loadChildren: 'app/seasons/seasons.module#SeasonsModule'
    },
    {
      path: 'offlinePayment',
      loadChildren:
        'app/offline-payment/offlinePayment.module#OfflinePaymentModule'
    },
    { path: 'feeds', loadChildren: 'app/feeds/feeds.module#FeedsModule' },
    {
      path: 'packages',
      loadChildren: 'app/packages/packages.module#PackagesModule'
    },
    {
      path: 'profile',
      loadChildren: 'app/profile/profile.module#ProfileModule'
    },
    {
      path: 'reports',
      loadChildren: 'app/reports/reports.module#ReportsModule'
    },
    { path: 'mail', loadChildren: '@app/mail/mail.module#MailModule' }
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
