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
                <img src="${item.imagen}" alt="${item.nombre}" style="border-radius: 4px;">
                <div style="flex-grow: 1;">
                    <div style="display: flex; justify-content: space-between;">
                        <h3 style="font-size: 1rem;">${item.nombre}</h3>
                        <button class="remove-btn" data-id="${item.id}" style="color: var(--text-secondary); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px;">Eliminar</button>
                    </div>
                    <p style="color: var(--text-secondary); margin: 5px 0;">${item.precio.toFixed(2)} €</p>
                    <div style="display: flex; align-items: center; gap: 15px; margin-top: 15px;">
                        <span style="font-size: 0.8rem; color: var(--text-secondary);">CANTIDAD</span>
                        <input type="number" class="qty-update" data-id="${item.id}" value="${item.quantity}" min="1" style="background: transparent; border: 1px solid var(--border-color); color: white; padding: 5px; width: 60px; text-align: center;">
                    </div>
                </div>
                <div style="font-weight: bold; font-size: 1.1rem;">
                    ${(item.precio * item.quantity).toFixed(2)} €
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <h1 style="margin-bottom: 40px; border-bottom: 1px solid var(--border-color); padding-bottom: 20px;">CARRITO</h1>
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 60px;">
                <div class="cart-items">
                    ${itemsHtml}
                </div>
                <div class="cart-summary" style="height: fit-content;">
                    <h3 style="margin-bottom: 25px; font-size: 1.2rem;">RESUMEN DEL PEDIDO</h3>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px; color: var(--text-secondary);">
                        <span>Subtotal</span>
                        <span style="color: var(--text-primary);">${(totals.subtotal - totals.tax).toFixed(2)} €</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px; color: var(--text-secondary);">
                        <span>IVA (21%)</span>
                        <span style="color: var(--text-primary);">${totals.tax.toFixed(2)} €</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 25px; color: var(--text-secondary);">
                        <span>Envío Asegurado</span>
                        <span style="color: var(--text-primary);">${totals.shipping === 0 ? 'INCLUIDO' : totals.shipping.toFixed(2) + ' €'}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 30px; font-weight: bold; font-size: 1.4rem; border-top: 1px solid var(--border-color); padding-top: 20px;">
                        <span>TOTAL</span>
                        <span>${totals.total.toFixed(2)} €</span>
                    </div>
                    <a href="#/checkout" class="btn" style="width: 100%; text-align: center; background: var(--text-primary); color: black;">FINALIZAR COMPRA</a>
                    <div style="text-align: center; margin-top: 20px; font-size: 0.75rem; color: var(--text-secondary);">
                        PAGO SEGURO Y DISCRETO SSL 256-BIT
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
