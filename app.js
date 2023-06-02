// import './cart/cart.js'
import { initCart } from './cart/cart.js';
import {menu} from './data/menu.js'
console.log('Carregou o app.js')


const buttons = [
  'All',
  'Breakfast',
  'Lunch',
  'Shakes',
  'Dinner'
]

// items


//to display card
function itemTemplate(item){
    // const article = document.createElement('article')
    // article.classList.add('menu-item')
    // article.innerHTML = `
    //   <img class="menu-item__photo" src="${item.img}" alt="burger image">
    //   <div class="item-info">
    //       <header>
    //           <h4>${item.title}</h4>
    //           <h4 class="price">$${item.price}</h4>
    //       </header>
    //       <p class="item-text">${item.desc}</p>
    //   </div>
    // `
    // return article
    //when I use template strings ``, I can use it dinamic.
    return `
      <article class="menu-item">
        <div>
          <img class="menu-item__photo" src="${item.img}" alt="burger image">
          <button class="add-to-cart" data-id="${item.id}" data-price="${item.price}" data-name="${item.title}">Add to cart</button>
        </div>
        
        <div class="item-info">
            <header>
                <h4>${item.title}</h4>
                <h4 class="price">$${item.price}</h4>
            </header>
            <p class="item-text">${item.desc}</p>
            
        </div>
      </article>
    `
}




function itemNotFoundTemplate(){
  return `
    <h4 class="empty-search">No items matched your search</h4>
  `
}

// percorrer o array de menu e para cada item do array chamar a função cardTemplate
// e depois vamos adicionar o resultado no elemento com a classe menu-items
function renderItems(items){
  const menuItems = document.getElementById('menu-items')
  menuItems.innerHTML = ''

  if (items.length === 0){
    menuItems.innerHTML = itemNotFoundTemplate()      
  } 
  else {
    items.forEach( item => {
      const html = itemTemplate(item)
      //append tenho que adicionar um elemento e nao string
      //entao eu posso adicionar uma string no html
      menuItems.innerHTML += html
    })
  }
}


function buttonTemplate(btn){
  return `<button id='${btn}' class='filter-btn'>${btn}</button>`
}


function renderButtons(){
  const buttonsContainer = document.getElementById('btns-container')
  //do I need to put an empty string here?
  //buttonsContainer.innerHTML = ''
  buttons.forEach((btn) => {
    //console.log(btn)
    const htmlBtn = buttonTemplate(btn)
    buttonsContainer.innerHTML += htmlBtn
    
  })
}

renderButtons(buttons)



//returns a node object or a node list (querySelectorAll), which is an arraylkie object, we can use forEach
//HTMLcolletction (getElementsByTheTagName) podemos manipular index e lenght, but not array maethods (forEach)
//every time that I assing an element to a variable I have access to a node object
//vamos selecionar os botoes e percorrer a lista de botoes 
const btns = document.querySelectorAll('.filter-btn');
//loop no nodelist, so com forEach
btns.forEach(btn => {
    btn.addEventListener('click', () => {
      // filtrar a lista de menu com base no texto do botao
      const category = btn.textContent.toLocaleLowerCase().trim()
      if (category === 'all'){
        renderItems(menu)
        return
      }
      const filteredMenu = menu.filter(item => item.category === category)
      renderItems(filteredMenu)
    })
})

//iniciar a pagina com todos os items


renderItems(menu)

// ------------------------------------------------------

//ADDING MEALS TO MY CART

//aqui eu quero selecionar meals atraves do add-to-cart button to my cart
//para eu ler as data que coloquei no meu botao eu acesso atraves do dataset
//que fica em formato de objeto

const btnsAddCart = document.querySelectorAll('.add-to-cart')




      console.log('Terminour de carregar o app.js')
initCart()
//adicionar numa array de objetos
//[{name:..., price:...}, {}, {}]

// para ler o que está no data-id do botao utilize as proprieades do dataset
//tenho que colocar numa array todos os item que foram clicados
//depois coloco essas informacoes no event listener do show cart