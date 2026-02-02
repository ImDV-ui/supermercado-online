import { ProductDatabase } from '../database/ProductDatabase.js';
import { HeaderView } from './HeaderView.js';
import { ProductView } from './ProductView.js';

export class Main {
    constructor() {
        this.appElement = document.getElementById('app');
        this.headerView = new HeaderView();
        this.productView = new ProductView();

        // Obtener datos
        this.categories = ProductDatabase.obtenerDatos();
        this.allProducts = this.categories.flatMap(c => c.productos);
    }

    init() {
        // Renderizar Header
        const headerElement = this.headerView.render(
            this.categories,
            (categoryId) => this.handleCategoryChange(categoryId)
        );
        this.appElement.appendChild(headerElement);

        // Contenedor principal para productos
        this.mainContent = document.createElement('main');
        this.appElement.appendChild(this.mainContent);

        // Renderizar vista inicial (Home - todos los productos)
        this.renderProducts(this.allProducts);
    }

    handleCategoryChange(categoryId) {
        if (!categoryId) {
            // Home: mostrar todos
            this.renderProducts(this.allProducts);
        } else {
            // Filtrar por categoría
            const category = this.categories.find(c => c.id === categoryId);
            if (category) {
                this.renderProducts(category.productos);
            }
        }
    }

    renderProducts(products) {
        this.mainContent.innerHTML = '';
        const grid = this.productView.render(products);
        this.mainContent.appendChild(grid);
    }
}
