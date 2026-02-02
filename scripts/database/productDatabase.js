import { ProductCategory } from "../classes/porductCategory";
import {Product} from "../classes/product.js";

export class ProductDatabase
{
    static getData() //Static hace nuestra funcion estática
    {
        let categories = [];
        
        let bakeryProducts = [];
        let bread = new Product("Pan");
        bakeryProducts.push(bread);

        let bakeryCategory = new ProductCategory("Panadería", bakeryProducts);

        categories.push(bakeryCategory);

        return categories;
    }
}