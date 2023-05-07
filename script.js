// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

document.querySelector(".login-btn").addEventListener("click",(e)=>{
    window.location.href = "/login";
})
document.querySelector(".signup-btn").addEventListener("click",(e)=>{
    window.location.href = "/signup";
})