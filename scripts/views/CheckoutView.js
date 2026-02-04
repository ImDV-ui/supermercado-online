export class CheckoutView {
    constructor(cartService, userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    async render() {
        const container = document.createElement('div');
        container.className = 'container fade-in';
        container.style.paddingTop = '40px';
        container.style.paddingBottom = '80px';
        container.style.maxWidth = '800px';

        const cart = this.cartService.getCart();
        const totals = this.cartService.getTotals();

        if (cart.length === 0) {
            window.location.hash = '#/cart';
            return container;
        }

        container.innerHTML = `
            <h1 style="margin-bottom: 40px; text-align: center;">FINALIZAR COMPRA</h1>
            
            <div class="checkout-steps">
                <div class="step active">1. ENVÍO</div>
                <div class="step">2. PAGO</div>
                <div class="step">3. CONFIRMACIÓN</div>
            </div>

            <div id="checkout-form-container">
                <form id="shipping-form">
                    <h3 style="margin-bottom: 20px;">DIRECCIÓN DE ENVÍO</h3>
                    <div class="form-group">
                        <label>Nombre Completo</label>
                        <input type="text" required placeholder="Ej: Ash Ketchum">
                    </div>
                    <div class="form-group">
                        <label>Dirección</label>
                        <input type="text" required placeholder="Calle Pallet Town, 1">
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="form-group">
                            <label>Ciudad</label>
                            <input type="text" required placeholder="Madrid">
                        </div>
                        <div class="form-group">
                            <label>Código Postal</label>
                            <input type="text" required placeholder="28001">
                        </div>
                    </div>
                    
                    <h3 style="margin: 30px 0 20px;">RESUMEN DEL PEDIDO</h3>
                    <div style="background: var(--bg-secondary); padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                        <div style="display: flex; justify-content: space-between; font-weight: bold;">
                            <span>Total a Pagar</span>
                            <span>${totals.total.toFixed(2)} €</span>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary" style="width: 100%;">CONTINUAR A PAGO</button>
                </form>
            </div>
        `;
        const form = container.querySelector('#shipping-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.renderPaymentStep(container);
        });

        return container;
    }

    renderPaymentStep(container) {
        const formContainer = container.querySelector('#checkout-form-container');
        const steps = container.querySelectorAll('.step');
        steps[0].classList.remove('active');
        steps[1].classList.add('active');

        formContainer.innerHTML = `
            <div class="fade-in">
                <h3 style="margin-bottom: 20px;">MÉTODO DE PAGO</h3>
                
                <div style="margin-bottom: 30px;">
                    <div style="border: 1px solid var(--text-main); padding: 15px; border-radius: 4px; margin-bottom: 10px; cursor: pointer; background: #f0f0f0;">
                        💳 Tarjeta de Crédito / Débito
                    </div>
                    <div style="border: 1px solid var(--border); padding: 15px; border-radius: 4px; color: #999; cursor: not-allowed;">
                        PayPal (No disponible en simulación)
                    </div>
                </div>

                <form id="payment-form">
                    <div class="form-group">
                        <label>Número de Tarjeta</label>
                        <input type="text" placeholder="0000 0000 0000 0000" maxlength="19">
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="form-group">
                            <label>Fecha Exp.</label>
                            <input type="text" placeholder="MM/YY">
                        </div>
                        <div class="form-group">
                            <label>CVV</label>
                            <input type="text" placeholder="123" maxlength="3">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">PAGAR AHORA</button>
                </form>
            </div>
        `;

        const paymentForm = formContainer.querySelector('#payment-form');
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.renderSuccessStep(container);
        });
    }

    renderSuccessStep(container) {
        const formContainer = container.querySelector('#checkout-form-container');
        const steps = container.querySelectorAll('.step');
        steps[1].classList.remove('active');
        steps[2].classList.add('active');

        steps[2].classList.add('active');
        this.cartService.clearCart();

        formContainer.innerHTML = `
            <div class="fade-in" style="text-align: center; padding: 40px 0;">
                <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
                <h2 style="margin-bottom: 10px;">¡PEDIDO CONFIRMADO!</h2>
                <p style="color: var(--text-sec); margin-bottom: 30px;">Gracias por tu compra. Hemos enviado un correo de confirmación a tu email.</p>
                <div style="background: var(--bg-secondary); padding: 20px; display: inline-block; border-radius: 8px; margin-bottom: 30px;">
                    <strong>ID Pedido:</strong> #${Math.floor(Math.random() * 1000000)}
                </div>
                <br>
                <a href="#/shop" class="btn btn-primary">SEGUIR COMPRANDO</a>
            </div>
        `;
    }
}
