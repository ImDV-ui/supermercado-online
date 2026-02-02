import { Product } from "./product.js";

export class ProductCategory
{
    constructor(name, products)
    {
        this.name = name;
        this.products = products;
    }
}