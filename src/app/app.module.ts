import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/General/header/header.component';
import { ReservationsComponent } from './Components/Reservations/reservations/reservations.component';
import { ReservationsTableComponent } from './Components/Reservations/reservations-table/reservations-table.component';
import { ReservationsTableRowComponent } from './Components/Reservations/reservations-table-row/reservations-table-row.component';
import { ReservationsFormComponent } from './Components/Reservations/reservations-form/reservations-form.component';
import { NewOrderComponent } from './Components/Orders/new-order/new-order.component';
import { OrdersComponent } from './Components/Orders/orders/orders.component';
import { ProductsComponent } from './Components/Orders/products/products.component';
import { ProductItemComponent } from './Components/Orders/product-item/product-item.component';
import { HomeComponent } from './Components/Home/home/home.component';
import { LoginComponent } from './Components/General/login/login.component';
import { RegisterComponent } from './Components/General/register/register.component';
import { ProfileComponent } from './Components/User-profile/profile/profile.component';
import { ProfileDeleteComponent } from './Components/User-profile/profile-delete/profile-delete.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { allIcons } from 'ngx-bootstrap-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReservationEditComponent } from './Components/Reservations/reservation-edit/reservation-edit.component';
import { DatePipe } from '@angular/common';
import { ClickOutsideDirective } from './Directives/click-outside.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReservationsComponent,
    ReservationsTableComponent,
    ReservationsTableRowComponent,
    ReservationsFormComponent,
    NewOrderComponent,
    OrdersComponent,
    ProductsComponent,
    ProductItemComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileDeleteComponent,
    ReservationEditComponent,
    ClickOutsideDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxBootstrapIconsModule.pick(allIcons),
    BrowserAnimationsModule,
    ScrollingModule,
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }