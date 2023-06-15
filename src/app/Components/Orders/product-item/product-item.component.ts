import { Component, Input, OnInit } from '@angular/core';
import { arrowRightShort } from 'ngx-bootstrap-icons';
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
  buttonDisabled!: boolean;

  constructor(private ordersService: OrdersService) {
    this.ordersService.buttonTogglesChange.subscribe(response => {
      this.buttonDisabled = response[+this.product.productId];
      console.log(response[+this.product.productId])
    });
  }

  ngOnInit(): void {
    this.buttonDisabled = this.ordersService.buttonToggles[+this.product.productId];
  }

  addProduct(): void {
    let newProduct = new OrderedProduct(this.product, 1)
    this.ordersService.addProduct(newProduct);

    this.ordersService.toggleButton(this.product.productId, true);
  }
}
