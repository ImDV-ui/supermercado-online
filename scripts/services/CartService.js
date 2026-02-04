export class CartService {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.taxRate = 0.21; // IVA 21%
        this.shippingCost = 4.95;
        this.freeShippingThreshold = 50.00;
    }

    getCart() {
        return this.cart;
    }

    addItem(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ ...product, quantity });
        }
        this._save();
        this._notify();
    }

    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this._save();
        this._notify();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this._save();
                this._notify();
            }
        }
    }

    clearCart() {
        this.cart = [];
        this._save();
        this._notify();
    }

    getTotals() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
        const shipping = subtotal >= this.freeShippingThreshold ? 0 : this.shippingCost;
        const tax = subtotal * this.taxRate;
        const total = subtotal + shipping; // En este caso simplificado, asumimos precio con IVA incluido para display, o + tax si fuera neto.
        // Simularemos que el precio del producto YA incluye impuestos, así que desglosamos el impuesto del subtotal.
        const taxIncluded = subtotal - (subtotal / (1 + this.taxRate));

        return {
            subtotal,
            shipping,
            tax: taxIncluded,
            total
        };
    }

    getItemCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    _save() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    _notify() {
        window.dispatchEvent(new CustomEvent('cart-updated', {
            detail: { count: this.getItemCount() }
        }));
    }
}
