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

    renderLogin(container) {
        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="margin-bottom: 10px;">ACCESO CLIENTES</h1>
                <p style="color: var(--text-sec);">Inicia sesión para ver tus pedidos y wishlist</p>
            </div>
            
            <div style="border: 1px solid var(--border); padding: 40px; border-radius: 8px;">
                <form id="login-form">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="email" required placeholder="demo@user.com">
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input type="password" id="password" required placeholder="******">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">INICIAR SESIÓN</button>
                    <div style="text-align: center; margin-top: 20px; font-size: 0.8rem;">
                        <span style="color: var(--text-sec);">¿No tienes cuenta?</span> <a href="#" style="text-decoration: underline;">Regístrate</a>
                    </div>
                </form>
            </div>
        `;

        const form = container.querySelector('#login-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('#email').value;
            const pass = form.querySelector('#password').value;

            if (this.userService.login(email, pass)) {
                window.location.reload();
            }
        });
    }

    renderDashboard(container) {
        const user = this.userService.getUser();

        container.innerHTML = `
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 40px;">
                <img src="${user.avatar}" alt="Avatar" style="width: 80px; height: 80px; border-radius: 50%;">
                <div>
                    <h1>Hola, ${user.name}</h1>
                    <p style="color: var(--text-sec);">${user.email}</p>
                </div>
            </div>

            <div style="display: grid; gap: 30px;">
                <div style="border: 1px solid var(--border); padding: 20px; border-radius: 8px;">
                    <h3 style="margin-bottom: 20px;">MIS PEDIDOS RECIENTES</h3>
                    <div style="background: var(--bg-secondary); padding: 15px; border-radius: 4px; margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between;">
                            <strong>#94821 - Entregado</strong>
                            <span>150.00 €</span>
                        </div>
                        <p style="font-size: 0.85rem; color: var(--text-sec); margin-top: 5px;">3 artículos • 01/02/2026</p>
                    </div>
                     <div style="background: var(--bg-secondary); padding: 15px; border-radius: 4px;">
                        <div style="display: flex; justify-content: space-between;">
                            <strong>#82103 - En Proceso</strong>
                            <span>45.95 €</span>
                        </div>
                        <p style="font-size: 0.85rem; color: var(--text-sec); margin-top: 5px;">1 artículo • 03/02/2026</p>
                    </div>
                </div>

                <div style="border: 1px solid var(--border); padding: 20px; border-radius: 8px;">
                     <h3 style="margin-bottom: 20px;">MI WISHLIST</h3>
                     <p>No tienes artículos guardados aún.</p>
                </div>
                
                <button id="logout-btn" class="btn" style="border-color: red; color: red;">CERRAR SESIÓN</button>
            </div>
        `;

        container.querySelector('#logout-btn').onclick = () => {
            this.userService.logout();
        };
    }
}
