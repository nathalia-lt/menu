
export default class CartView{
    constructor(addRemoveItemEventToBtns, addIncreaseQuantityEventToBtns, addDecreaseQuantityEventToBtns){
        this.addRemoveItemEventToBtns = addRemoveItemEventToBtns
        this.addIncreaseQuantityEventToBtns = addIncreaseQuantityEventToBtns
        this.addDecreaseQuantityEventToBtns = addDecreaseQuantityEventToBtns

        this.modal = {
            container: document.getElementById('modal-container'),
            content: document.getElementById('modal-content'),
        }

        this.modal.container.addEventListener('click', (e) =>{
            this.modal.container.classList.remove('show-cart')
        })
        
        this.modal.content.addEventListener('click', (e) =>{
            //pq o modalContent esta dentro do container, ele responde to the event
            //mas nao queremos que o evento aconteca no content. Entao paramos a propagacao
            e.stopPropagation()
        })
    }

    openModal(){
        this.modal.container.classList.add('show-cart')
    }

    closeModal(){
        this.modal.container.classList.remove('show-cart')
    }

    listTemplate(meal){
        return `
        <li>
        <div class="meal-name">${meal.name}-</div> 
        <div class="increase-deacrese-btn-container"> 
            <button class="increase-btn" data-id="${meal.id}" > 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
                </svg>
            </button>${meal.quantity}
            <button class="decrease-btn" data-id="${meal.id}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z" clip-rule="evenodd" />
                </svg>
            </button>  
        </div>

        <div class="meal-price" >$ ${meal.price} </div>
            <button class="removeBtn" data-id="${meal.id}" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                </svg>
            </button> 
        </li>    
        `
    }
    
    noItemsTemplate(){
        return `<p class="no-items-cart">There are no items in your cart</p>`
    }
    
    totalTemplate(total){
        return `
        <div class="total-container">
        <strong class= "total-content">Total:  </strong>  $ ${total}
        </div>`
    }

    renderItemsCount(total){
        const cartItemCount = document.getElementById('cart-item-count')
        cartItemCount.innerHTML = total
    }

    renderCart(meals, total){
        const listContainer = document.getElementById('list-container')
        const totalCart = document.getElementById('total-cart')
        //below, it clears the list before updating them
        listContainer.innerHTML = ''
        if (meals.length === 0){
            // modalContent.innerHTML = listTemplate()
            listContainer.innerHTML = this.noItemsTemplate()
        }
        else {
            meals.forEach(meal => {
                const html = this.listTemplate(meal)
                //estou somando ao que ja tem
                listContainer.innerHTML += html
                // modalContent.innerHTML += html
            });
        }
        totalCart.innerHTML = this.totalTemplate(total)

        this.addRemoveItemEventToBtns()
        this.addIncreaseQuantityEventToBtns()
        this.addDecreaseQuantityEventToBtns()
    }
}