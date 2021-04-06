window.onload = () => {
  document.getElementById('nome-usuario').innerText = localStorage.getItem('usuario')
  geraTabela();
  document.getElementById('modalUsuario').addEventListener("hidden.bs.modal", () => limparCampos())
}

async function geraTabela() {
  let usuarios = await buscar('http://localhost:3000/usuarios')
  let table = document.getElementsByTagName('tbody')[0];

  if (table.rows.length > 0) {
    let rows = table.children
    for (var i = rows.length - 1; i >= 0; --i) {
      rows[i].remove();
    }
  }

  document.getElementById('spinner').style.display = "block"

  for (var i = 0; i < usuarios.length; i++) {
    var usuario = usuarios[i];
    delete usuario._id
    delete usuario.isAdmin
    delete usuario.password

    var row = table.insertRow();
    Object.keys(usuario).forEach(function (k) {
      var cell = row.insertCell();
      cell.appendChild(document.createTextNode(usuario[k]));
    })
  }

  let linha = document.getElementsByTagName('tr')
  for (let i = 1; i < linha.length; i++) {
    linha[i].setAttribute('data-bs-toggle', 'modal');
    linha[i].setAttribute('data-bs-target', '#modalUsuario');
    linha[i].addEventListener('click', modalEdicao)
  }

  document.getElementById('spinner').style.display = "none"
}

function setaBotao(caller) {
  let botaoSalvar = document.getElementById('button-salvar')
  let botaoExcliuir = document.getElementById('button-excluir')
  if (caller == 'novo') {
    botaoSalvar.removeEventListener('click', editar)
    botaoSalvar.addEventListener('click', cadastrar)
    if (!botaoExcliuir.hasAttribute('hidden')) {
      botaoExcliuir.setAttribute('hidden', true)
    }
  } else {
    botaoSalvar.removeEventListener('click', cadastrar)
    botaoSalvar.addEventListener('click', editar)
    if (botaoExcliuir.hasAttribute('hidden')) {
      botaoExcliuir.removeAttribute('hidden');
    }
  }
}

function getInputs() {
  let usuario = {}
  usuario.nome = document.getElementById('inputNome').value
  usuario.cpf = document.getElementById('inputCpf').value
  usuario.email = document.getElementById('inputEmail').value
  usuario.password = document.getElementById('inputPassword').value
  usuario.telefone = document.getElementById('inputTelefone').value
  usuario.isAdmin = document.getElementById('inputAdmin').checked

  return usuario
}

async function modalEdicao(k) {
  setaBotao('editar')
  const cpf = parseInt(k.path[1].children[1].innerHTML)
  let usuarioOriginal = await buscar('http://localhost:3000/usuarios/' + cpf)
  document.getElementById('inputNome').value = usuarioOriginal.nome
  document.getElementById('inputCpf').value = usuarioOriginal.cpf
  document.getElementById('inputEmail').value = usuarioOriginal.email
  // document.getElementById('inputPassword').value = null
  document.getElementById('inputTelefone').value = usuarioOriginal.telefone
  document.getElementById('inputAdmin').checked = usuarioOriginal.isAdmin

  document.getElementById('cpf-editando').value = usuarioOriginal.cpf
}

function limparCampos() {
  document.getElementById('inputNome').value = null
  document.getElementById('inputCpf').value = null
  document.getElementById('inputEmail').value = null
  document.getElementById('inputPassword').value = null
  document.getElementById('inputTelefone').value = null
  document.getElementById('inputAdmin').checked = null
}

async function buscar(url) {
  return await fetch(url, {
    method: 'get'
  })
    .then((resp) => resp.json())
    .then(function (data) {
      return data
    })
    .catch(function (error) {
      console.log(error)
    });
}
function cadastrar() {
  let usuario = getInputs()

  fetch('http://localhost:3000/usuarios', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuario)
  })
    .then((resp) => geraTabela())
    .catch(function (error) {
      console.log('erro')
    });
}


async function editar() {
  const cpf = document.getElementById('cpf-editando').value

  let usuario = getInputs()
  let usuarioOriginal = await buscar('http://localhost:3000/usuarios/' + cpf)
  let update = {};

  if (document.getElementById('inputMudarSenha').checked)
    update.password = usuario.password
  if (usuario.nome != usuarioOriginal.nome)
    update.nome = usuario.nome
  if (usuario.cpf != usuarioOriginal.cpf)
    update.cpf = usuario.cpf
  if (usuario.email != usuarioOriginal.email)
    update.email = usuario.email
  if (usuario.telefone != usuarioOriginal.telefone)
    update.telefone = usuario.telefone
  if (usuario.isAdmin != usuarioOriginal.isAdmin)
    update.isAdmin = usuario.isAdmin

  // console.log(usuarioOriginal)
  // console.log(usuario)
  // console.log(update)
  fetch('http://localhost:3000/usuarios/' + cpf, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(update)
  })
    .then(response => {
      console.log(response.status); return response.json();
    })
    .then(data => console.log(data));
}

function excluir() {
  const cpf = document.getElementById('cpf-editando').value

  if (window.confirm("Você realmente deseja excluir este usuario?")) {
    fetch('http://localhost:3000/usuarios/' + cpf, {
      method: 'delete'
    })
      .then((resp) => resp.json())
      .then(function (data) {
        geraTabela()
      })
      .catch(function (error) {
        console.log(error)
      });
  }
}