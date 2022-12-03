import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Categories } from '../Models/categories';
import { Product, ProductType } from '../Models/product';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  private _products!: Product[];
  private _url: string = "http://localhost:7777/products";

  constructor(private http: HttpClient) {

  }

  getCategoriesKeys(): string[]{
    const keys: string[] = Object.keys(Categories);
    return keys;
  }

  getCategoriesValues(): string[]{
    const values: string[] = Object.values(Categories);
    return values;
  }

  getAllProducts(): Observable<Product[]> {
    this.products = [];
    return this.http.get<Product[]>(this.url)
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
    catchError(this.handleError<Product[]>('addUser')));
  }

  getEtrees(): Product[] {
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

}
