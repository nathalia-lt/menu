import { getFromStorage, setToStorage } from "../services/localStorage.js"
import CartModel from "./cartModel.js"
import CartView from "./cartView.js"
// variables

//O cart.js esta fazendo o papel de controler


function initCart() {
    const cart = new CartModel()
    const view = new CartView(addRemoveItemEventToBtns, addIncreaseQuantityEventToBtns, addDecreaseQuantityEventToBtns)

    const cartBtn = document.getElementById('cart-btn')
    const closeBtn = document.querySelector('.close-btn')


    view.renderItemsCount(cart.getItemsCount())

    const btnsAddCart = document.querySelectorAll('.add-to-cart')
    //coloco na minha array(cart), as meals que eu quero

    btnsAddCart.forEach(btnAddCart => {
        btnAddCart.addEventListener('click', () =>{
            //abaixo eu to transformando o meu dataSet (DOM string map) into an object
                const btnAddCartObj = {...btnAddCart.dataset}
                cart.addItem(btnAddCartObj)
                view.renderItemsCount(cart.getItemsCount())
        })
    })

    function addRemoveItemEventToBtns() {
        const removeBtns = document.querySelectorAll('.removeBtn')
        removeBtns.forEach(removeBtn => {
            removeBtn.addEventListener('click', () => {
                const idToBeRemoved = removeBtn.dataset.id
                //aqui eu to chamando o objeto cart que foi criado atraves da minha classe
                cart.removeItem(idToBeRemoved)
                view.renderCart(cart.getItems(), cart.getTotal())
                view.renderItemsCount(cart.getItemsCount())
            })
        })
    }

    function addIncreaseQuantityEventToBtns() {
        const increaseBtns = document.querySelectorAll('.increase-btn')

        increaseBtns.forEach(increaseBtn => {
            increaseBtn.addEventListener('click', (e) =>{
                const idToBeIncreased = increaseBtn.dataset.id
                //aqui eu to chamando o objeto cart que foi criado atraves da minha classe
                cart.increaseQuantity(idToBeIncreased)
                view.renderCart(cart.getItems(), cart.getTotal())
                view.renderItemsCount(cart.getItemsCount())
            })
        })

    }

    function addDecreaseQuantityEventToBtns() {
        const decreaseBtns = document.querySelectorAll('.decrease-btn')
        decreaseBtns.forEach(decreaseBtn  => {
            decreaseBtn.addEventListener('click', () => {
                const idToBeDecreased = decreaseBtn.dataset.id
                //aqui eu to chamando o objeto cart que foi criado atraves da minha classe
                cart.decreaseQuantity(idToBeDecreased)
                view.renderCart(cart.getItems(), cart.getTotal())
                view.renderItemsCount(cart.getItemsCount())
            })
        })
    }

    cartBtn.addEventListener('click', (e) => {
        view.openModal()
        //a hora que eu clico no botao eu renderizo a lista
        view.renderCart(cart.getItems(), cart.getTotal())
    })

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        view.closeModal()
    })

}



// para ler o que está no data-id do botao utilize as proprieades do dataset
//tenho que colocar numa array todos os item que foram clicados
//depois coloco essas informacoes no event listener do show cart

export {initCart}