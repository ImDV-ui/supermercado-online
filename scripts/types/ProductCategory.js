export class ProductCategory {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }
}
