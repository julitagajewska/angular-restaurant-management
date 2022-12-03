import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { Categories } from '../Models/categories';
import { Order, OrderType } from '../Models/order';
import { OrderedProduct, OrderedProductType } from '../Models/ordered-product';
import { Product, ProductType } from '../Models/product';
import { Statuses } from '../Models/status';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  private _products!: Product[];
  private _orders!: Order[];

  private _newOrder: Order = new Order('', [], '', 0);

  private _newOrderProductsArray: OrderedProduct[] = [];
  private _newOrderProductsArrayDataChange: Subject<OrderedProduct[]> = new Subject<OrderedProduct[]>();

  private _totalPrice: number = 0;
  private _totalPriceChange: Subject<number> = new Subject<number>();

  private _url: string = "http://localhost:7777/products";

  private _buttonToggles: boolean[] = [];
  private _buttonTogglesChange: Subject<boolean[]> = new Subject<boolean[]>();


  constructor(private http: HttpClient) {

    this.totalPriceChange.subscribe((value) => {
      this._totalPrice = +value.toFixed(2);
    });

    this.buttonTogglesChange.subscribe((value) => {
      this.buttonToggles = value;
    });

    this.newOrderProductsArrayDataChange.subscribe((value) => {
      this.newOrderProductsArray = value;
    })
  }

  // -------- Orders ------- //

  resetOrder(): void {

    let newToggles: boolean[] = this.buttonToggles;
    for(let i: number = 0; i<newToggles.length; i++){
      newToggles[i] = false;
    }

    this.changeButtonToggles(newToggles);
    this.sumChange(0);
    this.orderArrayChange([]);
  }

  saveOrder(): void {

    let orderedProducts: OrderedProductType[] = [];
    this.newOrderProductsArray.forEach(orderedProduct => {

      let newProductType: ProductType = {
        productId: orderedProduct.product.productId,
        productName: orderedProduct.product.productName,
        productPrice: orderedProduct.product.productPrice,
        productImage: orderedProduct.product.productImage,
        productCategory: orderedProduct.product.productCategory
      }

      let newOrderedProduct = {
        product: newProductType,
        quantity: orderedProduct.quantity
      }

      orderedProducts.push(newOrderedProduct);

    });

    let newOrder: OrderType;
    newOrder = {
      orderId: this.getNewId(),
      products: orderedProducts,
      status: Statuses.proccessing,
      total: this.totalPrice
    };

    console.log("Nowe zamówienie przed zapisaniem");
    console.log(newOrder);

    this.addOrder(newOrder).subscribe(response => {
      this.resetOrder();
    })
  }

  getNewId(): string {
    let indexes: number[] = [];
    this.orders.forEach(order => {
      indexes.push(+order.orderId);
    });
    indexes.sort(function(a, b){return a-b});
    return (indexes[indexes.length-1]+1).toString();
  }

  // -------- Add/Remove Products --------- //

  changeButtonToggles(toggles: boolean[]): void {
    this.buttonTogglesChange.next(toggles);
  }

  sumChange(sum: number): void{
    this._totalPriceChange.next(sum);
  }

  increase(product: OrderedProduct): void {
    this._newOrderProductsArray[this.newOrderProductsArray.findIndex((element) => {
      return element.product.productId === product.product.productId
    })].quantity++;
    this.sumChange(+(this.totalPrice + product.product.productPrice).toFixed(2));
  }

  decrease(product: OrderedProduct): void {
    this._newOrderProductsArray[this.newOrderProductsArray.findIndex((element) => {
      return element.product.productId === product.product.productId
    })].quantity--;
    this.sumChange(+(this.totalPrice - product.product.productPrice).toFixed(2));
  }

  orderArrayChange(array: OrderedProduct[]): void {
    this.newOrderProductsArrayDataChange.next(array);
  }

  addProduct(orderedProduct: OrderedProduct): void {
    let newArray: OrderedProduct[] = this.newOrderProductsArray;

    newArray.push(orderedProduct);
    this.orderArrayChange(newArray);

    this.sumChange(this.totalPrice + orderedProduct.product.productPrice);

    let newToggles: boolean[] = this.buttonToggles;
    newToggles[+orderedProduct.product.productId] = true;
    this.changeButtonToggles(newToggles);
  }

  removeProduct(orderedProduct: OrderedProduct): void {

    let newArray: OrderedProduct[] = this.newOrderProductsArray;

    for(let i: number = 0; i < orderedProduct.quantity; i++){
      this.sumChange(this.totalPrice - orderedProduct.product.productPrice);
    }

    newArray.splice(newArray.findIndex(v =>
    v.product.productId === orderedProduct.product.productId), 1);

    this.orderArrayChange(newArray);

    let newToggles: boolean[] = this.buttonToggles;
    newToggles[+orderedProduct.product.productId] = false;
    this.changeButtonToggles(newToggles);
  }


  // -------- Categories -------- //

  getCategoriesValues(): string[]{
    const values: string[] = Object.values(Categories);
    return values;
  }

  // -------- HTTP ------- //

  getAllProducts(): Observable<Product[]> {
    this.products = [];
    let url: string = "http://localhost:7777/products";
    return this.http.get<Product[]>(url)
    .pipe(map((Products: Product[]) => Products.map(product => {
      this.log('GET: all products');
      let newProduct =  new Product(
        product.productId,
        product.productName,
        product.productPrice,
        product.productImage,
        product.productCategory
      );
      this.products.push(newProduct)
      return newProduct;
    })),
    catchError(this.handleError<Product[]>('GET: all products')));
  }

  getAllOrders(): Observable<Order[]> {
    this.orders = [];
    let url: string = "http://localhost:7777/orders";
    return this.http.get<Order[]>(url)
    .pipe(map((orders: Order[]) => orders.map(order => {

      let orderedProducts: OrderedProduct[] = [];
      let inputProductsArray = order.products;

      inputProductsArray.forEach(orderedProduct => {

        let newProduct: Product = new Product(
          orderedProduct.product.productId,
          orderedProduct.product.productName,
          orderedProduct.product.productPrice,
          orderedProduct.product.productImage,
          orderedProduct.product.productCategory
        );

        let newOrderedProduct: OrderedProduct = new OrderedProduct(
          newProduct,
          orderedProduct.quantity
        );

        orderedProducts.push(newOrderedProduct);
      })

      this.log('GET: all orders');
      let newOrder: Order = new Order(
        order.orderId,
        orderedProducts,
        order.status,
        order.total
      );
      this.orders.push(newOrder);
      console.log(newOrder);
      return newOrder;
    })),
    catchError(this.handleError<Order[]>('GET: all products')));
  }

  addOrder(order: OrderType): Observable<OrderType> {
    let url: string = `http://localhost:7777/orders/${order.orderId}`;
    return this.http.post<Order>(url, order).pipe(
      tap((newOrder: OrderType) => this.log(`added order w/ id=${order.orderId}`)),
      catchError(this.handleError<OrderType>('add order'))
    );
  }

  // ------- Products filtering --------- //

  getEntrees(): Product[] {
    return this.products.filter((product) => {
      return product.productCategory == Categories.entree;
    });
  }

  getMains(): Product[] {
    return this.products.filter((product) => {
      return product.productCategory == Categories.main;
    });
  }

  getDesserts(): Product[] {
    return this.products.filter((product) => {
      return product.productCategory == Categories.dessert;
    });
  }

  getBeverages(): Product[] {
    return this.products.filter((product) => {
      return product.productCategory == Categories.beverage;
    });
  }

  // ---- Error handling (?) ---- //
  log(message: string): void{
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // ---- Getters and setters ---- //

  public get products(): Product[] {
    return this._products;
  }
  public set products(value: Product[]) {
    this._products = value;
  }

  public get url(): string {
    return this._url;
  }
  public set url(value: string) {
    this._url = value;
  }

  public get newOrder(): Order {
    return this._newOrder;
  }
  public set newOrder(value: Order) {
    this._newOrder = value;
  }

  public get newOrderProductsArray(): OrderedProduct[] {
    return this._newOrderProductsArray;
  }
  public set newOrderProductsArray(value: OrderedProduct[]) {
    this._newOrderProductsArray = value;
  }

  public get newOrderProductsArrayDataChange(): Subject<OrderedProduct[]> {
    return this._newOrderProductsArrayDataChange;
  }
  public set newOrderProductsArrayDataChange(value: Subject<OrderedProduct[]>) {
    this._newOrderProductsArrayDataChange = value;
  }

  public get totalPrice(): number {
    return this._totalPrice;
  }
  public set totalPrice(value: number) {
    this._totalPrice = value;
  }

  public get totalPriceChange(): Subject<number> {
    return this._totalPriceChange;
  }
  public set totalPriceChange(value: Subject<number>) {
    this._totalPriceChange = value;
  }

  public get buttonToggles(): boolean[] {
    return this._buttonToggles;
  }
  public set buttonToggles(value: boolean[]) {
    this._buttonToggles = value;
  }

  public get buttonTogglesChange(): Subject<boolean[]> {
    return this._buttonTogglesChange;
  }
  public set buttonTogglesChange(value: Subject<boolean[]>) {
    this._buttonTogglesChange = value;
  }

  public get orders(): Order[] {
    return this._orders;
  }
  public set orders(value: Order[]) {
    this._orders = value;
  }
}
