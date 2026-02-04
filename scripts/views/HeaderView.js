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

        const navLeft = document.createElement('nav');
        navLeft.className = 'nav-left nav-links';
        navLeft.innerHTML = `
            <a href="#/shop">SELLADO</a>
            <a href="#/shop/accesorios">ACCESORIOS</a>
            <a href="#/shop/premium">COLECCIONES</a>
            <a href="#/shop">NOVEDADES</a>
        `;

        const logo = document.createElement('div');
        logo.className = 'logo';
        logo.innerHTML = 'EL ÚLTIMO Y ME VOY';
        logo.onclick = () => window.location.hash = '#/';

        const icons = document.createElement('div');
        icons.className = 'icons-right';

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
                searchInput.classList.add('hidden');
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

        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger-menu';
        hamburger.innerHTML = '☰';
        hamburger.onclick = () => {
            this.mobileMenu.classList.toggle('active');
            hamburger.innerHTML = this.mobileMenu.classList.contains('active') ? '✕' : '☰';
        };

        this.mobileMenu = document.createElement('div');
        this.mobileMenu.className = 'mobile-menu';
        this.mobileMenu.innerHTML = `
            <nav class="mobile-nav-links">
                <a href="#/shop">SELLADO</a>
                <a href="#/shop/accesorios">ACCESORIOS</a>
                <a href="#/shop/premium">COLECCIONES</a>
                <a href="#/shop">NOVEDADES</a>
            </nav>
        `;

        this.mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.mobileMenu.classList.remove('active');
                hamburger.innerHTML = '☰';
            });
        });

        icons.appendChild(searchInput);
        icons.appendChild(searchBtn);
        icons.appendChild(cartWrapper);
        icons.appendChild(hamburger);

        inner.appendChild(navLeft);
        inner.appendChild(logo);
        inner.appendChild(icons);

        this.element.appendChild(inner);
        document.body.appendChild(this.mobileMenu);

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