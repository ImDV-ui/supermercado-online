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
            if (typeof filterCategory === 'object' && filterCategory.search) {
                // Search Mode
                const query = filterCategory.search.toLowerCase();
                productsToShow = productsToShow.filter(p =>
                    p.nombre.toLowerCase().includes(query) ||
                    p.descripcion.toLowerCase().includes(query)
                );
                title = `BUSCANDO: "${filterCategory.search}"`;
                filterCategory = null; // Clear category pill highlight if searching
            } else {
                // Category Mode
                const categoryObj = this.categories.find(c => c.id === filterCategory);
                if (categoryObj) {
                    productsToShow = [...categoryObj.productos];
                    title = categoryObj.nombre.toUpperCase();
                }
            }
        }

        // Header Section
        const header = document.createElement('div');
        header.style.marginBottom = '60px';
        header.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid var(--border-color); padding-bottom: 20px;">
                <div>
                    <span style="font-size: 0.8rem; color: var(--brand-accent); font-weight: bold; letter-spacing: 2px;">EXPLORAR</span>
                    <h1 style="font-size: 3.5rem; margin-top: 10px;">${title}</h1>
                </div>
                <div style="text-align: right;">
                    <span style="color: var(--text-secondary); font-size: 0.9rem;">${productsToShow.length} ARTÍCULOS</span>
                </div>
            </div>
            <div style="margin-top: 30px; display: flex; justify-content: space-between; align-items: center;">
                <div class="category-pills" style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 5px;">
                    <a href="#/shop" class="btn" style="padding: 10px 20px; font-size: 0.8rem; ${!filterCategory ? 'background: var(--text-primary); color: var(--bg-main);' : ''}">TODO</a>
                    ${this.categories.slice(0, 5).map(c => `
                        <a href="#/shop/${c.id}" class="btn" style="padding: 10px 20px; font-size: 0.8rem; ${filterCategory === c.id ? 'background: var(--text-primary); color: var(--bg-main);' : ''}">${c.nombre}</a>
                    `).join('')}
                </div>
                
                <div style="position: relative;">
                    <select id="sort-select" style="padding: 10px 40px 10px 15px; border: 1px solid var(--border-color); background: var(--bg-secondary); color: var(--text-primary); font-family: inherit; cursor: pointer; appearance: none;">
                        <option value="featured">RELEVANCIA</option>
                        <option value="price-asc">PRECIO: MENOR A MAYOR</option>
                        <option value="price-desc">PRECIO: MAYOR A MENOR</option>
                    </select>
                    <span style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); pointer-events: none; font-size: 0.7rem; color: var(--text-primary);">▼</span>
                </div>
            </div>
        `;

        // Grid Container
        const grid = document.createElement('div');
        grid.className = 'products-grid'; // New class name
        grid.id = 'shop-grid';

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
            products.sort((a, b) => a.id - b.id);
        }
    }

    renderGridItems(container, products) {
        if (products.length > 0) {
            container.innerHTML = products.map(p => this.createProductCard(p)).join('');
        } else {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); margin-top: 40px;">No se encontraron productos en esta categoría.</p>';
        }
    }

    createProductCard(product) {
        // badge logic (randomly simulation or logic)
        const isNew = product.id > 1000;
        const badge = isNew ? '<span class="badge">NUEVO</span>' : '';

        return `
            <div class="product-card" onclick="window.location.hash='#/product/${product.id}'">
                <div style="position: relative;">
                    ${badge}
                    <img src="${product.imagen}" alt="${product.nombre}" loading="lazy">
                </div>
                <div class="product-info-container"> <!-- Wrapper for spacing if needed -->
                    <p class="product-category">${product.categoria.toUpperCase()}</p>
                    <h3 class="product-title">${product.nombre}</h3>
                    <div class="price">${product.precio.toFixed(2)} €</div>
                    <span class="button-buy">VER DETALLES</span>
                </div>
            </div>
        `;
    }
}
