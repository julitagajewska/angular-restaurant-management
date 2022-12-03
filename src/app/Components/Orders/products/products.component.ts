import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Categories } from 'src/app/Models/categories';
import { OrderType } from 'src/app/Models/order';
import { Product, ProductType } from 'src/app/Models/product';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private _categories!: string[];
  private _products!: Product[];
  allProducts!: Product[];

  private _filteredProducts!: Product[];
  private _filterText!: string;
  private _searchForm!: FormGroup;
  private _productFilter: FormControl = new FormControl();

  private _displayAllToggle: boolean = true;
  private _displayEntreesToggle: boolean = false;
  private _displayMainsToggle: boolean = false;
  private _displayDessertsToggle: boolean = false;
  private _displayBeveragesToggle: boolean = false;

  private _productType: string = 'all';
  private _productTypeChange: Subject<Product[]> = new Subject<Product[]>();

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
      console.log(this.products);
    })
  }

  displayEntrees(): void {
    this.toggleOff();
    this.displayEntreesToggle = true;
    this.productTypeChange.next(this.ordersService.getEtrees());
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

  // ---- Getters and setters ---- //

  public get categories(): string[] {
    return this._categories;
  }
  public set categories(value: string[]) {
    this._categories = value;
  }
  public get products(): Product[] {
    return this._products;
  }
  public set products(value: Product[]) {
    this._products = value;
  }
  public get filteredProducts(): Product[] {
    return this._filteredProducts;
  }
  public set filteredProducts(value: Product[]) {
    this._filteredProducts = value;
  }
  public get filterText(): string {
    return this._filterText;
  }
  public set filterText(value: string) {
    this._filterText = value;
  }
  public get searchForm(): FormGroup {
    return this._searchForm;
  }
  public set searchForm(value: FormGroup) {
    this._searchForm = value;
  }
  public get productFilter(): FormControl {
    return this._productFilter;
  }
  public set productFilter(value: FormControl) {
    this._productFilter = value;
  }
  public get displayAllToggle(): boolean {
    return this._displayAllToggle;
  }
  public set displayAllToggle(value: boolean) {
    this._displayAllToggle = value;
  }
  public get displayEntreesToggle(): boolean {
    return this._displayEntreesToggle;
  }
  public set displayEntreesToggle(value: boolean) {
    this._displayEntreesToggle = value;
  }
  public get displayMainsToggle(): boolean {
    return this._displayMainsToggle;
  }
  public set displayMainsToggle(value: boolean) {
    this._displayMainsToggle = value;
  }
  public get displayDessertsToggle(): boolean {
    return this._displayDessertsToggle;
  }
  public set displayDessertsToggle(value: boolean) {
    this._displayDessertsToggle = value;
  }

  public get displayBeveragesToggle(): boolean {
    return this._displayBeveragesToggle;
  }
  public set displayBeveragesToggle(value: boolean) {
    this._displayBeveragesToggle = value;
  }
  public get productType(): string {
    return this._productType;
  }
  public set productType(value: string) {
    this._productType = value;
  }
  public get productTypeChange(): Subject<Product[]> {
    return this._productTypeChange;
  }
  public set productTypeChange(value: Subject<Product[]>) {
    this._productTypeChange = value;
  }
}
