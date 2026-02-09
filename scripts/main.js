import { CartService } from './services/CartService.js';
import { ProductDatabase } from './database/productDatabase.js';
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

        this.headerView = new HeaderView(this.cartService, this.userService);
        this.footerView = new FooterView();
    }

    async init() {
        await ProductDatabase.init();

        this.appElement.innerHTML = '';

        const header = this.headerView.render();
        this.appElement.appendChild(header);

        this.mainContent = document.createElement('main');
        this.mainContent.id = 'main-content';
        this.mainContent.className = 'fade-in';
        this.appElement.appendChild(this.mainContent);

        const footer = this.footerView.render();
        this.appElement.appendChild(footer);

        window.addEventListener('hashchange', () => this.handleRoute());

        this.handleRoute();
    }

    async handleRoute() {
        const hash = window.location.hash || '#/';
        const [cleanHash, queryString] = hash.split('?');
        const params = cleanHash.split('/');
        const route = params[1] || '';

        window.scrollTo(0, 0);

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
                    let arg = params[2];

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
            this.mainContent.className = '';
            void this.mainContent.offsetWidth;
            this.mainContent.className = 'fade-in';
            this.mainContent.style.opacity = '1';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const main = new Main();
    main.init();
});