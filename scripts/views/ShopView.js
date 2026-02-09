import { ProductDatabase } from '../database/productDatabase.js';

export class ShopView {
    constructor() {
        this.categories = ProductDatabase.obtenerDatos();
        this.allProducts = this.categories.flatMap(c => c.productos);
    }

    async render(filterCategory = null) {
        const container = document.createElement('div');
        container.className = 'container fade-in';
        container.style.paddingTop = '60px';
        container.style.paddingBottom = '100px';

        let productsToShow = [...this.allProducts];
        let title = 'COLECCIÓN COMPLETA';

        if (filterCategory) {
            if (typeof filterCategory === 'object' && filterCategory.search) {
                const query = filterCategory.search.toLowerCase();
                productsToShow = productsToShow.filter(p =>
                    p.nombre.toLowerCase().includes(query) ||
                    p.descripcion.toLowerCase().includes(query)
                );
                title = `BUSCANDO: "${filterCategory.search}"`;
                filterCategory = null;
            } else {
                const categoryObj = this.categories.find(c => c.id === filterCategory);
                if (categoryObj) {
                    productsToShow = [...categoryObj.productos];
                    title = categoryObj.nombre.toUpperCase();
                }
            }
        }

        try {
            const response = await fetch('templates/Shop.html');
            const html = await response.text();
            container.innerHTML = html;

            container.querySelector('#shop-title').textContent = title;
            container.querySelector('#product-count').textContent = `${productsToShow.length} ARTÍCULOS`;

            const pillsContainer = container.querySelector('#category-pills');
            const allLink = document.createElement('a');
            allLink.href = '#/shop';
            allLink.className = 'btn';
            allLink.style.cssText = `padding: 10px 20px; font-size: 0.8rem; ${!filterCategory ? 'background: var(--text-primary); color: var(--bg-main);' : ''}`;
            allLink.textContent = 'TODO';
            pillsContainer.appendChild(allLink);

            this.categories.slice(0, 5).forEach(c => {
                const link = document.createElement('a');
                link.href = `#/shop/${c.id}`;
                link.className = 'btn';
                link.style.cssText = `padding: 10px 20px; font-size: 0.8rem; ${filterCategory === c.id ? 'background: var(--text-primary); color: var(--bg-main);' : ''}`;
                link.textContent = c.nombre;
                pillsContainer.appendChild(link);
            });

            const grid = container.querySelector('#shop-grid');
            await this.renderGridItems(grid, productsToShow);

            const sortSelect = container.querySelector('#sort-select');
            sortSelect.addEventListener('change', (e) => {
                const sortValue = e.target.value;
                this.sortProducts(productsToShow, sortValue);
                this.renderGridItems(grid, productsToShow);
            });

        } catch (error) {
            console.error('Error loading shop template:', error);
            container.innerHTML = '<h2>Error loading shop</h2>';
        }

        return container;
    }

    sortProducts(products, sortType) {
        if (sortType === 'price-asc') {
            products.sort((a, b) => a.precio - b.precio);
        } else if (sortType === 'price-desc') {
            products.sort((a, b) => b.precio - a.precio);
        } else {
            products.sort((a, b) => a.id - b.id);
        }
    }

    async renderGridItems(container, products) {
        if (products.length > 0) {
            const response = await fetch('templates/ProductCard.html');
            const template = await response.text();

            container.innerHTML = products.map(p => this.createProductCard(p, template)).join('');

            const cards = container.querySelectorAll('.product-card');
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    window.location.hash = `#/product/${card.dataset.id}`;
                });
            });

        } else {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); margin-top: 40px;">No se encontraron productos en esta categoría.</p>';
        }
    }

    createProductCard(product, template) {
        const isNew = product.id > 1000;
        const badge = isNew ? '<span class="badge">NUEVO</span>' : '';

        let cardHtml = template
            .replace('${id}', product.id)
            .replace('${id}', product.id)
            .replace('${badge}', badge)
            .replace('${imagen}', product.imagen)
            .replace('${nombre}', product.nombre)
            .replace('${nombre}', product.nombre)
            .replace('${categoria}', product.categoria.toUpperCase())
            .replace('${nombre}', product.nombre)
            .replace('${precio}', product.precio.toFixed(2));

        cardHtml = template
            .split('${id}').join(product.id)
            .split('${badge}').join(badge)
            .split('${imagen}').join(product.imagen)
            .split('${nombre}').join(product.nombre)
            .split('${categoria}').join(product.categoria.toUpperCase())
            .split('${precio}').join(product.precio.toFixed(2));

        return cardHtml;
    }
}
