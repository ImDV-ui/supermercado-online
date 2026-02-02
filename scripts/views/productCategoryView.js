export class ProductView {
    constructor(container) {
        this.container = container;
    }

    render(category, allCategories = []) {
        this.container.innerHTML = "";
        let productsToShow = [];
        let titleText = "";

        if (category) {
            productsToShow = category.products;
            titleText = category.name;
        } else {
            // Lógica Home: Mostrar destacados de todas las categorías
            titleText = "Productos Destacados";
            allCategories.forEach(cat => {
                productsToShow.push(...cat.products.filter(p => p.featured));
            });
        }

        const title = document.createElement('h2');
        title.textContent = titleText;
        this.container.appendChild(title);

        const grid = document.createElement('div');
        grid.className = "product-grid";

        productsToShow.forEach(prod => {
            const card = document.createElement('div');
            card.className = "product-card";
            card.innerHTML = `
                <h3>${prod.name}</h3>
                <p>${prod.description}</p>
                <span class="price">${prod.price}€</span>
            `;
            grid.appendChild(card);
        });

        this.container.appendChild(grid);
    }
}