import { OrderedProduct } from "./ordered-product";

export type OrderType = {
  orderId: string,
  products: OrderedProduct[],
  status: string,
  total: number,
  takeout: boolean
}

export class Order {
  constructor(
    private _orderId: string,
    private _products: OrderedProduct[],
    private _status: string,
    private _total: number,
    private _takeout: boolean
  ){}

  public get total(): number {
    return this._total;
  }
  public set total(value: number) {
    this._total = value;
  }
  public get status(): string {
    return this._status;
  }
  public set status(value: string) {
    this._status = value;
  }
  public get products(): OrderedProduct[] {
    return this._products;
  }
  public set products(value: OrderedProduct[]) {
    this._products = value;
  }
  public get orderId(): string {
    return this._orderId;
  }
  public set orderId(value: string) {
    this._orderId = value;
  }
  public get takeout(): boolean {
    return this._takeout;
  }
  public set takeout(value: boolean) {
    this._takeout = value;
  }
}




