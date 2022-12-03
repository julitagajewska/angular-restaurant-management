import { Component, Input, OnInit } from '@angular/core';
import { OrderedProduct } from 'src/app/Models/ordered-product';
import { Product } from 'src/app/Models/product';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input('productParentData') product!: Product;
  private _buttonDisabled: boolean = false;

  constructor(private ordersService: OrdersService) {
    this.ordersService.buttonTogglesChange.subscribe(response => {
      this.buttonDisabled = this.ordersService.buttonToggles[+this.product.productId];
    });
  }

  ngOnInit(): void {
    this.ordersService.buttonToggles[+this.product.productId] = false;
  }

  addProduct(): void {
    let newProduct = new OrderedProduct(this.product, 1)
    this.ordersService.addProduct(newProduct);
    this.ordersService.buttonToggles[+this.product.productId] = true;
  }

  public get buttonDisabled(): boolean {
    return this._buttonDisabled;
  }
  public set buttonDisabled(value: boolean) {
    this._buttonDisabled = value;
  }


}
