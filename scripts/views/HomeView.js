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
                <div style="margin-top: 30px;">
                    <a href="#/shop" class="btn btn-primary">VER COLECCIÓN</a>
                    <a href="#/shop/cajas" class="btn" style="margin-left: 10px;">VER CAJAS</a>
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
                <a href="#/shop" class="btn-link" style="font-size: 0.9rem; text-decoration: underline;">Ver todo</a>
            </div>
            <div class="product-grid">
                ${this.featuredProducts.map(product => this.createProductCard(product)).join('')}
            </div>
        `;

        // 3. Banner / Story
        const banner = document.createElement('section');
        banner.className = 'fade-in';
        banner.style.background = '#111';
        banner.style.color = '#fff';
        banner.style.padding = '100px 0';
        banner.style.textAlign = 'center';
        banner.style.marginBottom = '80px';
        banner.style.animationDelay = '0.4s';

        banner.innerHTML = `
            <div class="container">
                <h2 style="font-size: 2.5rem; margin-bottom: 20px; color: #fff;">LA BÚSQUEDA TERMINA AQUÍ</h2>
                <p style="max-width: 700px; margin: 0 auto 40px; color: #ccc;">
                    Nos dedicamos a traer las rarezas que faltan en tu carpeta. 
                    Desde los sobres más exclusivos de Japón hasta las Elite Trainer Boxes que ya no encuentras en tiendas.
                </p>
                <a href="#/account" class="btn" style="border-color: #fff; color: #fff;">ÚNETE AL CLUB</a>
            </div>
        `;

        container.appendChild(hero);
        container.appendChild(featured);
        container.appendChild(banner);

        return container;
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
