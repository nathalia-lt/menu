const buttons = [
  'All',
  'Breakfast',
  'Lunch',
  'Shakes',
  'Dinner'
]

// items
const menu = [
    {
      id: 1,
      title: "buttermilk pancakes",
      category: "breakfast",
      price: 15.99,
      img: "./images/item-1.jpeg",
      desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    },
    {
      id: 2,
      title: "diner double",
      category: "lunch",
      price: 13.99,
      img: "./images/item-2.jpeg",
      desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    },
    {
      id: 3,
      title: "godzilla milkshake",
      category: "shakes",
      price: 6.99,
      img: "./images/item-3.jpeg",
      desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    },
    {
      id: 4,
      title: "country delight",
      category: "breakfast",
      price: 20.99,
      img: "./images/item-4.jpeg",
      desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
    },
    {
      id: 5,
      title: "egg attack",
      category: "lunch",
      price: 22.99,
      img: "./images/item-5.jpeg",
      desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
    },
    {
      id: 6,
      title: "oreo dream",
      category: "shakes",
      price: 18.99,
      img: "./images/item-6.jpeg",
      desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
    },
    {
      id: 7,
      title: "bacon overflow",
      category: "breakfast",
      price: 8.99,
      img: "./images/item-7.jpeg",
      desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
    },
    {
      id: 8,
      title: "american classic",
      category: "lunch",
      price: 12.99,
      img: "./images/item-8.jpeg",
      desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
    },
    {
      id: 9,
      title: "quarantine buddy",
      category: "shakes",
      price: 16.99,
      img: "./images/item-9.jpeg",
      desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
];


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
        <img class="menu-item__photo" src="${item.img}" alt="burger image">
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


// inicio tentando adicionar os botoes dinamicamente

function buttonTemplate(btn){
  return `<button id='${btn}' class='btn'> ${btn} </button>`
}
console.log('button template', buttonTemplate())


function renderButtons(){
  const buttonsContainer = document.getElementById('btns-container')
  //do I need to put an empty string here?
  buttonsContainer.innerHTML = ''
  buttons.forEach((btn) => {
    //console.log(btn)
    const htmlBtn = console.log(buttonTemplate(btn))
    buttonsContainer.innerHTML += htmlBtn
    //console.log(htmlBtn)
  })
}
//renderButtons(buttons)
// fim da logica

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

//returns a node object or a node list (querySelectorAll), which is an arraylkie object, we can use forEach
//HTMLcolletction (getElementsByTheTagName) podemos manipular index e lenght, but not array maethods (forEach)
//every time that I assing an element to a variable I have access to a node object
//vamos selecionar os botoes e percorrer a lista de botoes 
const btns = document.querySelectorAll('button');
//loop no nodelist, so com forEach
btns.forEach(btn => {
    btn.addEventListener('click', () => {
      // filtrar a lista de menu com base no texto do botao
      const category = btn.textContent.toLocaleLowerCase()
      if (category === 'all'){
        renderItems(menu)
        return
      }

      const filteredMenu = menu.filter(item => item.category === category)
      renderItems(filteredMenu)
    })
})

//iniciar a pagina com todos os items

renderButtons(buttons)

renderItems(menu)
