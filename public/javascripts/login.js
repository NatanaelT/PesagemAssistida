function validate() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // document.getElementById('login-form').submit()

    fetch('http://localhost:3000/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      .then((res) => {
        alert('logando')
        location.replace("http://localhost:3000/");
      })
      .catch((error) => {
        console.log(error)
      });
}