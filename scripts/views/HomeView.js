import { ProductDatabase } from '../database/productDatabase.js';

export class HomeView {
    constructor() {
        this.categories = ProductDatabase.obtenerDatos();
        // Flatten all products
        this.allProducts = this.categories.flatMap(c => c.productos);
        // Featured: Just taking some marked as featured or randoms for now
        this.featuredProducts = this.allProducts.filter(p => p.destacado).slice(0, 4);
    }

    async render() {
        const container = document.createElement('div');
        container.className = 'home-view';

        // 1. Hero Section
        const hero = document.createElement('section');
        hero.className = 'hero-section fade-in';
        hero.innerHTML = `
            <div class="container hero-content">
                <span class="hero-subtitle">COLECCIONABLES PREMIUM TCG</span>
                <h1 class="hero-title">EL ÚLTIMO<br>Y ME VOY</h1>
                <p>Tu destino definitivo para cartas Pokémon de importación japonesa, coreana y ediciones exclusivas.</p>
                <div style="margin-top: 40px; display: flex; gap: 20px; justify-content: center;">
                    <a href="#/shop" class="btn">VER COLECCIÓN</a>
                    <a href="#/shop/booster-boxes" class="btn" style="background: transparent; border: 1px solid var(--border-color); color: var(--text-primary);">VER CAJAS</a>
                </div>
            </div>
        `;

        // 2. Featured Section
        const featured = document.createElement('section');
        featured.className = 'container fade-in';
        featured.style.marginBottom = '80px';
        featured.style.animationDelay = '0.2s';

        featured.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px;">
                <h2 style="font-size: 2rem;">DESTACADOS</h2>
                <a href="#/shop" style="font-size: 0.9rem; text-decoration: underline; color: var(--pkm-blue);">Ver todo</a>
            </div>
            <div class="products-grid">
                ${this.featuredProducts.map(product => this.createProductCard(product)).join('')}
            </div>
        `;

        // 3. Banner / Story
        const banner = document.createElement('section');
        banner.className = 'fade-in';
        banner.style.borderTop = '1px solid var(--border-color)';
        banner.style.padding = '100px 0';
        banner.style.textAlign = 'center';
        banner.style.marginTop = '80px';
        banner.style.animationDelay = '0.4s';

        banner.innerHTML = `
            <div class="container">
                <span style="color: var(--brand-accent); letter-spacing: 2px; font-size: 0.8rem; display: block; margin-bottom: 20px;">NUESTRA MISIÓN</span>
                <h2 style="font-size: 2.5rem; margin-bottom: 30px;">LA BÚSQUEDA TERMINA AQUÍ</h2>
                <p style="max-width: 600px; margin: 0 auto; color: var(--text-secondary);">
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
        // badge logic
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
