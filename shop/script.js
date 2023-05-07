// const product = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };

//check wether the user loged in or not 
let currentUser = sessionStorage.getItem("currentUser");
if(!currentUser)
  window.location.href = "/f3shopping-cart/";

 //get user cart stored previously
 let cart = [];
 let user = JSON.parse(localStorage.getItem(currentUser));
 if(user.cart)
    cart = user.cart;  

//for loging out 
document.querySelector("#logout").addEventListener("click",(e)=>{
  sessionStorage.removeItem("currentUser");
  window.location.href = "/f3shopping-cart/"
})  

let all, mens, womens, jewellery, electronic; //product categories

//Fetch products from fakestorageapi.com
async function fetchData() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data =  await response.json();
    //all products
    all = data;

    addColorSize(all);
    console.log(all);
 
    populate(all);  
   
  } catch (error) {
    console.error('Error: ',error.message);
  }
}

fetchData();

//populate products on screen
function populate(product){
  let items = document.querySelector(".items");
  items.innerHTML = '';
  product.map(obj=>{
    let item = document.createElement("div")
    item.setAttribute("class", "item");
    item.innerHTML = `<div class="image"><img src="${obj.image}" alt="Item" /></div>
        <div class="info">
          <div class="row">         
            <div class="price">Rs.${obj.price}</div>
            <div class="sized">S,M,L</div>
          </div>
          <div class="colors">
            Colors:
            <div class="row">
              <div class="circle" style="background-color: #000"></div>
              <div class="circle" style="background-color: #4938af"></div>
              <div class="circle" style="background-color: #203d3e"></div>
            </div>
          </div>
          <div class="row">Rating:${obj.rating.rate}</div>
        </div>`

  //for each product create addtocart button      
  let button = document.createElement("button");
  button.setAttribute("id", "addBtn")
  button.innerText = "Add to Cart";

  //adding eventlistener to each addtocart button
  button.addEventListener("click", (e)=>{
      cart.push(obj);
      alert("added to cart " +obj.title)
       badge.innerText = cart.length;      
         user.cart = cart;
         localStorage.setItem(currentUser,JSON.stringify(user))
         
  })

  item.appendChild(button);
  items.appendChild(item); 
  })

  
  
   //updating cart items and show number of total items in cart
   let mycartElem = document.querySelector(".mycart");
   let badge = document.createElement("span");
   badge.innerText = cart.length;
   mycartElem.innerText = 'My Cart '
   mycartElem.appendChild(badge);
  
}

document.getElementById("all").addEventListener("click", (e)=>{
  //toggle filter button
  let active = document.querySelector(".active");
  active.classList.remove("class", "active");
  e.target.classList.add("active");
  
  //popuate filtered data  
  populate(all)
})


document.getElementById("mens").addEventListener("click", (e)=>{
   //toggle filter button
  let active = document.querySelector(".active");
  active.classList.remove("class", "active");
  e.target.classList.add("active");
  
  //filter products for mens 
  mens = all.filter(obj=>{
    return obj.category === "men's clothing";
  })

  //popuate filtered data
  populate(mens)
})

document.getElementById("womens").addEventListener("click", (e)=>{
  //toggle filter button
  let active = document.querySelector(".active");
  active.classList.remove("class", "active");
  e.target.classList.add("active");
 
  //filter products for womens
  womens = all.filter(obj=>{
    return obj.category === "women's clothing"
  })

  //popuate filtered data
  populate(womens)
})

document.getElementById("jewellery").addEventListener("click", (e)=>{
  //toggle filter button
  let active = document.querySelector(".active");
  active.classList.remove("class", "active");
  e.target.classList.add("active");

  //filter products for jewellery
  jewellery = all.filter(obj=>{
    return obj.category === "jewelery"
  })

  //popuate filtered data
  populate(jewellery)
})

document.getElementById("electronics").addEventListener("click", (e)=>{
  //toggle filter button
  let active = document.querySelector(".active");
  active.classList.remove("class", "active");
  e.target.classList.add("active");

  //filter products for electronics
  electronic = all.filter(obj=>{
    return obj.category === "electronics"
  })

  //popuate filtered data
  populate(electronic)
})

document.querySelector("#search").addEventListener("change", (e)=>{
  let filteredData = all.filter((obj)=>{
    return obj.title.toLowerCase().includes(e.target.value.toLowerCase()) 
  }) 
  console.log(filteredData)
  if(filteredData.length == 0)
   filteredData = all.filter(obj=>{
    return obj.color.toLowerCase().includes(e.target.value.toLowerCase()) 
    
   })
   if(filteredData.length == 0)
     alert('Sorry :( No data found related to your search!')
     e.target.value = ''
  //popuate filtered data
  populate(filteredData);

})

document.getElementById("range").addEventListener("change", (e)=>{
  let filteredData = all.filter((obj)=>{
    return Math.floor(obj.rating.rate) == e.target.value
  }) 
  //popuate filtered data
  populate(filteredData);  
})

//adding event listener to all the sizes check boxes
let sizes = ["s", "l", "m", "xl"] 
sizes.map(size=>{
document.getElementById(size).addEventListener("change",(e)=>{
  let filteredData = all;
  if(e.target.checked)
    filteredData = all.filter((obj)=>{     
    return obj.size == size; 
  }) 
     
  //popuate filtered data
  populate(filteredData);
})
})


//adding event listener to all the color check boxes
let colors = ["red", "green", "blue", "black", "white"];

colors.map((color)=>{
document.getElementById(color).addEventListener("change",(e)=>{
  let filteredData = all;
  if(e.target.checked)
    filteredData = all.filter((obj)=>{     
    return obj.color == color; 
  }) 
  //popuate filtered data
  populate(filteredData);
})
})

//adding Color and Size property to all the products randomly
function addColorSize(objarr){     
  objarr.map((obj)=>{
    let ranColor = Math.floor(Math.random()*10%5);
    let ranSize = Math.floor(Math.random()*10%4);
    obj.color = colors[ranColor];
    obj.size = sizes[ranSize];
  }) 
}

