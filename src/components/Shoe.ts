export class Item {
  brand: string;
  upc: string;
  constructor(brand: string, upc: string) {
    this.brand = brand;
    this.upc = upc;
  }
}

export class Shoe extends Item {
  style: string;
  size: number;
  constructor(style: string, size: number, brand: string, upc: string) {
    super(brand, upc)
    this.style = style;
    this.size = size;
  }
}