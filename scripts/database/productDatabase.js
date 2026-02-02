import { Product } from "../classes/product.js";
import { ProductCategory } from "../classes/productCategory.js";

export class ProductDatabase {
    static getData() {
        const categories = [];

        // Categoría: Cartas Sueltas
        const singleCards = [
            new Product("Charizard VMAX", 150, "Carta rara de Charizard", "Cartas", true),
            new Product("Pikachu Full Art", 45, "Edición especial coleccionista", "Cartas", false),
            new Product("Mewtwo GX", 80, "Poder psíquico legendario", "Cartas", true)
        ];
        categories.push(new ProductCategory("Cartas", singleCards));

        // Categoría: Accesorios
        const accessories = [
            new Product("Fundas Dragon Shield", 12, "100 fundas mate", "Accesorios", false),
            new Product("Tapete de Juego Gengar", 25, "Superficie antideslizante", "Accesorios", true),
            new Product("Caja de mazo (Deck Box)", 8, "Capacidad 80 cartas", "Accesorios", false)
        ];
        categories.push(new ProductCategory("Accesorios", accessories));

        return categories;
    }
}