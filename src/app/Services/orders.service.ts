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

  products!: Product[];

  orders!: Order[];
  ordersChange: Subject<Order[]> = new Subject<Order[]>();

  waiting!: Order[];
  waitingChange: Subject<Order[]> = new Subject<Order[]>();

  newOrder: Order = new Order('', [], '', 0);

  newOrderProductsArray: OrderedProduct[] = [];
  newOrderProductsArrayDataChange: Subject<OrderedProduct[]> = new Subject<OrderedProduct[]>();

  productsBackUp!: OrderedProduct[];
  totalBackUp!: number;
  togglesBackUp!: boolean[];

  totalPrice: number = 0;
  totalPriceChange: Subject<number> = new Subject<number>();

  buttonToggles: boolean[] = [];
  buttonTogglesChange: Subject<boolean[]> = new Subject<boolean[]>();

  editMode: boolean = false;
  editModeChange: Subject<boolean> = new Subject<boolean>();

  editOrderId!: string;

  constructor(private http: HttpClient) {

    this.getAllOrders().subscribe(response => {
      this.orders = response;
    })

    this.getAllProducts().subscribe(response => {
      this.products = response;
    })

    this.totalPriceChange.subscribe((value) => {
      this.totalPrice = +value.toFixed(2);
    });

    this.buttonTogglesChange.subscribe((value) => {
      this.buttonToggles = value;
    });

    this.newOrderProductsArrayDataChange.subscribe((value) => {
      this.newOrderProductsArray = value;
    })

    this.ordersChange.subscribe((value) => {
      this.orders = value;
    });

    this.editModeChange.subscribe((value) => {
      this.editMode = value;
    });

    this.waitingChange.subscribe((value) => {
      this.waiting = value;
    })
  }

  // -------- Orders ------- //

  changeWaiting(orders: Order[]): void {
    this.waitingChange.next(orders);
  }

  toggleEditMode(display: boolean): void {
    this.editModeChange.next(display);
  }

  loadToEdit(order: Order): void {
    this.productsBackUp = this.newOrderProductsArray;
    this.totalBackUp = this.totalPrice;
    this.togglesBackUp = this.buttonToggles;

    let productsToEdit: OrderedProduct[] = order.products;

    let productsArray: Product[] = [];
    productsToEdit.forEach(orderedProduct => {
      productsArray.push(orderedProduct.product);
    })

    let editToggles: boolean[] = [];
    this.products.forEach(product => {
      editToggles[+product.productId] = false;
    });

    productsArray.forEach(product => {
      editToggles[+product.productId] = true;
    })

    this.editOrderId = order.orderId;

    this.orderArrayChange(productsToEdit);
    this.sumChange(order.total);
    this.changeButtonToggles(editToggles);
  }

  loadPrevious(): void {
    this.orderArrayChange(this.productsBackUp);
    this.sumChange(this.totalBackUp);
    this.changeButtonToggles(this.togglesBackUp);
    this.toggleEditMode(false);
  }

  saveEdit(): void {

    let order!: Order;

    this.orders.forEach(element => {
      if(element.orderId == this.editOrderId){
        order = element;
      }
    });

    let newOrdersArray: Order[] = this.orders;

    newOrdersArray[newOrdersArray.findIndex(v =>
      v.orderId === order.orderId)].products = this.newOrderProductsArray;

    newOrdersArray[newOrdersArray.findIndex(v =>
      v.orderId === order.orderId)].total = this.totalPrice;

    let orderedProducts: OrderedProductType[] = this.convertToOrderProductType(order.products);

    let orderType: OrderType;
    orderType = {
      orderId: order.orderId,
      products: orderedProducts,
      status: order.status,
      total: this.totalPrice
    };

    this.editOrder(orderType).subscribe(response => {
      this.changeOrders(newOrdersArray);
      this.loadPrevious();
    });

  }

  changeStatus(order: Order, status: string): void {

    let newOrdersArray: Order[] = this.orders;

    newOrdersArray[newOrdersArray.findIndex(v =>
      v.orderId === order.orderId)].status = status;

    order.status = status;

    let inputProductsArray: OrderedProduct[] = order.products;
    let orderedProducts: OrderedProductType[] = this.convertToOrderProductType(inputProductsArray);

    let orderType: OrderType = {
      orderId: order.orderId,
      products: orderedProducts,
      status: status,
      total: order.total
    }

    this.editOrder(orderType).subscribe(response => {
      this.changeOrders(newOrdersArray);
    });
  }

  changeOrders(orders: Order[]): void{
    this.ordersChange.next(orders);
  }

  resetOrder(): void {

    let newToggles: boolean[] = this.buttonToggles;
    for(let i: number = 0; i<newToggles.length; i++){
      newToggles[i] = false;
    }

    this.changeButtonToggles(newToggles);
    this.sumChange(0);
    this.orderArrayChange([]);
  }

  convertToOrderProductType(ordered: OrderedProduct[]): OrderedProductType[] {
    let orderedProducts: OrderedProductType[] = [];
    ordered.forEach(orderedProduct => {

      let newProductType: ProductType = {
        productId: orderedProduct.product.productId,
        productName: orderedProduct.product.productName,
        productPrice: orderedProduct.product.productPrice,
        productImage: orderedProduct.product.productImage,
        productCategory: orderedProduct.product.productCategory
      }

      let newOrderedProduct: OrderedProductType = {
        product: newProductType,
        quantity: orderedProduct.quantity
      }

      orderedProducts.push(newOrderedProduct);
    });

    return orderedProducts;
  }

  saveOrder(): void {

    let orderedProducts: OrderedProductType[] = this.convertToOrderProductType(this.newOrderProductsArray);

    let newOrderType: OrderType;
    newOrderType = {
      orderId: this.getNewId(),
      products: orderedProducts,
      status: Statuses.proccessing,
      total: this.totalPrice
    };

    let newOrder: Order = new Order(
      newOrderType.orderId,
      this.newOrderProductsArray,
      newOrderType.status,
      newOrderType.total
    );

    this.addOrder(newOrderType).subscribe(response => {

      let newOrdersArray: Order[] = this.orders;
      newOrdersArray.push(newOrder);
      this.changeOrders(newOrdersArray);

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

  toggleButton(id: string, value: boolean): void {
    let toggles: boolean[] = this.buttonToggles;
    toggles[+id] = value;

    this.changeButtonToggles(toggles);
  }

  changeButtonToggles(toggles: boolean[]): void {
    this.buttonTogglesChange.next(toggles);
  }

  sumChange(sum: number): void{
    this.totalPriceChange.next(sum);
  }

  increase(product: OrderedProduct): void {
    this.newOrderProductsArray[this.newOrderProductsArray.findIndex((element) => {
      return element.product.productId === product.product.productId
    })].quantity++;
    this.sumChange(+(this.totalPrice + product.product.productPrice).toFixed(2));
  }

  decrease(product: OrderedProduct): void {
    this.newOrderProductsArray[this.newOrderProductsArray.findIndex((element) => {
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

    let newOrdersArray: Order[] = [];

    let url: string = "http://localhost:7777/orders";
    let response: Observable<Order[]> = this.http.get<Order[]>(url)
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

      let newOrder: Order = new Order(
        order.orderId,
        orderedProducts,
        order.status,
        order.total
      );

      newOrdersArray.push(newOrder);
      return newOrder;
    })),
    catchError(this.handleError<Order[]>('GET: all products')));

    this.changeOrders(newOrdersArray);
    return response;
  }

  addOrder(order: OrderType): Observable<OrderType> {
    let url: string = `http://localhost:7777/orders/${order.orderId}`;
    return this.http.post<Order>(url, order).pipe(
      tap((newOrder: OrderType) => this.log(`added order w/ id=${order.orderId}`)),
      catchError(this.handleError<OrderType>('add order'))
    );
  }

  deleteOrder(order: Order): Observable<void> {

    const url: string = `http://localhost:7777/orders/${order.orderId}`;
    let response: Observable<void> = this.http.delete<void>(url).pipe(
      tap(_ => {
        this.log(`Order deleted`);

        let newOrdersArray: Order[] = this.orders;

        newOrdersArray.splice(newOrdersArray.findIndex(v =>
          v.orderId === order.orderId), 1);

        this.changeOrders(newOrdersArray);
      }),
      catchError(this.handleError<any>('DELETE order'))
    );


    return response;
  }

  editOrder(order: OrderType): Observable<OrderType> {
    const url:string = `http://localhost:7777/orders/${order.orderId}`;
    return this.http.put<Order>(url, order).pipe(
      tap((newReservation: OrderType) => this.log(`edited user w/ id=${order.orderId}`)),
      catchError(this.handleError<OrderType>('editReservation'))
    );
  }

  // ------- Orders filtering ------- //

  getWaiting(): void {
    this.changeWaiting(this.orders.filter((order) => {
      return order.status == Statuses.proccessing || order.status == Statuses.ready;
    }));
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
}
