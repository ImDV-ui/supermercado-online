import { ProductDatabase } from '../database/productDatabase.js';

export class HomeView {
    constructor() {
        this.categories = ProductDatabase.obtenerDatos();
        this.allProducts = this.categories.flatMap(c => c.productos);
        this.featuredProducts = this.allProducts.filter(p => p.destacado).slice(0, 4);
    }

    async render() {
        const container = document.createElement('div');
        container.className = 'home-view';

        try {
            const response = await fetch('templates/Home.html');
            const html = await response.text();
            container.innerHTML = html;

            const cardResponse = await fetch('templates/ProductCard.html');
            const cardTemplate = await cardResponse.text();

            const grid = container.querySelector('#featured-products-grid');
            if (grid) {
                grid.innerHTML = this.featuredProducts.map(product => this.createProductCard(product, cardTemplate)).join('');

                grid.querySelectorAll('.product-card').forEach(card => {
                    card.onclick = () => window.location.hash = `#/product/${card.dataset.id}`;
                });
            }

        } catch (error) {
            console.error('Error loading home template:', error);
            container.innerHTML = '<h2>Error loading home</h2>';
        }

        return container;
    }

    createProductCard(product, template) {
        const isNew = Math.random() > 0.5;
        const badge = isNew ? '<span class="badge">DESTACADO</span>' : '';

        if (!template) return '';

        let cardHtml = template
            .split('${id}').join(product.id)
            .split('${badge}').join(badge)
            .split('${imagen}').join(product.imagen)
            .split('${nombre}').join(product.nombre)
            .split('${categoria}').join(product.categoria.toUpperCase())
            .split('${precio}').join(product.precio.toFixed(2));

        return cardHtml;
    }
}
