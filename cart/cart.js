
// variables

const cartBtn = document.getElementById('cart-btn')
const modalContainer = document.getElementById('modal-container')
const modalContent = document.getElementById('modal-content')
const closeBtn = document.querySelector('.close-btn')
let cartList = []
export {cartList}

console.log(cartList)
function listTemplate(meal){
    return `<li>oi</li>`
    
}


function renderList(meals){
    const listContainer = document.getElementById('list-container')
    //below, it clears the list before updating them
    listContainer.innerHTML = ''
    if (meals.length === 0){
        // modalContent.innerHTML = listTemplate()
        listContainer.innerHTML = listTemplate()
    }
    else {
        meals.forEach(meal => {
            const html = listTemplate(meal)
            listContainer.innerHTML += html
            // modalContent.innerHTML += html
        });
    }
}


//eu tennho uma array que e uma lista e agora eu preciso mostrar essa lista
//e como eu display lista em html? li

cartBtn.addEventListener('click', (e) => {
    modalContainer.classList.add('show-cart')
    //console.log(cartList)

})

closeBtn.addEventListener('click', (e) => {
    console.log('clicou o close')
    e.stopPropagation()
    modalContainer.classList.remove('show-cart')
})

modalContainer.addEventListener('click', (e) =>{
    console.log(e)
    modalContainer.classList.remove('show-cart')
})


modalContent.addEventListener('click', (e) =>{
    //pq o modalContent esta dentro do container, ele responde to the event
    //mas nao queremos que o evento aconteca no content. Entao paramos a propagacao
    console.log(e)
    e.stopPropagation()
})

renderList(cartList)

//aqui eu quero selecionar meals atraves do add-to-cart button to my cart
//para eu ler as data que coloquei no meu botao eu acesso atravez do dataset
//que fica em formato de objeto


//adicionar numa array de objetos
//[{name:..., price:...}, {}, {}]

// para ler o que está no data-id do botao utilize as proprieades do dataset
//tenho que colocar numa array todos os item que foram clicados
//depois coloco essas informacoes no event listener do show cart