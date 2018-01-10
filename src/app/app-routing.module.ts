import { EditProfileComponent } from './components/user/editProfile/edit-profile.component';
import { DeleteAdComponent } from './components/user/allAds/delete-ad.component';
import { AllAdsComponent } from './components/user/allAds/all-ads.component';
import { AuthGuard } from './core/guards/authentication/auth.guard';
import { AdvertisementDetailsComponent } from './components/estates/rentals/advertisement-details/advertisement-details.component';
import { MainMapComponent } from './components/estates/main-map/main-map.component';
import { CreateRentalFormComponent } from './components/estates/rentals/create-rental-form/create-rental-form.component';
import { LogoutComponent } from './components/authentication/logout-component/logout.component';
import { LoginFormComponent } from './components/authentication/login-form/login-form.component';
import { RegisterFormComponent } from './components/authentication/register-form/register-form.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterFormComponent},
  { path: 'login', component: LoginFormComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'addRental',  canActivate: [ AuthGuard ], component: CreateRentalFormComponent},
  { path: 'map', component: MainMapComponent},
  { path: 'adDetail/:id', component: AdvertisementDetailsComponent},
  { path: 'allAds', component: AllAdsComponent},
  { path: 'deleteAd/:id', component: DeleteAdComponent},
  { path: 'editProfile', component: EditProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
