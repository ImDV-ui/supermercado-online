export class Product {
    constructor(name, price, description, category, featured = false) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.featured = featured;
    }
}