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

        const hero = document.createElement('section');
        hero.className = 'hero-section fade-in';
        hero.innerHTML = `
            <div class="container hero-content">
                <span class="hero-subtitle">COLECCIONABLES PREMIUM TCG</span>
                <h1 class="hero-title">EL ÚLTIMO<br>Y ME VOY</h1>
                <p>Tu destino definitivo para cartas Pokémon de importación japonesa, coreana y ediciones exclusivas.</p>
                <div class="hero-actions">
                    <a href="#/shop" class="btn">VER COLECCIÓN</a>
                    <a href="#/shop/booster-boxes" class="btn btn-outline">VER CAJAS</a>
                </div>
            </div>
        `;

        const featured = document.createElement('section');
        featured.className = 'container fade-in';
        featured.style.marginBottom = '80px';
        featured.style.animationDelay = '0.2s';

        featured.innerHTML = `
            <div class="section-header">
                <h2 class="section-title">DESTACADOS</h2>
                <a href="#/shop" class="view-all-link">Ver todo</a>
            </div>
            <div class="products-grid">
                ${this.featuredProducts.map(product => this.createProductCard(product)).join('')}
            </div>
        `;

        const banner = document.createElement('section');
        banner.className = 'fade-in';
        banner.style.borderTop = '1px solid var(--border-color)';
        banner.style.padding = '100px 0';
        banner.style.textAlign = 'center';
        banner.style.marginTop = '80px';
        banner.style.animationDelay = '0.4s';

        banner.innerHTML = `
            <div class="container">
                <span class="mission-label">NUESTRA MISIÓN</span>
                <h2 class="mission-title">LA BÚSQUEDA TERMINA AQUÍ</h2>
                <p class="mission-text">
                    Nos dedicamos a traer las rarezas que faltan en tu carpeta. 
                    Piezas seleccionadas para el coleccionista exigente.
                </p>
            </div>
        `;

        container.appendChild(hero);
        container.appendChild(featured);
        container.appendChild(banner);

        return container;
    }

    createProductCard(product) {

        const isNew = Math.random() > 0.5;
        const badge = isNew ? '<span class="badge">DESTACADO</span>' : '';

        return `
             <div class="product-card" onclick="window.location.hash='#/product/${product.id}'">
                 <div style="position: relative;">
                     ${badge}
                     <img src="${product.imagen}" alt="${product.nombre}" loading="lazy">
                 </div>
                 <div class="product-info-container">
                     <p class="product-category">${product.categoria.toUpperCase()}</p>
                     <h3 class="product-title">${product.nombre}</h3>
                     <div class="price">${product.precio.toFixed(2)} €</div>
                     <span class="button-buy">VER DETALLES</span>
                 </div>
             </div>
         `;
    }
}
