import { getFromStorage, setToStorage } from "../services/localStorage.js"
// variables

function initCart() {

    const cartBtn = document.getElementById('cart-btn')
    const modalContainer = document.getElementById('modal-container')
    const modalContent = document.getElementById('modal-content')
    const closeBtn = document.querySelector('.close-btn')


    let cartList = getFromStorage('cart') || []
    //console.log('Carregou o cart.js')


    const btnsAddCart = document.querySelectorAll('.add-to-cart')
    //coloco na minha array(cart), as meals que eu quero

    btnsAddCart.forEach(btnAddCart => {
        btnAddCart.addEventListener('click', () =>{
            //abaixo eu to transformando o meu dataSet (DOM string map) into an object
                const btnAddCartObj = {...btnAddCart.dataset}
                const hasItem = cartList.filter(item => {
                    return item.id === btnAddCartObj.id
                })
                if (hasItem[0]){
                    const index = cartList.findIndex(item => item.id === hasItem[0].id)
                    console.log(index)
                    cartList[index].quantity += 1
                    
                } else {
                    // ... indica o que ja esta no objeto e depois da virgula o que eu quero adicionar no meu objeto
                    const toBeAdded = {...btnAddCartObj, quantity: 1}
                    cartList.push(toBeAdded)
                }
                setToStorage('cart', cartList)
                
                console.log(cartList)
        })
    })

function listTemplate(meal){
    return `
    <li>${meal.name} - <button class="increase-btn" data-id="${meal.id}" > + </button>(${meal.quantity})<button class="decrease-btn" data-id="${meal.id}"> - </button>  $ ${meal.price} 
        <button class="removeBtn" data-id="${meal.id}" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
            </svg>
        </button> 
    </li>    
    `
}

function noItemsTemplate(){
    return `<p>There are no items in your cart</p>`
}

function totalTemplate(total){

    return `
    <div class="total-container">
    <strong class= "total-content">Total:  </strong>  $ ${total}
    </div>`
}

function totalSum(meals){
    let sum = 0
    meals.forEach(meal => {
        //parseFloat para ser um numero e nao concatenar string
        sum += parseFloat(meal.price) * meal.quantity
    })
    //quando eu uso to toFixed retorna uma string
    return sum.toFixed(2)
}

function renderCart(meals, total){
    const listContainer = document.getElementById('list-container')
    const totalCart = document.getElementById('total-cart')
    //below, it clears the list before updating them
    listContainer.innerHTML = ''
    if (meals.length === 0){
        // modalContent.innerHTML = listTemplate()
        listContainer.innerHTML = noItemsTemplate()
    }
    else {
        meals.forEach(meal => {
            const html = listTemplate(meal)
            //estou somando ao que ja tem
            listContainer.innerHTML += html
            // modalContent.innerHTML += html
            
        });
    }
    totalCart.innerHTML = totalTemplate(total)

    //removeBtns
    const removeBtns = document.querySelectorAll('.removeBtn')
    removeBtns.forEach(removeBtn => {
        removeBtn.addEventListener('click', () => {
            const idToBeRemoved = removeBtn.dataset.id
            cartList = cartList.filter(item => item.id !== idToBeRemoved)
            setToStorage('cart', cartList)
            renderCart(cartList, totalSum(cartList))
        })
    })

    //increaseBtns
    const increaseBtns = document.querySelectorAll('.increase-btn')

    increaseBtns.forEach(increaseBtn => {
        increaseBtn.addEventListener('click', (e) =>{
            console.log('increase bottom', e)
            const idToBeIncreased = increaseBtn.dataset.id
            console.log(idToBeIncreased)
            const index = cartList.findIndex(item => item.id === idToBeIncreased )
            //pergunta: pq aqui meu index esta retornando zero, mas estou tendo o resultado que eu quero no console.
            //comecei a ter o resultado depois de renderizar a pagina
            console.log('index', index)
            cartList[index].quantity += 1
            setToStorage('cart', cartList)
            renderCart(cartList, totalSum(cartList))
        })
    })

    //decreaseBtns
    const decreaseBtns = document.querySelectorAll('.decrease-btn')
    decreaseBtns.forEach(decreaseBtn  => {
        decreaseBtn.addEventListener('click', () => {
            const idToBeDecreased = decreaseBtn.dataset.id
            const index = cartList.findIndex(item => item.id === idToBeDecreased)
            if (cartList[index].quantity > 1){
                cartList[index].quantity -= 1
            }else{

            }
            setToStorage('cart', cartList)
            renderCart(cartList, totalSum(cartList))
        })
    })



}





//eu tennho uma array que e uma lista e agora eu preciso mostrar essa lista
//e como eu display lista em html? li

cartBtn.addEventListener('click', (e) => {
    modalContainer.classList.add('show-cart')
    //a hora que eu clico no botao eu renderizo a lista
    
    renderCart(cartList, totalSum(cartList))

})

closeBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    modalContainer.classList.remove('show-cart')
})

modalContainer.addEventListener('click', (e) =>{
    modalContainer.classList.remove('show-cart')
})


modalContent.addEventListener('click', (e) =>{
    //pq o modalContent esta dentro do container, ele responde to the event
    //mas nao queremos que o evento aconteca no content. Entao paramos a propagacao
    e.stopPropagation()
})

console.log('Terminour de carregar o cart.js')}
//aqui eu quero selecionar meals atraves do add-to-cart button to my cart
//para eu ler as data que coloquei no meu botao eu acesso atravez do dataset
//que fica em formato de objeto


//adicionar numa array de objetos
//[{name:..., price:...}, {}, {}]

// para ler o que está no data-id do botao utilize as proprieades do dataset
//tenho que colocar numa array todos os item que foram clicados
//depois coloco essas informacoes no event listener do show cart

export {initCart}