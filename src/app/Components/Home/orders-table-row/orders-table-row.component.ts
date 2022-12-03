import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
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
  }

  toggleChange(): void {
    this.toggleStatusChange = !this.toggleStatusChange;
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
}
