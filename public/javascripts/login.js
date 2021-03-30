function validate() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  fetch('http://localhost:3000/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password })
  })
    .then((resp) => resp.json())
    .then(function (data) {
      document.cookie="token=" + data.token
      localStorage.setItem('usuario', data.usuario)
      location.replace('http://localhost:3000/home')
    })
    .catch(function (error) {
      console.log('erro')
      document.getElementById("password").value = "";
      document.getElementById("email").classList.add("is-invalid");
      document.getElementById("password").classList.add("is-invalid");
    });
}

window.onload = () => {
  if(document.cookie != "" && document.cookie != null && document.cookie != undefined)
    location.replace('http://localhost:3000/home')
}