import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class NewOrderComponent implements OnInit, OnDestroy {

  private sumChangeSubscription!: Subscription;
  private editModeChangeSubscription!: Subscription;

  private _saveConfirm: boolean = false;
  private _total: number = 0;
  private _editMode: boolean = false;
  private _editOrderId!: string;

  constructor(private ordersService: OrdersService, private router: Router) { }

  ngOnInit(): void {
    this.total = this.ordersService.totalPrice;
    this.editMode = this.ordersService.editMode;
    this.editOrderId = this.ordersService.editOrderId;

    this.sumChangeSubscription = this.ordersService.totalPriceChange.subscribe(response => {
      this.total = response;
    });

    this.editModeChangeSubscription = this.ordersService.editModeChange.subscribe(response =>{
      this.editMode = response;
    });
  }

  ngOnDestroy(): void {
    this.sumChangeSubscription.unsubscribe();
    this.editModeChangeSubscription.unsubscribe();
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

  cancel(): void {
    this.ordersService.loadPrevious();
  }

  saveEdit(): void {
    this.ordersService.saveEdit();
    this.router.navigateByUrl('home');
  }

  // -------- Getters/Setters ------- //

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

  public get editMode(): boolean {
    return this._editMode;
  }
  public set editMode(value: boolean) {
    this._editMode = value;
  }

  public get editOrderId(): string {
    return this._editOrderId;
  }
  public set editOrderId(value: string) {
    this._editOrderId = value;
  }

}
