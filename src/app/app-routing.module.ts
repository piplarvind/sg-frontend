import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Route } from '@app/core';

const routes: Routes = [
  Route.withShell([
    { path: 'settings', loadChildren: () => import('app/settings/settings.module').then(m => m.SettingsModule) },
    {
      path: 'profiles',
      loadChildren: () => import('app/profiles/profiles.module').then(m => m.ProfilesModule)
    },
    {
      path: 'profile_type',
      loadChildren: () => import('app/profile-type/profile-type.module').then(m => m.ProfileTypeModule)
    },
    {
      path: 'email-templates',
      loadChildren: () => import('app/email-templates/email-templates.module').then(m => m.EmailTemplateModule)
    },
    { path: 'about', loadChildren: () => import('app/about/about.module').then(m => m.AboutModule) },
    { path: 'users', loadChildren: () => import('app/users/users.module').then(m => m.UsersModule) },
    { path: 'clubs', loadChildren: () => import('app/clubs/clubs.module').then(m => m.ClubsModule) },
    { path: 'club-profiles', loadChildren: () => import('app/club-profile/club-profile.module').then(m => m.ClubProfileModule) },
    { path: 'sports', loadChildren: () => import('app/sports/sports.module').then(m => m.SportsModule) },
    { path: 'fees-collection', loadChildren: () => import('app/fees-collection/fees-collection.module').then(m => m.FeesCollectionModule)},
    { path: 'teams', loadChildren: () => import('app/teams/teams.module').then(m => m.TeamsModule) },
    { path: 'coach', loadChildren: () => import('app/coach/coach.module').then(m => m.CoachModule) },
    { path: 'groups', loadChildren: () => import('app/groups/groups.module').then(m => m.GroupsModule) },
    {
      path: 'athletes',
      loadChildren: () => import('app/athletes/athletes.module').then(m => m.AthletesModule)
    },
    { path: 'parent', loadChildren: () => import('app/parent/parent.module').then(m => m.ParentModule) },
    { path: 'friends-family-fans', loadChildren: () => import('app/friends-family-fans/fff.module').then(m => m.FFFModule) },
    {
      path: 'recruiter',
      loadChildren: () => import('app/recruiter/recruiter.module').then(m => m.RecruiterModule)
    },
    {
      path: 'club-admins',
      loadChildren: () => import('app/club-admin/club-admin.module').then(m => m.ClubAdminModule)
    },
    {
      path: 'training',
      loadChildren: () => import('app/training/training.module').then(m => m.TrainingModule)
    },
    {
      path: 'training_assign',
      loadChildren:
        () => import('app/training-assign/training-assign.module').then(m => m.TrainingAssignModule)
    },
    {
      path: 'resources',
      loadChildren: () => import('app/resource/resource.module').then(m => m.ResourceModule)
    },
    { path: 'review', loadChildren: () => import('app/review/review.module').then(m => m.ReviewModule) },
    {
      path: 'leaderboard',
      loadChildren: () => import('app/leaderboard/leaderboard.module').then(m => m.LeaderboardModule)
    },
    { path: 'events', loadChildren: () => import('app/events/events.module').then(m => m.EventsModule) },
    { path: 'event', loadChildren: () => import('app/events/events.module').then(m => m.EventsModule) },
    { path: 'estore', loadChildren: () => import('app/estore/estore.module').then(m => m.EStoreModule) },
    {
      path: 'brand',
      loadChildren: () => import('app/estore-brand/brand.module').then(m => m.BrandModule)
    },
    {
      path: 'category',
      loadChildren: () => import('app/estore-categories/category.module').then(m => m.CategoryModule)
    },
    {
      path: 'products',
      loadChildren: () => import('app/estore-products/products.module').then(m => m.ProductsModule)
    },
    {
      path: 'transaction',
      loadChildren:
        () => import('app/estore-transaction/transaction.module').then(m => m.TransactionModule)
    },
    {
      path: 'order',
      loadChildren: () => import('app/estore-orders/orders.module').then(m => m.OrdersModule)
    },
    {
      path: 'seasons',
      loadChildren: () => import('app/seasons/seasons.module').then(m => m.SeasonsModule)
    },
    {
      path: 'offlinePayment',
      loadChildren:
        () => import('app/offline-payment/offlinePayment.module').then(m => m.OfflinePaymentModule)
    },
    { path: 'feeds', loadChildren: () => import('app/feeds/feeds.module').then(m => m.FeedsModule) },
    {
      path: 'packages',
      loadChildren: () => import('app/packages/packages.module').then(m => m.PackagesModule)
    },
    {
      path: 'profile',
      loadChildren: () => import('app/profile/profile.module').then(m => m.ProfileModule)
    },
    {
      path: 'reports',
      loadChildren: () => import('app/reports/reports.module').then(m => m.ReportsModule)
    },
    { path: 'mail', loadChildren: () => import('@app/mail/mail.module').then(m => m.MailModule) },
    {
      path: 'subscriptions',
      loadChildren: () => import('app/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule)
    },
    {
      path: 'cms-pages',
      loadChildren: () => import('app/cms-page/cms-page.module').then(m => m.CmsPageModule)
    },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
