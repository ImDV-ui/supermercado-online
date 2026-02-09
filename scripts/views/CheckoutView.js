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

        try {
            const response = await fetch('templates/CheckoutShipping.html');
            const html = await response.text();
            container.innerHTML = html;

            container.querySelector('#checkout-total').textContent = `${totals.total.toFixed(2)} €`;

            const form = container.querySelector('#shipping-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.renderPaymentStep(container);
            });

        } catch (error) {
            console.error('Error loading checkout shipping template:', error);
            container.innerHTML = '<h2>Error loading checkout</h2>';
        }

        return container;
    }

    async renderPaymentStep(container) {
        const formContainer = container.querySelector('#checkout-form-container');
        const steps = container.querySelectorAll('.step');
        steps[0].classList.remove('active');
        steps[1].classList.add('active');

        try {
            const response = await fetch('templates/CheckoutPayment.html');
            const html = await response.text();
            formContainer.innerHTML = html;

            const paymentForm = formContainer.querySelector('#payment-form');
            paymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.renderSuccessStep(container);
            });
        } catch (error) {
            console.error('Error loading checkout payment template:', error);
            formContainer.innerHTML = '<h2>Error loading payment form</h2>';
        }
    }

    async renderSuccessStep(container) {
        const formContainer = container.querySelector('#checkout-form-container');
        const steps = container.querySelectorAll('.step');
        steps[1].classList.remove('active');
        steps[2].classList.add('active');

        this.cartService.clearCart();

        try {
            const response = await fetch('templates/CheckoutSuccess.html');
            const html = await response.text();

            const orderId = `#${Math.floor(Math.random() * 1000000)}`;

            formContainer.innerHTML = html;

            const orderIdSpan = formContainer.querySelector('#order-id');
            if (orderIdSpan) orderIdSpan.textContent = orderId;

        } catch (error) {
            console.error('Error loading checkout success template:', error);
            formContainer.innerHTML = '<h2>Error loading success message</h2>';
        }
    }
}
