export class HeaderView {
    constructor(categories, onCategoryClick) {
        this.categories = categories;
        this.onCategoryClick = onCategoryClick;
    }

    render() {
        const header = document.createElement('header');
        const nav = document.createElement('nav');
        const ul = document.createElement('ul');

        // Botón Home
        const homeLi = document.createElement('li');
        homeLi.textContent = "Home";
        homeLi.onclick = () => this.onCategoryClick(null); // null indica "Home"
        ul.appendChild(homeLi);

        // Botones de Categorías
        this.categories.forEach(cat => {
            const li = document.createElement('li');
            li.textContent = cat.name;
            li.onclick = () => this.onCategoryClick(cat);
            ul.appendChild(li);
        });

        nav.appendChild(ul);
        header.appendChild(nav);
        return header;
    }
}