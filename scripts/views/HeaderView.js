export class HeaderView {
    constructor() {
        this.element = document.createElement('header');
    }

    render(categorias, onCategoryClick) {
        this.element.innerHTML = '';

        const homeBtn = document.createElement('button');
        homeBtn.textContent = 'Home';
        homeBtn.classList.add('category-btn', 'active');
        homeBtn.addEventListener('click', () => {
            this.updateActiveButton(homeBtn);
            onCategoryClick(null);
        });
        this.element.appendChild(homeBtn);

        categorias.forEach(categoria => {
            const btn = document.createElement('button');
            btn.textContent = categoria.nombre;
            btn.classList.add('category-btn');
            btn.addEventListener('click', () => {
                this.updateActiveButton(btn);
                onCategoryClick(categoria.id);
            });
            this.element.appendChild(btn);
        });

        return this.element;
    }

    updateActiveButton(activeBtn) {
        const buttons = this.element.querySelectorAll('.category-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
}
