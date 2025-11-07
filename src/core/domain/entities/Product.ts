
export class Product {
  id: string | null;
  name: string;
  price: number;

  constructor(id: string | null, name: string, price: number) {
    if (!name || name.trim().length < 2) throw new Error("Name is required.")
    if (price <= 0) throw new Error("Invalid price.")

    this.id = id;
    this.name = name;
    this.price = price;
  }

}