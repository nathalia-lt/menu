import { getFromStorage, setToStorage } from '../services/localStorage.js';

export default class CartModel {
    constructor() {
        this.items = getFromStorage('cart') || [];

    }
    addItem(itemObj) {
        const hasItem = this.items.filter(item => {
            return item.id === itemObj.id
        })
        if (hasItem[0]){
            const index = this.items.findIndex(item => item.id === hasItem[0].id)
            this.items[index].quantity += 1
            
        } else {
            // ... indica o que ja esta no objeto e depois da virgula o que eu quero adicionar no meu objeto
            const toBeAdded = {...itemObj, quantity: 1}
            this.items.push(toBeAdded)
        }
        setToStorage('cart', this.items)
    }
    getItems() {
        return this.items;
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id)
        setToStorage('cart', this.items)
    }

    increaseQuantity(id) {
        const index = this.items.findIndex(item => item.id === id )
        this.items[index].quantity += 1
        setToStorage('cart', this.items)

    }

    decreaseQuantity(id) {
        const index = this.items.findIndex(item => item.id === id)
        if (this.items[index].quantity >= 1){
            this.items[index].quantity -= 1
        } 
        if (this.items[index].quantity === 0){
            this.removeItem(id)
            return
        }
        setToStorage('cart', this.items)
    }

    getTotal() {
        let sum = 0
    this.items.forEach(item => {
        //parseFloat para ser um numero e nao concatenar string
                //parseFloat(string)
        sum += parseFloat(item.price) * item.quantity
    })
    //quando eu uso to toFixed retorna uma string
    return sum.toFixed(2)
    }

    getItemsCount() {
        let total = 0
        this.items.forEach(item =>{
            total += item.quantity
        })
        return total
    }
}


