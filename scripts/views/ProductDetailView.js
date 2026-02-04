import { ProductDatabase } from '../database/productDatabase.js';

export class ProductDetailView {
    constructor(cartService) {
        this.cartService = cartService;
        this.categories = ProductDatabase.obtenerDatos();
        this.allProducts = this.categories.flatMap(c => c.productos);
    }

    async render(productId) {
        const container = document.createElement('div');
        container.className = 'container fade-in';

        const product = this.allProducts.find(p => p.id == productId);

        if (!product) {
            container.innerHTML = '<h2>Producto no encontrado</h2><a href="#/shop" class="btn">Volver a la tienda</a>';
            return container;
        }

        container.innerHTML = `
            <div class="product-detail-container">
                <div class="detail-gallery">
                    <img src="${product.imagen}" alt="${product.nombre}" id="main-image">
                </div>
                <div class="detail-info">
                    <span style="color: var(--text-sec); text-transform: uppercase; letter-spacing: 1px;">${product.categoria}</span>
                    <h1 class="hero-title" style="font-size: 2.5rem; margin: 10px 0;">${product.nombre}</h1>
                    <div class="detail-price">${product.precio.toFixed(2)} €</div>
                    
                    <div class="detail-description">
                        <p>${product.descripcion}</p>
                        <ul style="margin-top: 20px; color: var(--text-sec);">
                            <li>• Condición: Nuevo / Mint</li>
                            <li>• Idioma: Inglés / Japonés (según edición)</li>
                            <li>• Envío asegurado incluido</li>
                        </ul>
                    </div>

                    <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 30px;">
                        <input type="number" id="qty" value="1" min="1" max="10" style="width: 80px; padding: 14px; text-align: center;">
                        <button id="add-to-cart-btn" class="btn btn-primary" style="flex-grow: 1;">AÑADIR AL CARRITO</button>
                    </div>

                    <div style="padding: 20px; background: #f9f9f9; border-radius: 8px; font-size: 0.9rem;">
                        <p>✅ Envío gratis en pedidos superiores a 50€</p>
                        <p>🔒 Pago seguro garantizado</p>
                    </div>
                </div>
            </div>
        `;

        // Add event listener manually after render
        const btn = container.querySelector('#add-to-cart-btn');
        const qtyInput = container.querySelector('#qty');

        btn.addEventListener('click', () => {
            const qty = parseInt(qtyInput.value) || 1;
            this.cartService.addItem(product, qty);
            this.showToast(`Añadido: ${product.nombre} (${qty})`);
        });

        return container;
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
}
