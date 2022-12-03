import { Product } from "./product";

export type OrderedProductType = {
  product: Product,
  quantity: number,
  sum: number
}

export class OrderedProduct {

  constructor(
    private _product: Product,
    private _quantity: number,
    private _sum: number
  ){}

  public get sum(): number {
    return this._sum;
  }
  public set sum(value: number) {
    this._sum = value;
  }
  public get quantity(): number {
    return this._quantity;
  }
  public set quantity(value: number) {
    this._quantity = value;
  }
  public get product(): Product {
    return this._product;
  }
  public set product(value: Product) {
    this._product = value;
  }
}
