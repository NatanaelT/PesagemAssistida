function validate() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch('http://localhost:3000/login', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            username: email,
            password: password,
        })
    })

 
}

   // if (username == "natanael" && password == "natanael123") {

    // }
    // else {
    //     document.getElementById("password").value = "";
    //     document.getElementById("username").classList.add("is-invalid");
    //     document.getElementById("password").classList.add("is-invalid");
    // }