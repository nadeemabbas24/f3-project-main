// Write your script here
let currentUser = sessionStorage.getItem("currentUser");
let user = JSON.parse(localStorage.getItem(currentUser));

//Edit your name in your profile
document.querySelector("#fname").value = user.fname;
document.querySelector("#lname").value = user.lname;

let saveInfo = document.querySelector("#profile-form")
saveInfo.addEventListener("submit", (e)=>{
    e.preventDefault();
    let fname = e.target.fname.value;
    let lname = e.target.lname.value;
    console.log(fname, lname);
    user.fname = fname;
    user.lname = lname;
    localStorage.setItem(currentUser, JSON.stringify(user));
    alert("Name in profile has been changed successfully!");
    saveInfo.reset();
})

//change your password in your profile
let oldPassword = document.querySelector("#old-pass");
let newPassword = document.querySelector("#new-pass");
let confPassword = document.querySelector("#conf-new-pass");

let changePass = document.querySelector("#edit-form")
changePass.addEventListener("submit", (e)=>{
    e.preventDefault();
    let newp = e.target.newpass.value;
    if(user.password != e.target.oldpass.value )
     alert("your old password is not correct.")
   else
     {user.password = newp;
     localStorage.setItem(currentUser, JSON.stringify(user));
     alert("Your password changed successfully!");
     changePass.reset();}
})

document.querySelector("#logout-btn").addEventListener("click", (e)=>{
    e.preventDefault();
   window.location.href="/f3shopping-cart/"; 
})
