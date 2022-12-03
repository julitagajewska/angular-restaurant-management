import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categories } from 'src/app/Models/categories';
import { Order, OrderType } from 'src/app/Models/order';
import { OrderedProduct } from 'src/app/Models/ordered-product';
import { Product } from 'src/app/Models/product';
import { Statuses } from 'src/app/Models/status';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  sumChangeSubscription!: Subscription;
  private _saveConfirm: boolean = false;

  private _total: number = 0;
  constructor(
    private ordersService: OrdersService
  ) {
    this.sumChangeSubscription = this.ordersService.totalPriceChange.subscribe(response => {
      this.total = response;
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    this.ordersService.saveOrder();
    this.saveConfirm = true;
  }

  reset():void {
    this.ordersService.resetOrder();
  }

  clickedOutside(): void {
    this.saveConfirm = false;
    console.log("Clicked outisde");
  }

  public get total(): number {
    return this._total;
  }

  public set total(value: number) {
    this._total = value;
  }

  public get saveConfirm(): boolean {
    return this._saveConfirm;
  }
  public set saveConfirm(value: boolean) {
    this._saveConfirm = value;
  }

}
