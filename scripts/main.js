import { CartService } from './services/CartService.js';
import { UserService } from './services/UserService.js';
import { HeaderView } from './views/HeaderView.js';
import { FooterView } from './views/FooterView.js';
import { HomeView } from './views/HomeView.js';
import { ShopView } from './views/ShopView.js';
import { ProductDetailView } from './views/ProductDetailView.js';
import { CartView } from './views/CartView.js';
import { CheckoutView } from './views/CheckoutView.js';
import { AccountView } from './views/AccountView.js';

export class Main {
    constructor() {
        this.appElement = document.getElementById('app');
        this.cartService = new CartService();
        this.userService = new UserService();

        // Inicializar Views
        this.headerView = new HeaderView(this.cartService, this.userService);
        this.footerView = new FooterView();
    }

    async init() {
        // Estructura Base Layout
        this.appElement.innerHTML = ''; // Limpiar

        const header = this.headerView.render();
        this.appElement.appendChild(header);

        this.mainContent = document.createElement('main');
        this.mainContent.id = 'main-content';
        this.mainContent.className = 'fade-in';
        this.appElement.appendChild(this.mainContent);

        const footer = this.footerView.render();
        this.appElement.appendChild(footer);

        // Router Listener
        window.addEventListener('hashchange', () => this.handleRoute());

        // Initial Route
        this.handleRoute();
    }

    async handleRoute() {
        const hash = window.location.hash || '#/';
        const [cleanHash, queryString] = hash.split('?');
        const params = cleanHash.split('/'); // #/product/123 -> ["#", "product", "123"]
        const route = params[1] || ''; // home is default

        // Reset scroll
        window.scrollTo(0, 0);

        // Simple loading state
        this.mainContent.style.opacity = '0.5';

        try {
            this.mainContent.innerHTML = '';
            let view;

            switch (route) {
                case '':
                    view = new HomeView();
                    this.mainContent.appendChild(await view.render());
                    break;
                case 'shop':
                    view = new ShopView();
                    let arg = params[2]; // Category if exists: #/shop/category

                    // If we have a query string search, override arg
                    if (queryString && queryString.includes('search=')) {
                        const searchVal = decodeURIComponent(queryString.split('search=')[1]);
                        arg = { search: searchVal };
                    }
                    this.mainContent.appendChild(await view.render(arg));
                    break;
                case 'product':
                    view = new ProductDetailView(this.cartService);
                    this.mainContent.appendChild(await view.render(params[2]));
                    break;
                case 'cart':
                    view = new CartView(this.cartService);
                    this.mainContent.appendChild(await view.render());
                    break;
                case 'checkout':
                    view = new CheckoutView(this.cartService, this.userService);
                    this.mainContent.appendChild(await view.render());
                    break;
                case 'account':
                    view = new AccountView(this.userService);
                    this.mainContent.appendChild(await view.render());
                    break;
                default:
                    this.mainContent.innerHTML = '<h2>404 - Not Found</h2>';
            }
        } catch (error) {
            console.error('Routing Error:', error);
            this.mainContent.innerHTML = '<h2>Error loading page</h2>';
        } finally {
            // Fade in animation reset
            this.mainContent.className = '';
            void this.mainContent.offsetWidth; // trigger reflow
            this.mainContent.className = 'fade-in';
            this.mainContent.style.opacity = '1';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const main = new Main();
    main.init();
});