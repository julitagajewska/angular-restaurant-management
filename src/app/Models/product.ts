export type ProductType = {
  productId: string,
  productName: string,
  productPrice: number,
  productImage: string,
  productCategory: string
}

export class Product {

  constructor(
    private _productId: string,
    private _productName: string,
    private _productPrice: number,
    private _productImage: string,
    private _productCategory: string
  ){}

  public get productId(): string {
    return this._productId
  }
  public set productId(value: string) {
    this._productId = value
  }
  public get productName(): string {
    return this._productName
  }
  public set productName(value: string) {
    this._productName = value
  }
  public get productPrice(): number {
    return this._productPrice
  }
  public set productPrice(value: number) {
    this._productPrice = value
  }
  public get productImage(): string {
    return this._productImage
  }
  public set productImage(value: string) {
    this._productImage = value
  }
  public get productCategory(): string {
    return this._productCategory
  }
  public set productCategory(value: string) {
    this._productCategory = value
  }
}


