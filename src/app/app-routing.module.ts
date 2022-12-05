import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './Components/General/access-denied/access-denied.component';
import { AlreadyLoggedInComponent } from './Components/General/already-logged-in/already-logged-in.component';
import { LoginComponent } from './Components/General/login/login.component';
import { NotFoundComponent } from './Components/General/not-found/not-found.component';
import { RegisterComponent } from './Components/General/register/register.component';
import { WelcomeComponent } from './Components/General/welcome/welcome.component';
import { HomeComponent } from './Components/Home/home/home.component';
import { OrdersComponent } from './Components/Orders/orders/orders.component';
import { ReservationEditComponent } from './Components/Reservations/reservation-edit/reservation-edit.component';
import { ReservationsComponent } from './Components/Reservations/reservations/reservations.component';
import { ProfileChangePasswordComponent } from './Components/User-profile/profile-change-password/profile-change-password.component';
import { ProfileDeleteSuccessComponent } from './Components/User-profile/profile-delete-success/profile-delete-success.component';
import { ProfileComponent } from './Components/User-profile/profile/profile.component';
import { AlreadyLoggedInGuard } from './Guards/already-logged-in.guard';
import { LoggedInGuard } from './Guards/logged-in.guard';

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "access_denied", component: AccessDeniedComponent },
  { path: "home", component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: "reservations", component: ReservationsComponent, canActivate: [LoggedInGuard] },
  { path: "reservations/edit/:id", component: ReservationEditComponent },
  { path: "orders", component: OrdersComponent, canActivate: [LoggedInGuard] },
  { path: "user_profile", component: ProfileComponent, canActivate: [LoggedInGuard] },


  { path: "login", component: LoginComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: "register", component: RegisterComponent, canActivate: [AlreadyLoggedInGuard] },

  { path: "password_change", component: ProfileChangePasswordComponent, canActivate: [LoggedInGuard] },
  { path: "delete_success", component: ProfileDeleteSuccessComponent, canActivate: [LoggedInGuard] },
  { path: "already_logged_in", component: AlreadyLoggedInComponent },
  { path: "welcome", component: WelcomeComponent },
  { path: "**", component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
