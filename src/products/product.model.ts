export class Product {
  constructor(
    readonly id: string,
    public title: string,
    public description: string,
    public price: number,
  ) {}
}
