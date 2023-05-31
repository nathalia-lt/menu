

// variables

const cartBtn = document.getElementById('cart-btn')
const modalContainer = document.getElementById('modal-container')
const modalContent = document.getElementById('modal-content')
const closeBtn = document.querySelector('.close-btn')

cartBtn.addEventListener('click', (e) => {
    modalContainer.classList.add('show-cart')
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

//adicionar numa array de objetos
//[{name:..., price:...}, {}, {}]

// para ler o que está no data-id do botao utilize as proprieades do dataset
//tenho que colocar numa array todos os item que foram clicados
//depois coloco essas informacoes no event listener do show cart