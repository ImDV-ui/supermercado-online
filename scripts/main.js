import { ProductCategory } from "./classes/porductCategory.js";
import { ProductDatabase } from "./database/productDatabase.js";

const categories = ProductDatabase.getData();

let categorySample = new ProductCategory("Carne");
categorySample.render();