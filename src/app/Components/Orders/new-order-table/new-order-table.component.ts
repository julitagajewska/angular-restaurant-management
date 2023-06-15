import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderedProduct } from 'src/app/Models/ordered-product';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-new-order-table',
  templateUrl: './new-order-table.component.html',
  styleUrls: ['./new-order-table.component.css']
})
export class NewOrderTableComponent implements OnInit, OnDestroy {

  products: OrderedProduct[] = [];
  productsSubscription!: Subscription;

  constructor(private ordersService: OrdersService) {
    this.products = this.ordersService.newOrderProductsArray;
    this.productsSubscription = this.ordersService.newOrderProductsArrayDataChange.subscribe(response => {
      this.products = response;
    });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  ngOnInit(): void {

  }

}
