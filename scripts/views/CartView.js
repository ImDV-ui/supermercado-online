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

        try {
            const [cartTemplateRes, itemTemplateRes] = await Promise.all([
                fetch('templates/Cart.html'),
                fetch('templates/CartItem.html')
            ]);

            const cartTemplate = await cartTemplateRes.text();
            const itemTemplate = await itemTemplateRes.text();

            container.innerHTML = cartTemplate;

            const itemsHtml = cart.map(item => {
                return itemTemplate
                    .split('${imagen}').join(item.imagen)
                    .split('${nombre}').join(item.nombre)
                    .split('${id}').join(item.id)
                    .split('${precio}').join(item.precio.toFixed(2))
                    .split('${quantity}').join(item.quantity)
                    .split('${totalItem}').join((item.precio * item.quantity).toFixed(2));
            }).join('');

            container.querySelector('#cart-items-container').innerHTML = itemsHtml;

            container.querySelector('#subtotal').textContent = `${(totals.subtotal - totals.tax).toFixed(2)} €`;
            container.querySelector('#tax').textContent = `${totals.tax.toFixed(2)} €`;
            container.querySelector('#shipping').textContent = totals.shipping === 0 ? 'INCLUIDO' : `${totals.shipping.toFixed(2)} €`;
            container.querySelector('#total').textContent = `${totals.total.toFixed(2)} €`;

            container.querySelectorAll('.remove-btn').forEach(btn => {
                btn.onclick = () => {
                    this.cartService.removeItem(parseInt(btn.dataset.id));
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

        } catch (error) {
            console.error('Error loading cart templates:', error);
            container.innerHTML = '<h2>Error loading cart</h2>';
        }

        return container;
    }
}
