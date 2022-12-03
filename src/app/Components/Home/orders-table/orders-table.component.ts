import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/Models/order';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit, OnDestroy {

  private _orders!: Order[];
  private _ordersSubscription!: Subscription;
  private _showAllToggle: boolean = true;

  constructor(private ordersService: OrdersService) {
    this.ordersService.getAllOrders().subscribe(response => {
      this.orders = response;
    });

    this.ordersSubscription = this.ordersService.ordersChange.subscribe(response => {
      this.orders = response;
    })
  }

  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  showAll(): void {
    this.showAllToggle = !this.showAllToggle;
  }

  public get orders(): Order[] {
    return this._orders;
  }
  public set orders(value: Order[]) {
    this._orders = value;
  }

  public get ordersSubscription(): Subscription {
    return this._ordersSubscription;
  }
  public set ordersSubscription(value: Subscription) {
    this._ordersSubscription = value;
  }

  public get showAllToggle(): boolean {
    return this._showAllToggle;
  }
  public set showAllToggle(value: boolean) {
    this._showAllToggle = value;
  }

}
