export class Product {
    constructor(id, nombre, precio, descripcion, categoria, imagen, destacado = false) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.imagen = imagen;
        this.destacado = destacado;
    }
}
