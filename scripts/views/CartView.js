export class CartView {
    constructor(cartService) {
        this.cartService = cartService;
    }

    async render() {
        const container = document.createElement('div');
        container.className = 'container fade-in cart-page';

        const cart = this.cartService.getCart();
        const totals = this.cartService.getTotals();

        if (cart.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 100px 0;">
                    <h2>TU CARRITO ESTÁ VACÍO</h2>
                    <p style="margin: 20px 0;">Parece que aún no has encontrado tu carta perfecta.</p>
                    <a href="#/shop" class="btn">IR A LA TIENDA</a>
                </div>
            `;
            return container;
        }

        let itemsHtml = cart.map(item => `
            <div class="cart-item">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div style="flex-grow: 1;">
                    <div style="display: flex; justify-content: space-between;">
                        <h3>${item.nombre}</h3>
                        <button class="remove-btn" data-id="${item.id}" style="color: red; font-size: 0.8rem;">Eliminar</button>
                    </div>
                    <p style="color: var(--text-sec); margin: 5px 0;">${item.precio.toFixed(2)} €</p>
                    <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                        <span>Cant:</span>
                        <input type="number" class="qty-update" data-id="${item.id}" value="${item.quantity}" min="1" style="width: 60px; padding: 5px;">
                    </div>
                </div>
                <div style="font-weight: bold;">
                    ${(item.precio * item.quantity).toFixed(2)} €
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <h1 style="margin-bottom: 40px; border-bottom: 1px solid var(--border); padding-bottom: 20px;">CARRITO DE COMPRA</h1>
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 40px;">
                <div class="cart-items">
                    ${itemsHtml}
                </div>
                <div class="cart-summary" style="background: var(--bg-secondary); padding: 30px; height: fit-content;">
                    <h3 style="margin-bottom: 20px;">RESUMEN</h3>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Subtotal (sin imp.)</span>
                        <span>${(totals.subtotal - totals.tax).toFixed(2)} €</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Impuestos (21%)</span>
                        <span>${totals.tax.toFixed(2)} €</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                        <span>Envío</span>
                        <span>${totals.shipping === 0 ? 'GRATIS' : totals.shipping.toFixed(2) + ' €'}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 30px; font-weight: bold; font-size: 1.2rem; border-top: 1px solid #ddd; padding-top: 20px;">
                        <span>TOTAL</span>
                        <span>${totals.total.toFixed(2)} €</span>
                    </div>
                    <a href="#/checkout" class="btn btn-primary" style="width: 100%; text-align: center;">TRAMITAR PEDIDO</a>
                    <div style="text-align: center; margin-top: 15px; font-size: 0.8rem; color: #888;">
                        🔒 Checkout Seguro SSL
                    </div>
                </div>
            </div>
        `;

        // Add Listeners
        container.querySelectorAll('.remove-btn').forEach(btn => {
            btn.onclick = () => {
                this.cartService.removeItem(parseInt(btn.dataset.id));
                // Re-render whole view (simple approach) or dispatch event
                window.location.reload();
            };
        });

        container.querySelectorAll('.qty-update').forEach(input => {
            input.onchange = (e) => {
                const newQty = parseInt(e.target.value);
                if (newQty > 0) {
                    this.cartService.updateQuantity(parseInt(input.dataset.id), newQty);
                    window.location.reload();
                }
            };
        });

        return container;
    }
}
