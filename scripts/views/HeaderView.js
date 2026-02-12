export class HeaderView {
    constructor(cartService, userService) {
        this.cartService = cartService;
        this.userService = userService;
        window.addEventListener('cart-updated', (e) => this.updateCartCount(e.detail.count));
    }

    render() {
        this.element = document.createElement('header');
        this.loadContent();
        return this.element;
    }

    async loadContent() {
        try {
            const response = await fetch('templates/Header.html');
            const html = await response.text();

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            this.mobileMenu = tempDiv.querySelector('#mobile-menu');
            if (this.mobileMenu) {
                const existingMenu = document.querySelector('.mobile-menu');
                if (existingMenu) existingMenu.remove();

                document.body.appendChild(this.mobileMenu);

                this.mobileMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        this.mobileMenu.classList.remove('active');
                        const hamburger = this.element.querySelector('#hamburger-menu');
                        if (hamburger) hamburger.innerHTML = '☰';
                    });
                });
            }

            const innerContent = tempDiv.querySelector('.header-inner');
            if (innerContent) {
                this.element.appendChild(innerContent);
            }

            const logo = this.element.querySelector('#header-logo');
            if (logo) logo.onclick = () => window.location.hash = '#/';

            const searchInput = this.element.querySelector('#search-input');
            const searchBtn = this.element.querySelector('#search-btn');

            if (searchInput) {
                searchInput.addEventListener('input', () => {
                    searchInput.style.borderBottomColor = 'var(--brand-accent)';
                });

                searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && searchInput.value.trim()) {
                        window.location.hash = `#/shop?search=${encodeURIComponent(searchInput.value.trim())}`;
                        searchInput.classList.add('hidden');
                    }
                });
            }

            if (searchBtn && searchInput) {
                searchBtn.onclick = () => {
                    searchInput.classList.toggle('hidden');
                    if (!searchInput.classList.contains('hidden')) {
                        searchInput.focus();
                    }
                };
            }

            const cartWrapper = this.element.querySelector('#cart-wrapper');
            if (cartWrapper) cartWrapper.onclick = () => window.location.hash = '#/cart';

            const accountBtn = this.element.querySelector('#account-btn');
            if (accountBtn) accountBtn.onclick = () => window.location.hash = '#/account';

            this.updateCartCount(this.cartService.getItemCount());

            const hamburger = this.element.querySelector('#hamburger-menu');
            if (hamburger && this.mobileMenu) {
                hamburger.onclick = () => {
                    this.mobileMenu.classList.toggle('active');
                    hamburger.innerHTML = this.mobileMenu.classList.contains('active') ? '✕' : '☰';
                };
            }

        } catch (error) {
            console.error('Error loading header template:', error);
            this.element.innerHTML = '<div class="container">Error loading header</div>';
        }
    }

    updateCartCount(count) {
        let badge = null;
        if (this.element) {
            badge = this.element.querySelector('#header-cart-count');
        }

        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }
}