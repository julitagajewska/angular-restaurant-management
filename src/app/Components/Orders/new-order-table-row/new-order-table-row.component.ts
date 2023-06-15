import { Component, Input, OnInit } from '@angular/core';
import { OrderedProduct } from 'src/app/Models/ordered-product';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-new-order-table-row',
  templateUrl: './new-order-table-row.component.html',
  styleUrls: ['./new-order-table-row.component.css']
})
export class NewOrderTableRowComponent implements OnInit {

  disableDecreaseButton: boolean = false;

  @Input('productParentData') product!: OrderedProduct;
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
  }

  increase(): void {
    this.ordersService.increase(this.product);
    if(this.product.quantity == 1) {
      this.disableDecreaseButton = false;
    }
  }

  decrease(): void {
    if(this.product.quantity > 0) {
      this.ordersService.decrease(this.product);
    }

    if(this.product.quantity == 0) {
      this.disableDecreaseButton = true;
    }
  }

  remove(): void {
    this.ordersService.removeProduct(this.product);
  }
}
