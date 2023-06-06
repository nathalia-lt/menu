import { getFromStorage } from './storage.js';

class CartModel {
    constructor() {
        this.items = getFromStorage('cart') || [];
    }
    addItem(item) {
        this.items.push(item);
    }
    getItems() {
        return this.items;
    }

    removeItem(item) {}

    increaseQuantity(item) {}

    decreaseQuantity(item) {}

    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    getItemsCount() {

    }
}


