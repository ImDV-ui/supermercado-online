import { ProductDatabase } from '../database/productDatabase.js';

export class ShopView {
    constructor() {
        this.categories = ProductDatabase.obtenerDatos();
        this.allProducts = this.categories.flatMap(c => c.productos);
    }

    async render(filterCategory = null) {
        const container = document.createElement('div');
        container.className = 'container fade-in';
        container.style.paddingTop = '60px'; // More spacing for header
        container.style.paddingBottom = '100px';

        // Filter Logic
        let productsToShow = [...this.allProducts]; // Clone to sort safely
        let title = 'COLECCIÓN COMPLETA';

        if (filterCategory) {
            const categoryObj = this.categories.find(c => c.id === filterCategory);
            if (categoryObj) {
                productsToShow = [...categoryObj.productos];
                title = categoryObj.nombre.toUpperCase();
            }
        }

        // Header Section
        const header = document.createElement('div');
        header.style.marginBottom = '60px';
        header.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid var(--border); padding-bottom: 20px;">
                <div>
                    <span style="font-size: 0.9rem; color: var(--accent); font-weight: bold; letter-spacing: 1px;">EXPLORAR</span>
                    <h1 style="font-size: 3.5rem; margin-top: 10px;">${title}</h1>
                </div>
                <div style="text-align: right;">
                    <span style="color: var(--text-sec); font-size: 0.9rem;">${productsToShow.length} ARTÍCULOS</span>
                </div>
            </div>
            <div style="margin-top: 30px; display: flex; justify-content: space-between; align-items: center;">
                <div class="category-pills" style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 5px;">
                    <a href="#/shop" class="btn btn-sm ${!filterCategory ? 'btn-primary' : ''}">TODO</a>
                    ${this.categories.slice(0, 5).map(c => `
                        <a href="#/shop/${c.id}" class="btn btn-sm ${filterCategory === c.id ? 'btn-primary' : ''}">${c.nombre}</a>
                    `).join('')}
                </div>
                
                <div style="position: relative;">
                    <select id="sort-select" style="padding: 10px 40px 10px 15px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-main); font-family: inherit; cursor: pointer; appearance: none; border-radius: var(--radius-sm);">
                        <option value="featured">RELAVANCIA</option>
                        <option value="price-asc">PRECIO: MENOR A MAYOR</option>
                        <option value="price-desc">PRECIO: MAYOR A MENOR</option>
                    </select>
                    <span style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); pointer-events: none; font-size: 0.7rem;">▼</span>
                </div>
            </div>
        `;

        // Grid Container
        const grid = document.createElement('div');
        grid.className = 'product-grid';
        grid.id = 'shop-grid'; // ID for easier updates

        // Render initial items
        this.renderGridItems(grid, productsToShow);

        // Add Sort Listener
        const sortSelect = header.querySelector('#sort-select');
        sortSelect.addEventListener('change', (e) => {
            const sortValue = e.target.value;
            this.sortProducts(productsToShow, sortValue);
            this.renderGridItems(grid, productsToShow);
        });

        container.appendChild(header);
        container.appendChild(grid);

        return container;
    }

    sortProducts(products, sortType) {
        if (sortType === 'price-asc') {
            products.sort((a, b) => a.precio - b.precio);
        } else if (sortType === 'price-desc') {
            products.sort((a, b) => b.precio - a.precio);
        } else {
            // Relevancia / ID fallback
            products.sort((a, b) => a.id - b.id);
        }
    }

    renderGridItems(container, products) {
        if (products.length > 0) {
            container.innerHTML = products.map(p => this.createProductCard(p)).join('');
        } else {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-sec);">No se encontraron productos en esta categoría.</p>';
        }
    }

    createProductCard(product) {
        return `
            <div class="product-card" onclick="window.location.hash='#/product/${product.id}'">
                <div class="image-wrapper">
                    <img src="${product.imagen}" alt="${product.nombre}" loading="lazy">
                </div>
                <div class="product-info">
                    <div>
                        <h3 class="product-name">${product.nombre}</h3>
                        <p style="font-size: 0.8rem; color: #999; text-transform: uppercase; margin-top: 5px;">${product.categoria}</p>
                    </div>
                    <span class="product-price">${product.precio.toFixed(2)} €</span>
                </div>
            </div>
        `;
    }
}
