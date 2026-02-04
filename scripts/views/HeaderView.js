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
            <a href="#/shop">SELLADO</a>
            <a href="#/shop/accesorios">ACCESORIOS</a>
            <a href="#/shop/premium">COLECCIONES</a>
            <a href="#/shop">NOVEDADES</a>
        `;

        // 2. Logo Centro
        const logo = document.createElement('div');
        logo.className = 'logo';
        logo.innerHTML = 'EL ÚLTIMO Y ME VOY'; // Clean, let CSS handle font weight/style
        logo.onclick = () => window.location.hash = '#/';

        // 3. Iconos Derecha
        const icons = document.createElement('div');
        icons.className = 'icons-right';

        // Search (Real)
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'BUSCAR...';
        searchInput.className = 'search-input hidden';
        searchInput.style.border = 'none';
        searchInput.style.borderBottom = '1px solid var(--text-secondary)';
        searchInput.style.background = 'transparent';
        searchInput.style.color = 'var(--text-primary)';
        searchInput.style.padding = '5px 0';
        searchInput.style.marginRight = '15px';
        searchInput.style.fontFamily = 'inherit';
        searchInput.style.fontSize = '0.9rem';
        searchInput.style.width = '200px';
        searchInput.style.outline = 'none';
        searchInput.style.letterSpacing = '1px';

        searchInput.addEventListener('input', () => {
            searchInput.style.borderBottomColor = 'var(--brand-accent)';
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchInput.value.trim()) {
                window.location.hash = `#/shop?search=${encodeURIComponent(searchInput.value.trim())}`;
                searchInput.classList.add('hidden'); // Hide after search
            }
        });

        const searchBtn = document.createElement('button');
        searchBtn.innerHTML = '🔍';
        searchBtn.className = 'icon-btn';
        searchBtn.onclick = () => {
            searchInput.classList.toggle('hidden');
            if (!searchInput.classList.contains('hidden')) {
                searchInput.focus();
            }
        };

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

        icons.appendChild(searchInput);
        icons.appendChild(searchBtn);
        // Removed Account Button
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