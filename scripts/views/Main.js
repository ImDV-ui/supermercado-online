import { ProductDatabase } from '../database/productDatabase.js';
import { HeaderView } from './HeaderView.js';
import { ProductView } from './ProductView.js';

export class Main {
    constructor() {
        this.appElement = document.getElementById('app');
        this.headerView = new HeaderView();
        this.productView = new ProductView();
        this.categories = ProductDatabase.obtenerDatos();
        this.allProducts = this.categories.flatMap(c => c.productos);
    }

    init() {
        // 1. Renderizar Header
        const headerElement = this.headerView.render(
            this.categories,
            (categoryId) => this.handleCategoryChange(categoryId)
        );
        this.appElement.appendChild(headerElement);

        // 2. Renderizar Hero Section (Estático, estilo Banner)
        this.renderHero();

        // 3. Contenedor de Productos
        this.mainContent = document.createElement('main');
        this.mainContent.id = 'main-content';

        // Título de sección New Products
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'section-header';
        sectionHeader.innerHTML = '<h2 class="section-title">NEW PRODUCTS</h2>';
        this.mainContent.appendChild(sectionHeader);

        this.appElement.appendChild(this.mainContent);

        // 4. Cargar productos iniciales
        this.renderProducts(this.allProducts);
    }

    renderHero() {
        const hero = document.createElement('section');
        hero.className = 'hero-section';
        hero.innerHTML = `
            <div class="hero-content">
                <p class="hero-subtitle">TU TIENDA FAVORITA DE POKÉMON TCG EN ESPAÑA</p>
                <h1 class="hero-title">ASCENDED HEROES</h1>
                <button class="hero-btn">COMPRAR AHORA →</button>
            </div>
        `;
        this.appElement.appendChild(hero);
    }

    handleCategoryChange(categoryId) {
        if (!categoryId) {
            this.renderProducts(this.allProducts);
        } else {
            const category = this.categories.find(c => c.id === categoryId);
            if (category) {
                this.renderProducts(category.productos);
            }
        }
    }

    renderProducts(products) {
        // Limpiamos solo el grid, mantenemos el título si ya existe
        const existingGrid = this.mainContent.querySelector('.product-grid');
        if (existingGrid) existingGrid.remove();

        const grid = this.productView.render(products);
        this.mainContent.appendChild(grid);
    }
}