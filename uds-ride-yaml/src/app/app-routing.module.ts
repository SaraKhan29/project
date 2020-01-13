// import { NgModule } from '@angular/core';
// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//
// const routes: Routes = [
//   { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' }
// ];
// @NgModule({
//   imports:
//     [
//       RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
//     ],
//   exports:
//     [
//       RouterModule
//     ]
// })
// export class AppRoutingModule {}


import { DataResolverService } from './resolver/data-resolver.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'email-verification',
    loadChildren: () => import('./email-verification/email-verification.module').then( m => m.EmailVerificationPageModule)
  },
  // {
  //   path: 'search-ride',
  //   loadChildren: () => import('./search-ride/search-ride.module').then( m => m.SearchRidePageModule)
  // },
  // {
  //   path: 'my-rides',
  //   loadChildren: () => import('./my-rides/my-rides.module').then( m => m.MyRidesPageModule)
  // },
  // {
  //   path: 'bottom-nav',
  //   loadChildren: () => import('./bottom-nav/bottom-nav.module').then( m => m.BottomNavPageModule)
  // },
  // {
  //   path: 'tabs',
  //   loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  // },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  {
    path: 'search-results',
    loadChildren: () => import('./search-results/search-results.module').then( m => m.SearchResultsPageModule)
  },
  {
    path: 'tabs/tab2/search-results/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: () => import('./search-results/search-results.module').then( m => m.SearchResultsPageModule)
  },
  {
    path: 'search-results-details',
    loadChildren: () => import('./search-results-details/search-results-details.module').then( m => m.SearchResultsDetailsPageModule)
  },
  {
    path: 'search-results-details/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: () => import('./search-results-details/search-results-details.module').then( m => m.SearchResultsDetailsPageModule)
  },
  {
    path: 'account-verification',
    loadChildren: () => import('./account-verification/account-verification.module').then( m => m.AccountVerificationPageModule)
  },
  {
    path: 'my-rides-success',
    loadChildren: () => import('./my-rides-success/my-rides-success.module').then( m => m.MyRidesSuccessPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'edit-car',
    loadChildren: () => import('./edit-car/edit-car.module').then( m => m.EditCarPageModule)
  },
  {
    path: 'create-ride',
    loadChildren: () => import('./create-ride/create-ride.module').then( m => m.CreateRidePageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'edit-ride',
    loadChildren: () => import('./edit-ride/edit-ride.module').then( m => m.EditRidePageModule)
  },
  {
    path: 'offer-ride-details',
    loadChildren: () => import('./offer-ride-details/offer-ride-details.module').then( m => m.OfferRideDetailsPageModule)
  },

  {
    path: 'ride-with-details',
    loadChildren: () => import('./ride-with-details/ride-with-details.module').then( m => m.RideWithDetailsPageModule)
  }
  // {
  //   path: 'tab1',
  //   loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  // },
  // {
  //   path: 'tab2',
  //   loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  // },
  // {
  //   path: 'tab3',
  //   loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
