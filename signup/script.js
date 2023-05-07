let form = document.querySelector("#signup-form");
let user = {}; 
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    user.fname = e.target.fname.value;
    user.lname = e.target.lname.value;
    user.email = e.target.email.value;
    user.password = e.target.password.value;
    if(e.target.password.value  != e.target.confPassword.value)
      {
        alert("passwor and confirm password does not match")
        e.target.confPassword.value = "";
        e.target.confPassword.focus();

      }
      else
      {
        form.reset();
        localStorage.setItem(user.email, JSON.stringify(user))
        window.location.assign("/f3shopping-cart/login");
        console.log(user);
      }

    

})
