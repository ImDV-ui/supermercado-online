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
                    <span style="color: var(--brand-accent); text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem;">${product.categoria}</span>
                    <h1 class="hero-title" style="font-size: 3rem; margin: 15px 0;">${product.nombre}</h1>
                    <div class="detail-price">${product.precio.toFixed(2)} €</div>
                    
                    <div class="detail-description">
                        <p>${product.descripcion}</p>
                        <ul style="margin-top: 20px; color: var(--text-secondary); font-size: 0.9rem;">
                            <li style="margin-bottom: 5px;">• Condición: <strong>Gem Mint / Sealed</strong></li>
                            <li style="margin-bottom: 5px;">• Idioma: Importación Original</li>
                            <li style="margin-bottom: 5px;">• Autenticidad Garantizada</li>
                        </ul>
                    </div>

                    <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 40px;">
                        <input type="number" id="qty" value="1" min="1" max="10" style="width: 80px; padding: 16px; text-align: center; background: transparent; border: 1px solid var(--border-color); color: white; font-size: 1rem;">
                        <button id="add-to-cart-btn" class="btn" style="flex-grow: 1; background: var(--text-primary); color: black;">AÑADIR A LA COLECCIÓN</button>
                    </div>

                    <div style="padding: 25px; border: 1px solid var(--border-color); border-radius: 4px; font-size: 0.85rem; color: var(--text-secondary);">
                        <p style="margin-bottom: 10px;">🛡️ <strong>Envío Blindado:</strong> Embalaje de seguridad para coleccionistas.</p>
                        <p>🔒 <strong>Garantía:</strong> Devolución gratuita si el artículo no cumple el estado descrito.</p>
                    </div>
                </div>
            </div>
        `;
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
