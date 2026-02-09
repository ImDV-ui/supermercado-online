export class ProductDatabase {
    static categories = [];

    static async init() {
        try {
            const response = await fetch('data/products.json');
            if (!response.ok) throw new Error('Failed to load products');
            this.categories = await response.json();
            return true;
        } catch (error) {
            console.error('Error loading products from JSON:', error);
            this.categories = [];
            return false;
        }
    }

    static obtenerDatos() {
        return this.categories;
    }
}