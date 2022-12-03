import { Product, ProductType } from "./product";

export type OrderedProductType = {
  product: ProductType,
  quantity: number,
}

export class OrderedProduct {

  constructor(
    private _product: Product,
    private _quantity: number,
  ){}

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
