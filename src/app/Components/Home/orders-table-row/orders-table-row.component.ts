import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/Models/order';
import { Statuses } from 'src/app/Models/status';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-orders-table-row',
  templateUrl: './orders-table-row.component.html',
  styleUrls: ['./orders-table-row.component.css']
})
export class OrdersTableRowComponent implements OnInit {

  @Input('orderParentData') order!: Order;

  private _detailsToggle: boolean = false;
  private _toggleStatusChange: boolean = false;
  private _orderOverview: string = '';

  constructor(private ordersService: OrdersService, private router: Router) { }

  ngOnInit(): void {
    this.generateOverview();
  }

  generateOverview(): void {

    let overview: string = '';
    this.order.products.forEach(element => {

      if(this.order.products.length == 1 || this.order.products.indexOf(element) == this.order.products.length-1){
        overview = overview + `${element.product.productName} x${element.quantity}`;
      } else {
        overview = overview + `${element.product.productName} x${element.quantity}, `;
      }
    });

    if(overview.length >= 50){
      overview = overview.slice(0,48);
      overview = overview + '...';
    }

    this.orderOverview = overview;
  }

  showDetails(): void {
    this.detailsToggle = !this.detailsToggle;
  }

  deleteOrder():void {
    this.ordersService.deleteOrder(this.order).subscribe(response => {
      console.log("Order deleted");
    });
  }

  changeStatus(status: string) {
    this.ordersService.changeStatus(this.order, status);
    this.ordersService.getWaiting();
    this.toggleChange();
  }

  toggleChange(): void {
    this.toggleStatusChange = !this.toggleStatusChange;
  }

  edit(): void {
    let editModeToggle: boolean = true;
    this.ordersService.loadToEdit(this.order);
    this.ordersService.toggleEditMode(editModeToggle);
    this.router.navigateByUrl('orders');
  }

  public get detailsToggle(): boolean {
    return this._detailsToggle;
  }
  public set detailsToggle(value: boolean) {
    this._detailsToggle = value;
  }

  public get toggleStatusChange(): boolean {
    return this._toggleStatusChange;
  }
  public set toggleStatusChange(value: boolean) {
    this._toggleStatusChange = value;
  }

  public get orderOverview(): string {
    return this._orderOverview;
  }
  public set orderOverview(value: string) {
    this._orderOverview = value;
  }
}
