export class HeaderView {
    constructor(cartService, userService) {
        this.cartService = cartService;
        this.userService = userService;
        window.addEventListener('cart-updated', (e) => this.updateCartCount(e.detail.count));
    }

    render() {
        this.element = document.createElement('header');

        const inner = document.createElement('div');
        inner.className = 'container header-inner';

        // 1. Navegación Izquierda
        const navLeft = document.createElement('nav');
        navLeft.className = 'nav-left nav-links';
        navLeft.innerHTML = `
            <a href="#/shop" class="btn-link">SELLADO</a>
            <a href="#/shop/accesorios" class="btn-link">ACCESORIOS</a>
            <a href="#/shop/premium" class="btn-link">COLECCIONES</a>
            <a href="#/shop" class="btn-link">NOVEDADES</a>
        `;

        // 2. Logo Centro
        const logo = document.createElement('div');
        logo.className = 'logo';
        logo.textContent = 'EL ÚLTIMO Y ME VOY';
        logo.onclick = () => window.location.hash = '#/';

        // 3. Iconos Derecha
        const icons = document.createElement('div');
        icons.className = 'icons-right';

        // Search (Simulado)
        const searchBtn = document.createElement('button');
        searchBtn.innerHTML = '🔍';
        searchBtn.className = 'icon-btn';
        searchBtn.onclick = () => alert('Buscador simulado');

        // Account
        const accountBtn = document.createElement('a');
        accountBtn.href = '#/account';
        accountBtn.innerHTML = '👤';
        accountBtn.className = 'icon-btn';

        // Cart
        const cartWrapper = document.createElement('div');
        cartWrapper.className = 'cart-icon-wrapper';
        cartWrapper.onclick = () => window.location.hash = '#/cart';

        const cartIcon = document.createElement('span');
        cartIcon.innerHTML = '🛒';
        cartIcon.className = 'icon-btn';

        const badge = document.createElement('span');
        badge.className = 'cart-count';
        badge.id = 'header-cart-count';
        badge.textContent = this.cartService.getItemCount();
        if (this.cartService.getItemCount() === 0) badge.style.display = 'none';

        cartWrapper.appendChild(cartIcon);
        cartWrapper.appendChild(badge);

        icons.appendChild(searchBtn);
        icons.appendChild(accountBtn);
        icons.appendChild(cartWrapper);

        inner.appendChild(navLeft);
        inner.appendChild(logo);
        inner.appendChild(icons);

        this.element.appendChild(inner);

        return this.element;
    }

    updateCartCount(count) {
        const badge = document.getElementById('header-cart-count');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }
}