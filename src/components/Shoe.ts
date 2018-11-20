export interface Item {
  brand: string;
  upc: string;
}

export class EmptyItem implements Item {
  brand: string;
  upc: string;

  constructor() {
    this.brand = '';
    this.upc = '';
  }
}

export class Shoe implements Item {
  brand: string;
  upc: string;
  style: string;
  size: string;

  constructor(brand: string, style: string, upc: string, size: string) {
    this.brand = brand;
    this.upc = upc;
    this.style = style;
    this.size = size;
  }
}