let currentUser = sessionStorage.getItem("currentUser");

let form = document.querySelector("#login-form")
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let user = JSON.parse(localStorage.getItem(email)); 
    
    if(user == null)
    {
        alert("No user found with this Email please register yourself first to successful login.");
        window.location.href = "/signup"
    }
    else 
    if(user.password != password)
     {alert("Wrong password ! try again.")
        e.target.password.focus();
    }
    else
    { window.location.assign("/shop");
        sessionStorage.setItem("currentUser",email);   

    }

})

document.querySelector("#email").addEventListener("change",(e)=>{
    if(e.target.value == currentUser)
     { 
        alert("You are alrady logged in with this email; "+currentUser);
        e.target.value = '';
    }

})
