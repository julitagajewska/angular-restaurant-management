import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Home/home/home.component';
import { OrdersComponent } from './Components/Orders/orders/orders.component';
import { ReservationsComponent } from './Components/Reservations/reservations/reservations.component';
import { ProfileComponent } from './Components/User-profile/profile/profile.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "reservations", component: ReservationsComponent },
  { path: "orders", component: OrdersComponent },
  { path: "user_profile", component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
