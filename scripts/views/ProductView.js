export class ProductView {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'product-grid';
    }

    render(productos) {
        this.element.innerHTML = '';

        if (productos.length === 0) {
            this.element.innerHTML = '<p class="no-products">No hay productos en esta categoría.</p>';
            return this.element;
        }

        productos.forEach(producto => {
            const card = document.createElement('article');
            card.className = 'product-card';

            // Placeholder de imagen (Gris como en la referencia si no hay imagen)
            const imgContainer = document.createElement('div');
            imgContainer.className = 'image-placeholder';
            imgContainer.textContent = 'IMG';

            const info = document.createElement('div');
            info.className = 'product-info';

            const title = document.createElement('h3');
            title.className = 'product-name';
            title.textContent = producto.nombre;

            const price = document.createElement('div');
            price.className = 'product-price';
            price.textContent = `${producto.precio.toFixed(2)} €`;

            info.appendChild(title);
            info.appendChild(price);

            card.appendChild(imgContainer);
            card.appendChild(info);

            this.element.appendChild(card);
        });

        return this.element;
    }
}