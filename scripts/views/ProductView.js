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
            card.className = `product-card ${producto.destacado ? 'featured' : ''}`;

            const image = document.createElement('img');
            image.src = producto.imagen; // En un caso real, manejar error de carga
            image.alt = producto.nombre;
            image.className = 'product-image';

            // Fallback imagen si falla
            image.onerror = () => {
                image.src = 'https://placehold.co/300x400?text=No+Image';
            };

            const info = document.createElement('div');
            info.className = 'product-info';

            const categoryTag = document.createElement('span');
            categoryTag.className = 'product-category';
            categoryTag.textContent = producto.categoria;

            const title = document.createElement('h3');
            title.className = 'product-name';
            title.textContent = producto.nombre;

            const desc = document.createElement('p');
            desc.className = 'product-description';
            desc.textContent = producto.descripcion;

            const priceContainer = document.createElement('div');
            priceContainer.className = 'product-price';

            const price = document.createElement('span');
            price.textContent = `${producto.precio.toFixed(2)} €`;

            const btn = document.createElement('button');
            btn.className = 'add-to-cart';
            btn.textContent = 'Añadir';
            btn.onclick = () => alert(`Añadido ${producto.nombre} al carrito`);

            priceContainer.appendChild(price);
            priceContainer.appendChild(btn);

            info.appendChild(categoryTag);
            info.appendChild(title);
            info.appendChild(desc);
            info.appendChild(priceContainer);

            card.appendChild(image);
            card.appendChild(info);

            this.element.appendChild(card);
        });

        return this.element;
    }
}
