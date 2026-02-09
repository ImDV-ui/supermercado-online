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

        try {
            const response = await fetch('templates/ProductDetail.html');
            const html = await response.text();
            container.innerHTML = html;

            const img = container.querySelector('#main-image');
            img.src = product.imagen;
            img.alt = product.nombre;

            container.querySelector('#product-category').textContent = product.categoria;
            container.querySelector('#product-name').textContent = product.nombre;
            container.querySelector('#product-price').textContent = `${product.precio.toFixed(2)} €`;
            container.querySelector('#product-description').textContent = product.descripcion;

            const btn = container.querySelector('#add-to-cart-btn');
            const qtyInput = container.querySelector('#qty');

            btn.addEventListener('click', () => {
                const qty = parseInt(qtyInput.value) || 1;
                this.cartService.addItem(product, qty);
                this.showToast(`Añadido: ${product.nombre} (${qty})`);
            });

        } catch (error) {
            console.error('Error loading template:', error);
            container.innerHTML = '<h2>Error loading product details</h2>';
        }

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
