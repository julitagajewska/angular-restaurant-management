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

  private _orders!: Order[];
  private _filteredOrders!: Order[];
  private _displayedOrders!: Order[];

  private _ordersSubscription!: Subscription;
  private _showAllToggle: boolean = true;

  constructor(private ordersService: OrdersService) {
  }

  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
  }

  ngOnInit(): void {

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

  showAll(): void {
    this.displayedOrders = this.orders;
    this.showAllToggle = !this.showAllToggle;
  }

  showWaiting(): void {
    this.ordersService.getWaiting();
    this.displayedOrders = this.filteredOrders;
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

  public get filteredOrders(): Order[] {
    return this._filteredOrders;
  }
  public set filteredOrders(value: Order[]) {
    this._filteredOrders = value;
  }

  public get displayedOrders(): Order[] {
    return this._displayedOrders;
  }
  public set displayedOrders(value: Order[]) {
    this._displayedOrders = value;
  }
}
