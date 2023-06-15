import { Component, OnDestroy, OnInit } from '@angular/core';
import { tree } from 'ngx-bootstrap-icons';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/Models/order';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit, OnDestroy {

  orders!: Order[];
  filteredOrders!: Order[];
  displayedOrders!: Order[];

  ordersSubscription!: Subscription;
  showAllToggle: boolean = true;

  constructor(private ordersService: OrdersService) {

    this.ordersService.getAllOrders().subscribe(response => {
      if(this.showAllToggle == true){
        this.orders = response;
      }

      if(this.displayedOrders == null) {
        this.displayedOrders = response;
      }

    });

    this.ordersSubscription = this.ordersService.ordersChange.subscribe(response => {
      this.orders = response;
    })

    this.ordersService.waitingChange.subscribe(response => {
      this.filteredOrders = response;
    });

  }

  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  showAll(): void {
    this.displayedOrders = this.orders;
    this.showAllToggle = !this.showAllToggle;
  }

  showWaiting(): void {
    this.ordersService.getWaiting();
    this.displayedOrders = this.filteredOrders;
    this.showAllToggle = !this.showAllToggle;
  }
}
