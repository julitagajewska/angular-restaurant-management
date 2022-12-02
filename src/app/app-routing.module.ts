import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/General/login/login.component';
import { RegisterComponent } from './Components/General/register/register.component';
import { WelcomeComponent } from './Components/General/welcome/welcome.component';
import { HomeComponent } from './Components/Home/home/home.component';
import { OrdersComponent } from './Components/Orders/orders/orders.component';
import { ReservationEditComponent } from './Components/Reservations/reservation-edit/reservation-edit.component';
import { ReservationsComponent } from './Components/Reservations/reservations/reservations.component';
import { ProfileChangePasswordComponent } from './Components/User-profile/profile-change-password/profile-change-password.component';
import { ProfileDeleteSuccessComponent } from './Components/User-profile/profile-delete-success/profile-delete-success.component';
import { ProfileComponent } from './Components/User-profile/profile/profile.component';

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "home", component: HomeComponent },
  { path: "reservations", component: ReservationsComponent},
  { path: "reservations/edit/:id", component: ReservationEditComponent },
  { path: "orders", component: OrdersComponent },
  { path: "user_profile", component: ProfileComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "password_change", component: ProfileChangePasswordComponent },
  { path: "delete_success", component: ProfileDeleteSuccessComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
