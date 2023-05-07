let currentUser = sessionStorage.getItem("currentUser");
let user = JSON.parse(localStorage.getItem(currentUser));
let cartItem = user.cart;

let items = document.querySelector(".items")
let listItem = document.querySelector(".list-item")

function getTotal(cart){
return  (cart.reduce((total, obj)=>{
            return total+ +obj.price;
            },0)).toFixed(2);
}

function updateCart(cart){
    
   if(cartItem.length == 0)
    {items.innerHTML = "<h1> Your cart is Empty!</h1>"
    console.log("cart empty")}
cart.map((data,index)=>{
    console.log("cart items ", data)
    let item = document.createElement("div");
    item.classList="item";
    item.innerHTML = `<div class="image"><img src="${data.image}" alt="Item" /></div>`
   
    let title = document.createElement("div");
    title.classList = "title";
    title.innerText = "Title: "+data.title;
    item.appendChild(title);
    let price = document.createElement("div");
    price.classList = "price";
    price.innerText = "Price: $"+data.price;
    item.appendChild(price);
    let btn = document.createElement("button");
    btn.setAttribute("id",index);
    btn.addEventListener("click",(e)=>{
        e.target.parentElement.remove();
        listItem.lastChild.remove();
        cart.splice(e.target.id, 1);
        user.cart = cart;
        localStorage.setItem(currentUser,JSON.stringify(user));
       console.log("id", e.target.id)
       window.location.reload();
       
    })
    btn.innerText = "Remove From Cart";
    item.appendChild(btn);
    items.appendChild(item);

    // checkout  list
    let row = document.createElement("div");
    let div1 = document.createElement("div");
    div1.innerText = "1. "+data.title ;
    let div2 = document.createElement("div");
    div2.innerText = "$" + data.price +"/-";
    row.classList = "row";
    row.appendChild(div1);
    row.appendChild(div2);
    listItem.appendChild(row);   

    updateTotal(cart)
   
})
}


function updateTotal(cart){
    let total = document.querySelector(".total")
    total.innerText = ''
    let div = document.createElement("div");
    div.innerText = "Total"
    total.appendChild(div);
    let div2 = document.createElement("div");
    div2.innerText = "$"+getTotal(cartItem)+"/-";
    total.appendChild(div2);
    console.log(getTotal(cart));
}

updateCart(cartItem);

document.querySelector(".checkout-btn").addEventListener("click",(e)=>{
    window.location.href = "/razorpay";
})

