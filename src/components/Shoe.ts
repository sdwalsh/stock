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
  size: number;

  constructor(brand: string, upc: string, style: string, size: number) {
    this.brand = brand;
    this.upc = upc;
    this.style = style;
    this.size = size;
  }
}