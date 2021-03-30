window.onload = () => {
  document.getElementById('nome-usuario').innerText = localStorage.getItem('usuario')
}

function buscar() {
  fetch('http://localhost:3000/usuarios', {
    method: 'get'
  })
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data)
    })
    .catch(function (error) {
      console.log('erro')
    });
}

function cadastrar() {
  let usuario = {}
  usuario.nome = document.getElementById('inputNome').value
  usuario.cpf = document.getElementById('inputCpf').value
  usuario.email = document.getElementById('inputEmail').value
  usuario.password = document.getElementById('inputPassword').value
  usuario.telefone = document.getElementById('inputTelefone').value
  usuario.funcao = document.getElementById('inputFuncao').value
  usuario.isAdmin = document.getElementById('inputAdmin').checked

  console.log(usuario)

  fetch('http://localhost:3000/usuarios', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuario)
  })
    .then((resp) => console.log(resp.json()))
    .catch(function (error) {
      console.log('erro')
    });
}