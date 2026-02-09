export class AccountView {
    constructor(userService) {
        this.userService = userService;
    }

    async render() {
        const container = document.createElement('div');
        container.className = 'container fade-in';
        container.style.paddingTop = '40px';
        container.style.paddingBottom = '80px';
        container.style.maxWidth = '600px';

        if (this.userService.isLoggedIn()) {
            this.renderDashboard(container);
        } else {
            this.renderLogin(container);
        }

        return container;
    }

    async renderLogin(container) {
        try {
            const response = await fetch('templates/AccountLogin.html');
            const html = await response.text();
            container.innerHTML = html;

            const form = container.querySelector('#login-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = form.querySelector('#email').value;
                const pass = form.querySelector('#password').value;

                if (this.userService.login(email, pass)) {
                    window.location.reload();
                }
            });
        } catch (error) {
            console.error('Error loading login template:', error);
            container.innerHTML = '<h2>Error loading login form</h2>';
        }
    }

    async renderDashboard(container) {
        const user = this.userService.getUser();

        try {
            const response = await fetch('templates/AccountDashboard.html');
            let html = await response.text();

            html = html.replace('${avatar}', user.avatar)
                .replace('${name}', user.name)
                .replace('${email}', user.email);

            container.innerHTML = html;

            const avatarImg = container.querySelector('#user-avatar');
            if (avatarImg) avatarImg.src = user.avatar;

            const nameEl = container.querySelector('#user-name');
            if (nameEl) nameEl.textContent = `Hola, ${user.name}`;

            const emailEl = container.querySelector('#user-email');
            if (emailEl) emailEl.textContent = user.email;

            container.querySelector('#logout-btn').onclick = () => {
                this.userService.logout();
            };
        } catch (error) {
            console.error('Error loading dashboard template:', error);
            container.innerHTML = '<h2>Error loading dashboard</h2>';
        }
    }
}
