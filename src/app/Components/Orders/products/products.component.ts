import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Product, ProductType } from 'src/app/Models/product';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  categories!: string[];
  products!: Product[];
  allProducts!: Product[];

  filteredProducts!: Product[];
  filterText!: string;
  searchForm!: FormGroup;
  productFilter: FormControl = new FormControl();

  displayAllToggle: boolean = true;
  displayEntreesToggle: boolean = false;
  displayMainsToggle: boolean = false;
  displayDessertsToggle: boolean = false;
  displayBeveragesToggle: boolean = false;

  productType: string = 'all';
  productTypeChange: Subject<Product[]> = new Subject<Product[]>();

  constructor(private ordersService: OrdersService) {

    this.productFilter.valueChanges.subscribe({
      next: val => { this.filterText = val; },
      error: error => console.error(error)
    });

    this.productTypeChange.subscribe((value) =>{
      this.products = value;
    });

  }

  ngOnInit(): void {
    this.getProducts();
    this.categories = this.ordersService.getCategoriesValues();
    this.filteredProducts = this.products;
  }

  getProducts(): void {
    this.ordersService.getAllProducts().subscribe(response => {
      this.products = response;
      this.allProducts = response;
    })
  }

  displayEntrees(): void {
    this.toggleOff();
    this.displayEntreesToggle = true;
    this.productTypeChange.next(this.ordersService.getEntrees());
  }

  displayMains(): void {
    this.toggleOff();
    this.displayMainsToggle = true;
    this.productTypeChange.next(this.ordersService.getMains());
  }

  displayDeserts(): void {
    this.toggleOff();
    this.displayDessertsToggle = true;
    this.productTypeChange.next(this.ordersService.getDesserts());
  }
  displayBeverages(): void {
    this.toggleOff();
    this.displayBeveragesToggle = true;
    this.productTypeChange.next(this.ordersService.getBeverages());
  }

  displayAll(): void {
    this.toggleOff();
    this.displayAllToggle = true;
    this.productTypeChange.next(this.allProducts);
  }

  toggleOff(): void {
    this.displayAllToggle = false;
    this.displayEntreesToggle = false;
    this.displayMainsToggle = false;
    this.displayDessertsToggle = false;
    this.displayBeveragesToggle = false;
  }
}
