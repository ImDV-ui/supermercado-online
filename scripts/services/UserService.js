export class UserService {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('user')) || null;
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    }

    isLoggedIn() {
        return !!this.currentUser;
    }

    getUser() {
        return this.currentUser;
    }

    login(email, password) {
        // Simulación de login exitoso
        if (email && password) {
            this.currentUser = {
                id: 'u1',
                name: 'Entrenador Top',
                email: email,
                avatar: 'https://ui-avatars.com/api/?name=Entrenador+Top&background=000&color=fff'
            };
            this._save();
            return true;
        }
        return false;
    }

    logout() {
        this.currentUser = null;
        this._save();
        window.location.reload(); // Recarga simple para resetear estado visual
    }

    addToWishlist(product) {
        if (!this.wishlist.find(p => p.id === product.id)) {
            this.wishlist.push(product);
            this._saveWishlist();
        }
    }

    removeFromWishlist(productId) {
        this.wishlist = this.wishlist.filter(p => p.id !== productId);
        this._saveWishlist();
    }

    getWishlist() {
        return this.wishlist;
    }

    _save() {
        localStorage.setItem('user', JSON.stringify(this.currentUser));
    }

    _saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }
}
